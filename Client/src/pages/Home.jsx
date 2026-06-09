import React from "react";
import { useNavigate } from "react-router-dom";
import AssistantPreview from "../Components/AssistantPreview";
import logo from "../assets/logo.png";
import logo1 from "../assets/logo1.png";
import {
  FiMic,
  FiNavigation,
  FiCode,
  FiActivity,
  FiArrowRight,
} from "react-icons/fi";

const STEPS = [
  {
    step: "01",
    title: "Sign up free",
    desc: "Continue with Google and create your assistant instantly.",
    color: "#a855f7",
  },
  {
    step: "02",
    title: "Customize assistant",
    desc: "Set your business name, tone, voice and theme.",
    color: "#06b6d4",
  },
  {
    step: "03",
    title: "Train your assistant",
    desc: "Add business details and personalize responses.",
    color: "#10b981",
  },
  {
    step: "04",
    title: "Embed anywhere",
    desc: "Copy one script tag and add it to your website.",
    color: "#f59e0b",
  },
];

const FEATURES = [
  {
    icon: <FiMic size={16} />,
    label: "Voice AI",
    desc: "Natural real-time voice conversations",
    tag: "Core",
    color: "#a855f7",
  },
  {
    icon: <FiNavigation size={16} />,
    label: "Smart Navigation",
    desc: "Navigate pages using voice commands",
    tag: "Pro",
    color: "#06b6d4",
  },
  {
    icon: <FiCode size={16} />,
    label: "Easy Embed",
    desc: "Add assistant using one script tag",
    tag: "Dev",
    color: "#10b981",
  },
  {
    icon: <FiActivity size={16} />,
    label: "Fast Responses",
    desc: "Optimized Gemini AI responses",
    tag: "~84ms",
    color: "#f59e0b",
  },
];

