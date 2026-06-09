import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FiCopy, FiPlus, FiTrash2, FiLogOut, FiZap, FiMic, FiNavigation, FiCode, FiActivity } from "react-icons/fi";
import { CLIENT_URL, ServerUrl } from "../App";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";


const THEMES = ["light", "dark", "glass", "neon"];
const TONES = ["friendly", "professional", "sales"];

/* ── Animated waveform bars ── */
function Waveform() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 36 }}>
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 3,
            borderRadius: 99,
            background: i % 3 === 0
              ? "linear-gradient(to top, #a855f7, #06b6d4)"
              : i % 3 === 1 ? "#06b6d4" : "#a855f7",
            animationName: "wave",
            animationDuration: `${0.6 + (i % 7) * 0.15}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationDelay: `${(i * 0.07) % 0.9}s`,
            height: `${28 + Math.sin(i * 0.9) * 18}%`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Dashboard preview panel (right column) ── */
function DashboardPreview({ user }) {
  const remainingMessages = Math.max(0, (user?.requestLimit || 200) - (user?.totalMessages || 0));

  const features = [
    { icon: <FiMic size={14} />, label: "Voice AI", desc: "Natural real-time voice conversations", tag: "Core", color: "#a855f7" },
    { icon: <FiNavigation size={14} />, label: "Smart Navigation", desc: "Navigate pages using voice commands", tag: "Pro", color: "#06b6d4" },
    { icon: <FiCode size={14} />, label: "Easy Embed", desc: "Add assistant using one script tag", tag: "Dev", color: "#10b981" },
    { icon: <FiActivity size={14} />, label: "Fast Responses", desc: "Optimized Gemini AI responses", tag: "~84ms", color: "#f59e0b" },
  ];

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: 24,
      backdropFilter: "blur(20px)",
      boxShadow: "0 0 60px rgba(168,85,247,0.08), 0 0 120px rgba(6,182,212,0.04)",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 10, letterSpacing: "0.15em", color: "#6b7280", textTransform: "uppercase", marginBottom: 6 }}>
          PLATFORM OVERVIEW
        </p>
        <p style={{ fontSize: 20, fontWeight: 700, color: "#f9fafb" }}>Features</p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { val: "12k+", sub: "Active sessions" },
          { val: "99%", sub: "Uptime SLA", accent: "#10b981" },
          { val: "84ms", sub: "Avg latency", accent: "#06b6d4" },
        ].map(({ val, sub, accent }) => (
          <div key={sub} style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "12px 14px",
          }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: accent || "#f9fafb", letterSpacing: "-0.5px" }}>{val}</p>
            <p style={{ fontSize: 10, color: "#6b7280", marginTop: 3 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Waveform card */}
      <div style={{
        background: "rgba(168,85,247,0.08)",
        border: "1px solid rgba(168,85,247,0.2)",
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(168,85,247,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#a855f7",
          }}>
            <FiMic size={16} />
          </div>
          <Waveform />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#10b981", fontWeight: 600 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse 1.5s infinite" }} />
          Live
        </div>
      </div>

      {/* Feature list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {features.map(({ icon, label, desc, tag, color }) => (
          <div key={label} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `${color}40`}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: `${color}18`,
                display: "flex", alignItems: "center", justifyContent: "center", color,
              }}>
                {icon}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#f9fafb" }}>{label}</p>
                <p style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{desc}</p>
              </div>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: "3px 8px",
              borderRadius: 6, background: `${color}18`, color, border: `1px solid ${color}30`,
            }}>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Builder({ user, setUser }) {
  const [editAssistant, setEditAssistant] = useState(!user?.isSetupComplete);
  const [assistantName, setAssistantName] = useState(user?.assistantName || "");
  const [businessName, setBusinessName] = useState(user?.businessName || "");
  const [businessType, setBusinessType] = useState(user?.businessType || "");
  const [businessDescription, setBusinessDescription] = useState(user?.businessDescription || "");
  const [theme, setTheme] = useState(user?.theme || "dark");
  const [tone, setTone] = useState(user?.tone || "friendly");
  const [geminiApiKey, setGeminiApiKey] = useState(user?.geminiApiKey || "");
  const [pages, setPages] = useState(user?.pages || []);
  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [pageKeywords, setPageKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const addPage = () => {
    if (!pageName || !pagePath) return;
    setPages([...pages, { name: pageName, path: pagePath, keywords: pageKeywords.split(",").map(k => k.trim()) }]);
    setPageName(""); setPagePath(""); setPageKeywords("");
  };

  const removePage = (index) => setPages(pages.filter((_, i) => i !== index));

  const saveAssistant = async () => {
    setLoading(true);
    try {
      const res = await axios.post(ServerUrl + "/api/user/save-assistant", {
        assistantName, businessName, businessType, businessDescription, tone, theme, geminiApiKey, pages,
      }, { withCredentials: true });
      setUser(res.data.user);
      setEditAssistant(false);
      toast.success("Assistant Saved Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save assistant");
    } finally {
      setLoading(false);
    }
  };

  const remainingMessages = Math.max(0, (user?.requestLimit || 0) - (user?.totalMessages || 0));
  const remainingDays = user?.proExpiresAt
    ? Math.max(0, Math.ceil((new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;
  const embedCode = `<script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>`;

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: "12px 16px",
    color: "#f9fafb",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 18,
    padding: 24,
    backdropFilter: "blur(12px)",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050816",
      fontFamily: "'Sora', 'DM Sans', system-ui, sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      {/* Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&display=swap');
        @keyframes wave { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes floatUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes gridScroll { from { backgroundPosition: 0 0; } to { backgroundPosition: 0 60px; } }
        @keyframes glowPulse { 0%,100% { opacity:0.5; } 50% { opacity:0.9; } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        input:focus, textarea:focus { border-color: rgba(168,85,247,0.5) !important; box-shadow: 0 0 0 3px rgba(168,85,247,0.08); }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.3); border-radius: 99px; }
      `}</style>

      {/* Grid background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        animation: "gridScroll 8s linear infinite",
      }} />

      {/* Glow blobs */}
      <div style={{
        position: "fixed", top: "-20%", left: "20%", width: 600, height: 600,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0, animation: "glowPulse 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed", top: "30%", right: "-10%", width: 500, height: 500,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── NAVBAR ── */}
     

      {/* ── HERO (2-column, shown when setup complete and not editing) ── */}
      {user?.isSetupComplete && !editAssistant && (
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "72px 32px 80px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center",
          position: "relative", zIndex: 1,
          animation: "floatUp 0.6s ease both",
        }}>
          {/* LEFT */}
          <div>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28,
              padding: "6px 14px", borderRadius: 999,
              background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse 1.5s infinite" }} />
              <span style={{ fontSize: 12, color: "#a855f7", fontWeight: 600, letterSpacing: "0.05em" }}>Voice AI for modern websites</span>
            </div>

            <h1 style={{
              fontSize: 52, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px",
              color: "#f9fafb", margin: "0 0 20px",
            }}>
              Add a{" "}
              <span style={{ background: "linear-gradient(135deg, #a855f7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Virtual Assistant
              </span>
              {" "}to your website
            </h1>

            <p style={{ fontSize: 17, color: "#9ca3af", lineHeight: 1.7, margin: "0 0 36px", maxWidth: 440 }}>
              Create a smart voice-enabled assistant that talks to visitors, answers questions and helps users navigate your website instantly.
            </p>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 36 }}>
              {[
                { label: "Current Plan", val: user?.plan, style: { color: "#f9fafb" } },
                {
                  label: "Gemini Status", val: user?.geminiStatus,
                  style: {
                    color: user?.geminiStatus === "active" ? "#10b981"
                      : user?.geminiStatus === "invalid" ? "#ef4444" : "#f59e0b"
                  }
                },
                {
                  label: user?.plan === "free" ? "Messages Left" : "Plan Expiry",
                  val: user?.plan === "free" ? remainingMessages : `${remainingDays}d`,
                  style: { color: "#f9fafb" },
                },
              ].map(({ label, val, style }) => (
                <div key={label} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14, padding: "16px",
                }}>
                  <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 6 }}>{label}</p>
                  <p style={{ fontSize: 18, fontWeight: 700, textTransform: "capitalize", ...style }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Embed section */}
            <div style={{
              background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 14, padding: 16, marginBottom: 20,
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#fbbf24", marginBottom: 8 }}>Where to paste this script?</p>
              <p style={{ fontSize: 13, color: "#d97706", lineHeight: 1.6 }}>
                Paste before the closing <code style={{ background: "rgba(0,0,0,0.3)", padding: "1px 6px", borderRadius: 4 }}>{"</body>"}</code> tag of your HTML.
              </p>
              <pre style={{
                marginTop: 12, background: "#0b1020", color: "#34d399",
                borderRadius: 10, padding: 14, fontSize: 12, fontFamily: "monospace",
                overflowX: "auto", lineHeight: 1.6,
              }}>{`<body>\n  Your Website Content\n\n  <script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>\n</body>`}</pre>
            </div>

            <p style={{ fontSize: 13, fontWeight: 500, color: "#d1d5db", marginBottom: 10 }}>Embed Code</p>
            <div style={{ position: "relative", marginBottom: 28 }}>
              <textarea readOnly value={embedCode} style={{
                ...inputStyle, height: 70, resize: "none",
                background: "#0b1020", color: "#34d399", fontFamily: "monospace", fontSize: 13, paddingRight: 52,
              }} />
              <button onClick={() => { navigator.clipboard.writeText(embedCode); toast.success("Copied"); }}
                style={{
                  position: "absolute", top: 12, right: 12,
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#9ca3af", cursor: "pointer",
                }}>
                <FiCopy size={14} />
              </button>
            </div>

            <button onClick={() => setEditAssistant(true)} style={{
              height: 50, padding: "0 28px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #a855f7, #06b6d4)",
              color: "#fff", fontSize: 15, fontWeight: 600,
              boxShadow: "0 0 24px rgba(168,85,247,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(168,85,247,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 24px rgba(168,85,247,0.3)"; }}
            >
              Edit Assistant
            </button>
          </div>

          {/* RIGHT – Dashboard preview */}
          <div style={{ animation: "floatUp 0.8s ease 0.15s both" }}>
            <DashboardPreview user={user} />
          </div>
        </div>
      )}

      {/* ── LANDING HERO (not setup yet, not editing) ── */}
      {!user?.isSetupComplete && !editAssistant && (
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "80px 32px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center",
          position: "relative", zIndex: 1,
          animation: "floatUp 0.6s ease both",
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28,
              padding: "6px 14px", borderRadius: 999,
              background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse 1.5s infinite" }} />
              <span style={{ fontSize: 12, color: "#a855f7", fontWeight: 600, letterSpacing: "0.05em" }}>Voice AI for modern websites</span>
            </div>
            <h1 style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2px", color: "#f9fafb", margin: "0 0 20px" }}>
              Add a{" "}
              <span style={{ background: "linear-gradient(135deg, #a855f7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Virtual Assistant
              </span>
              {" "}to your website
            </h1>
            <p style={{ fontSize: 18, color: "#9ca3af", lineHeight: 1.7, margin: "0 0 40px", maxWidth: 460 }}>
              Create a smart voice-enabled assistant that talks to visitors, answers questions and helps users navigate your website instantly.
            </p>
            <button onClick={() => setEditAssistant(true)} style={{
              height: 54, padding: "0 32px", borderRadius: 14, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #a855f7, #06b6d4)",
              color: "#fff", fontSize: 16, fontWeight: 700,
              boxShadow: "0 0 32px rgba(168,85,247,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(168,85,247,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 32px rgba(168,85,247,0.35)"; }}
            >
              Build Your Assistant
            </button>
            <p style={{ fontSize: 13, color: "#4b5563", marginTop: 14 }}>Free plan includes 200 AI responses</p>
          </div>
          <div style={{ animation: "floatUp 0.8s ease 0.15s both" }}>
            <DashboardPreview user={user} />
          </div>
        </div>
      )}

      {/* ── EDIT FORM ── */}
      {editAssistant && (
        <div style={{
          maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px",
          position: "relative", zIndex: 1,
          animation: "floatUp 0.5s ease both",
        }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#f9fafb", letterSpacing: "-0.5px", margin: 0 }}>Assistant Builder</h2>
            <p style={{ color: "#6b7280", marginTop: 6, fontSize: 15 }}>Customize your virtual assistant</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Basic Info */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#f9fafb", marginBottom: 20, marginTop: 0 }}>Basic Information</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { val: assistantName, set: setAssistantName, ph: "Assistant Name", type: "text" },
                  { val: businessName, set: setBusinessName, ph: "Business Name", type: "text" },
                  { val: businessType, set: setBusinessType, ph: "Business Type", type: "text" },
                ].map(({ val, set, ph, type }) => (
                  <input key={ph} type={type} value={val} placeholder={ph}
                    onChange={e => set(e.target.value)}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.08)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                  />
                ))}
                <textarea rows={4} value={businessDescription} placeholder="Business Description"
                  onChange={e => setBusinessDescription(e.target.value)}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                />
              </div>
            </div>

            {/* Appearance */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#f9fafb", marginBottom: 20, marginTop: 0 }}>Appearance</h3>
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>Theme</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {THEMES.map(item => (
                    <button key={item} onClick={() => setTheme(item)} style={{
                      padding: "12px 0", borderRadius: 12, cursor: "pointer",
                      border: `2px solid ${theme === item ? "#a855f7" : "rgba(255,255,255,0.08)"}`,
                      background: theme === item ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.03)",
                      color: theme === item ? "#a855f7" : "#9ca3af",
                      fontSize: 13, fontWeight: 500, textTransform: "capitalize",
                      transition: "all 0.2s",
                    }}>{item}</button>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>Assistant Tone</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {TONES.map(item => (
                    <button key={item} onClick={() => setTone(item)} style={{
                      padding: "12px 0", borderRadius: 12, cursor: "pointer",
                      border: `2px solid ${tone === item ? "#06b6d4" : "rgba(255,255,255,0.08)"}`,
                      background: tone === item ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.03)",
                      color: tone === item ? "#06b6d4" : "#9ca3af",
                      fontSize: 13, fontWeight: 500, textTransform: "capitalize",
                      transition: "all 0.2s",
                    }}>{item}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Gemini API */}
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#f9fafb", margin: "0 0 4px" }}>Gemini API KEY</h3>
                  <p style={{ fontSize: 13, color: "#6b7280" }}>Add your Gemini API key to power your assistant</p>
                </div>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                  style={{
                    padding: "8px 16px", borderRadius: 10, textDecoration: "none",
                    background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                    color: "#fff", fontSize: 13, fontWeight: 600,
                    transition: "transform 0.2s",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}
                >Get API KEY</a>
              </div>
              <input type="password" placeholder="AIza..." value={geminiApiKey}
                onChange={e => setGeminiApiKey(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
              <p style={{ fontSize: 12, color: "#4b5563", marginTop: 10, lineHeight: 1.6 }}>
                Your API key is securely stored and only used for generating AI responses.
              </p>
            </div>

            {/* Navigation Pages */}
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#f9fafb", margin: "0 0 4px" }}>Navigation Pages</h3>
                  <p style={{ fontSize: 13, color: "#6b7280" }}>Assistant can redirect users</p>
                </div>
                <button onClick={addPage} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                  color: "#fff", fontSize: 13, fontWeight: 600,
                }}>
                  <FiPlus size={14} /> Add
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[
                  { val: pageName, set: setPageName, ph: "Page Name" },
                  { val: pagePath, set: setPagePath, ph: "/pricing" },
                  { val: pageKeywords, set: setPageKeywords, ph: "Pricing, Plan" },
                ].map(({ val, set, ph }) => (
                  <input key={ph} type="text" value={val} placeholder={ph}
                    onChange={e => set(e.target.value)}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.5)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {pages.map((page, index) => (
                  <div key={index} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12, padding: "12px 16px",
                  }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: "#f9fafb", margin: 0 }}>{page.name}</p>
                      <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{page.path}</p>
                    </div>
                    <button onClick={() => removePage(index)} style={{
                      background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                      color: "#ef4444", borderRadius: 8, padding: "6px 8px", cursor: "pointer",
                    }}>
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save button */}
            <button onClick={saveAssistant}
              disabled={loading || !assistantName || !businessName || !businessType || !businessDescription || !geminiApiKey}
              style={{
                width: "100%", height: 54, borderRadius: 14, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                color: "#fff", fontSize: 16, fontWeight: 700,
                opacity: (loading || !assistantName || !businessName || !businessType || !businessDescription || !geminiApiKey) ? 0.4 : 1,
                cursor: (loading || !assistantName) ? "not-allowed" : "pointer",
                boxShadow: "0 0 32px rgba(168,85,247,0.25)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 48px rgba(168,85,247,0.4)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 32px rgba(168,85,247,0.25)"; }}
            >
              {loading ? "Saving..." : user?.isSetupComplete ? "Update Assistant" : "Save Assistant"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Builder;