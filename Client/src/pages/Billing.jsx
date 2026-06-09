import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ServerUrl } from '../App';
import { FiZap, FiCheck } from 'react-icons/fi';

function Billing({ user, setUser }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !user.isSetupComplete) {
      toast.error("Setup your assistant first");
      navigate("/builder");
    }
  }, [])

  const remainingMessages = Math.max(0, (user?.requestLimit || 0) - (user?.totalMessages || 0));

  const remainingDays = user?.proExpiresAt
    ? Math.max(0, Math.ceil((new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;

  const handlePay = async () => {
    try {
      const res = await axios.post(ServerUrl + "/api/billing/order", { plan: "pro" }, { withCredentials: true })
      const order = res.data.order
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Voxly",
        description: "Pro Plan",
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await axios.post(ServerUrl + "/api/billing/verify", response, { withCredentials: true })
          if (verifyRes.data.success) {
            toast.success("Payment successfully")
            setUser(verifyRes.data.user)
          }
        },
        theme: { color: "#7c3aed" },
      }
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast.error("Payment Failed")
      console.log(error);
    }
  }

  const cardStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 18,
    padding: '20px 24px',
    backdropFilter: 'blur(12px)',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050816',
      fontFamily: "'Sora', system-ui, sans-serif",
      overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&display=swap');
        @keyframes floatUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glowPulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
        @keyframes gridScroll { from { backgroundPosition:0 0; } to { backgroundPosition:0 60px; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
        * { box-sizing: border-box; }
      `}</style>

      {/* Grid bg */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        animation: 'gridScroll 10s linear infinite',
      }} />

      {/* Glow blobs */}
      <div style={{
        position: 'fixed', top: '-10%', left: '20%', width: 600, height: 600,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0, animation: 'glowPulse 5s ease-in-out infinite',
      }} />
      <div style={{
        position: 'fixed', bottom: '10%', right: '-5%', width: 500, height: 500,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 80px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 40, animation: 'floatUp 0.5s ease both' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.5px', margin: '0 0 8px' }}>
            Billing & Subscription
          </h2>
          <p style={{ color: '#6b7280', fontSize: 15, margin: 0 }}>Manage your AI assistant plan and usage.</p>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 40,
          animation: 'floatUp 0.55s ease 0.05s both',
        }}>
          {[
            { label: 'Current Plan', val: user?.plan, valStyle: { color: '#f9fafb', textTransform: 'capitalize' } },
            {
              label: 'Gemini Status', val: user?.geminiStatus,
              valStyle: {
                textTransform: 'capitalize',
                color: user?.geminiStatus === 'active' ? '#10b981'
                  : user?.geminiStatus === 'invalid' ? '#ef4444' : '#f59e0b'
              }
            },
            {
              label: user?.plan === 'free' ? 'Messages Left' : 'Plan Expiry',
              val: user?.plan === 'free' ? remainingMessages : `${remainingDays} Days`,
              valStyle: { color: '#f9fafb' }
            },
          ].map(({ label, val, valStyle }) => (
            <div key={label} style={cardStyle}>
              <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
              <p style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-0.5px', ...valStyle }}>{val}</p>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
          animation: 'floatUp 0.6s ease 0.1s both',
        }}>

          {/* Free Plan */}
          <div style={{
            ...cardStyle,
            padding: 32,
          }}>
            <p style={{ fontSize: 12, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px' }}>Free Plan</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: '#f9fafb', letterSpacing: '-2px', lineHeight: 1 }}>₹0</span>
            </div>
            <p style={{ fontSize: 13, color: '#4b5563', margin: '0 0 28px' }}>Forever free</p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['200 AI messages', 'Voice assistant', 'Navigation support', 'Basic customization'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <FiCheck size={11} style={{ color: '#6b7280' }} />
                  </div>
                  <span style={{ fontSize: 14, color: '#9ca3af' }}>{item}</span>
                </div>
              ))}
            </div>

            {user?.plan === 'free' && (
              <div style={{
                marginTop: 28, padding: '10px 0', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                textAlign: 'center', fontSize: 13, color: '#6b7280', fontWeight: 500,
              }}>
                Current Plan
              </div>
            )}
          </div>

          {/* Pro Plan */}
          <div style={{
            borderRadius: 18, padding: 32,
            background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(6,182,212,0.1))',
            border: '1px solid rgba(168,85,247,0.3)',
            boxShadow: '0 0 60px rgba(168,85,247,0.12), 0 0 120px rgba(6,182,212,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Glow accent */}
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 180, height: 180,
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Pro Plan</p>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                background: 'rgba(168,85,247,0.2)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.3)',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <FiZap size={10} /> POPULAR
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: '#f9fafb', letterSpacing: '-2px', lineHeight: 1 }}>₹699</span>
            </div>
            <p style={{ fontSize: 13, color: '#9ca3af', margin: '0 0 28px' }}>3 Months Access</p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Unlimited AI messages', 'Advanced AI assistant', 'Priority performance', 'Unlimited navigation', 'Premium support'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <FiCheck size={11} style={{ color: '#a855f7' }} />
                  </div>
                  <span style={{ fontSize: 14, color: '#d1d5db' }}>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handlePay}
              disabled={user?.plan === 'pro'}
              style={{
                marginTop: 28, width: '100%', height: 52, borderRadius: 14,
                border: 'none', cursor: user?.plan === 'pro' ? 'default' : 'pointer',
                fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
                background: user?.plan === 'pro'
                  ? 'rgba(255,255,255,0.08)'
                  : 'linear-gradient(135deg,#a855f7,#06b6d4)',
                color: user?.plan === 'pro' ? '#6b7280' : '#fff',
                boxShadow: user?.plan === 'pro' ? 'none' : '0 0 28px rgba(168,85,247,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { if (user?.plan !== 'pro') { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 44px rgba(168,85,247,0.5)'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = user?.plan === 'pro' ? 'none' : '0 0 28px rgba(168,85,247,0.35)'; }}
            >
              {user?.plan === 'pro' ? 'Active Plan ✓' : 'Upgrade Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billing