function Waveform() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 40 }}>
      {Array.from({ length: 32 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 3,
            borderRadius: 99,
            background:
              i % 3 === 0
                ? "linear-gradient(to top,#a855f7,#06b6d4)"
                : i % 3 === 1
                  ? "#06b6d4"
                  : "#a855f7",
            animationName: "wave",
            animationDuration: `${0.55 + (i % 7) * 0.14}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationDelay: `${(i * 0.06) % 0.85}s`,
            height: `${30 + Math.sin(i * 1.1) * 20}%`,
          }}
        />
      ))}
    </div>
  );
}

function DashboardPanel() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 22,
        padding: 26,
        backdropFilter: "blur(24px)",
        boxShadow:
          "0 0 80px rgba(168,85,247,0.1), 0 0 160px rgba(6,182,212,0.05)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "#4b5563",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          PLATFORM OVERVIEW
        </p>
        <p
          style={{ fontSize: 20, fontWeight: 700, color: "#f9fafb", margin: 0 }}
        >
          Features
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {[
          { val: "12k+", sub: "Active sessions", accent: "#f9fafb" },
          { val: "99%", sub: "Uptime SLA", accent: "#10b981" },
          { val: "84ms", sub: "Avg latency", accent: "#06b6d4" },
        ].map(({ val, sub, accent }) => (
          <div
            key={sub}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: "12px 14px",
            }}
          >
            <p
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: accent,
                letterSpacing: "-0.5px",
                margin: 0,
              }}
            >
              {val}
            </p>
            <p
              style={{
                fontSize: 10,
                color: "#6b7280",
                marginTop: 3,
                marginBottom: 0,
              }}
            >
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Waveform card */}
      <div
        style={{
          background: "rgba(168,85,247,0.08)",
          border: "1px solid rgba(168,85,247,0.2)",
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(168,85,247,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a855f7",
            }}
          >
            <FiMic size={16} />
          </div>
          <Waveform />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "#10b981",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#10b981",
              animation: "pulse 1.5s infinite",
            }}
          />
          Live
        </div>
      </div>

      {/* Feature list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {FEATURES.map(({ icon, label, desc, tag, color }) => (
          <div
            key={label}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "border-color 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = `${color}50`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
            }
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: `${color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color,
                }}
              >
                {icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#f9fafb",
                    margin: 0,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "#6b7280",
                    marginTop: 2,
                    marginBottom: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: 6,
                background: `${color}18`,
                color,
                border: `1px solid ${color}30`,
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Home({ user }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        fontFamily: "'Sora', 'DM Sans', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&display=swap');
        @keyframes wave { from { transform: scaleY(0.3); } to { transform: scaleY(1); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
        @keyframes floatUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glowPulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
        @keyframes gridScroll { from { backgroundPosition:0 0; } to { backgroundPosition:0 60px; } }
        @keyframes slideRight { from { width:0; } to { width:100%; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:rgba(168,85,247,0.3); border-radius:99px; }
      `}</style>

      {/* Grid bg */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "gridScroll 10s linear infinite",
        }}
      />

      {/* Glow blobs */}
      <div
        style={{
          position: "fixed",
          top: "-15%",
          left: "15%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "glowPulse 5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "40%",
          right: "-5%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-10%",
          left: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── HERO ── */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "88px 40px 96px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 72,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          animation: "floatUp 0.65s ease both",
        }}
      >
        {/* Left */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 32,
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(168,85,247,0.1)",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#10b981",
                animation: "pulse 1.5s infinite",
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: "#a855f7",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              Voice AI for modern websites
            </span>
          </div>

          <h1
            style={{
              fontSize: 56,
              fontWeight: 900,
              lineHeight: 1.07,
              letterSpacing: "-2px",
              color: "#f9fafb",
              margin: "0 0 22px",
            }}
          >
            Add a{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#a855f7,#06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Virtual Assistant
            </span>{" "}
            to your website
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "#9ca3af",
              lineHeight: 1.75,
              margin: "0 0 44px",
              maxWidth: 460,
            }}
          >
            Create a smart voice-enabled assistant that talks to visitors,
            answers questions and helps users navigate your website instantly.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/builder")}
              style={{
                height: 54,
                padding: "0 32px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg,#a855f7,#06b6d4)",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                boxShadow: "0 0 32px rgba(168,85,247,0.35)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 0 50px rgba(168,85,247,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 0 32px rgba(168,85,247,0.35)";
              }}
            >
              Build Your Assistant <FiArrowRight size={16} />
            </button>
          </div>

          <p style={{ fontSize: 13, color: "#4b5563", marginTop: 16 }}>
            Free plan includes 200 AI responses
          </p>

          {/* Trust bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: 48,
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {[
              ["12k+", "Active sessions"],
              ["99%", "Uptime SLA"],
              ["84ms", "Avg latency"],
            ].map(([val, label]) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#f9fafb",
                    margin: 0,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {val}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "#4b5563",
                    margin: "3px 0 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Dashboard panel */}
        <div style={{ animation: "floatUp 0.85s ease 0.2s both" }}>
          <DashboardPanel />
        </div>
      </section>

      {/* AssistantPreview (unchanged, kept from original) */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px 64px",
        }}
      >
        <AssistantPreview />
      </div>

      {/* ── HOW IT WORKS ── */}
      <section
        style={{ position: "relative", zIndex: 1, padding: "96px 40px" }}
      >
        {/* Divider line */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto 72px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: "#f9fafb",
                letterSpacing: "-1px",
                margin: "0 0 14px",
              }}
            >
              Get started in minutes
            </h2>
            <p style={{ fontSize: 16, color: "#6b7280", margin: 0 }}>
              Simple setup. No complicated integration.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 16,
            }}
          >
            {STEPS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 20,
                  padding: 28,
                  transition:
                    "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${s.color}40`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${s.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <span
                  style={{
                    fontSize: 38,
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "block",
                    marginBottom: 20,
                  }}
                >
                  {s.step}
                </span>

                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#f9fafb",
                    margin: "0 0 10px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{ position: "relative", zIndex: 1, padding: "0 40px 96px" }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(6,182,212,0.08))",
            border: "1px solid rgba(168,85,247,0.2)",
            borderRadius: 24,
            padding: "56px 48px",
            textAlign: "center",
            boxShadow: "0 0 80px rgba(168,85,247,0.08)",
          }}
        >
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#f9fafb",
              letterSpacing: "-0.8px",
              margin: "0 0 14px",
            }}
          >
            Ready to add AI to your website?
          </h2>
          <p style={{ fontSize: 16, color: "#9ca3af", margin: "0 0 36px" }}>
            Join thousands of businesses using Voxly to engage their visitors.
          </p>
          <button
            onClick={() => navigate("/builder")}
            style={{
              height: 52,
              padding: "0 36px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#a855f7,#06b6d4)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              boxShadow: "0 0 32px rgba(168,85,247,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 50px rgba(168,85,247,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow =
                "0 0 32px rgba(168,85,247,0.35)";
            }}
          >
            Get started free
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "36px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
          >
            <img
              src={logo1}
              alt="Voxly"
              style={{
                width: 40,
                height: 40,
                objectFit: "contain",
                borderRadius: 10,
              }}
            />
            <div>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#f9fafb",
                  margin: 0,
                }}
              >
                Voxly{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg,#a855f7,#06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                ></span>
              </p>
              <p style={{ fontSize: 12, color: "#4b5563", margin: 0 }}>
                AI Voice Assistant
              </p>
            </div>
          </div>

          <p style={{ fontSize: 13, color: "#374151", margin: 0 }}>
            © {new Date().getFullYear()} Voxly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
