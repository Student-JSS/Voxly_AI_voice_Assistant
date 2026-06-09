import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { ServerUrl } from "../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/* ── Inline SVG icons ── */
const IconMic = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
  </svg>
);
const IconNav = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);
const IconCode = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconBolt = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconPlay = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="white">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

/* Keyframe animations — only the parts Tailwind can't do */
const WAVE_STYLE = `
  @keyframes vxWave {
    0%, 100% { transform: scaleY(1); }
    50%       { transform: scaleY(var(--peak, 3)); }
  }
  .vx-bar { animation: vxWave var(--d,1.2s) ease-in-out infinite; animation-delay: var(--delay,0s); }
  @keyframes vxFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .vx-f1 { animation: vxFadeUp 0.55s 0.00s ease both; }
  .vx-f2 { animation: vxFadeUp 0.55s 0.10s ease both; }
  .vx-f3 { animation: vxFadeUp 0.55s 0.18s ease both; }
  .vx-f4 { animation: vxFadeUp 0.55s 0.26s ease both; }
  .vx-card-shine::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(124,109,250,0.55) 30%, rgba(52,216,159,0.45) 70%, transparent 100%);
  }
`;

const BAR_HEIGHTS = [
  5,8,6,10,14,8,12,7,15,10,
  8,7,10,14,12,8,7,10,8,7,
  12,14,10,8,7,12,14,10,8,7
]

const FEATURES = [
  {
    Icon: IconMic,
    ringCls: "bg-violet-500/10 border border-violet-500/25",
    iconCls: "text-violet-400",
    name: "Voice AI",
    desc: "Natural real-time voice conversations",
    tag: "Core",
  },
  {
    Icon: IconNav,
    ringCls: "bg-emerald-500/10 border border-emerald-500/25",
    iconCls: "text-emerald-400",
    name: "Smart Navigation",
    desc: "Navigate pages using voice commands",
    tag: "Pro",
  },
  {
    Icon: IconCode,
    ringCls: "bg-sky-500/10 border border-sky-500/25",
    iconCls: "text-sky-400",
    name: "Easy Embed",
    desc: "Add assistant using one script tag",
    tag: "Dev",
  },
  {
    Icon: IconBolt,
    ringCls: "bg-amber-500/10 border border-amber-500/25",
    iconCls: "text-amber-400",
    name: "Fast Responses",
    desc: "Optimized Gemini AI responses",
    tag: "~84ms",
  },
];

const STATS = [
  { val: "12k", unit: "↑", label: "Active sessions" },
  { val: "99", unit: "%", label: "Uptime SLA" },
  { val: "84", unit: "ms", label: "Avg latency" },
];

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const res = await axios.post(
        ServerUrl + "/api/auth/google",
        { name: displayName, email },
        { withCredentials: true },
      );
      setUser(res.data);
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Login Failed...");
      console.log(error);
    }
  };

  return (
    <>
      <style>{WAVE_STYLE}</style>

      <div className="relative min-h-screen bg-[#0a0a0f] text-[#f0f0f5] overflow-x-hidden antialiased">
        {/* Grid background */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%)",
          }}
        />

        {/* ── Nav ── */}
        <nav className="fixed top-0 inset-x-0 z-50 h-[60px] px-10 flex items-center justify-between border-b border-white/[0.07] bg-[#0a0a0f]/70 backdrop-blur-xl">
          <div className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight text-[#f0f0f5]">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-400 flex items-center justify-center">
              <IconPlay className="w-4 h-4" />
            </div>
            Voxly
          </div>

          

          <button
            onClick={handleLogin}
            className="h-[34px] px-4 rounded-lg bg-[#f0f0f5] text-[#0a0a0f] text-[13px] font-medium tracking-tight border-0 cursor-pointer hover:opacity-90 transition-opacity"
          >
            Get started free
          </button>
        </nav>

        {/* ── Hero ── */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-10 pt-[100px] pb-16 min-h-screen grid grid-cols-2 gap-0 items-center">
          {/* Left */}
          <div className="pr-16">
            {/* Badge */}
            <div className="vx-f1 inline-flex items-center gap-1.5 pl-2 pr-3 py-1.5 mb-9 rounded-full border border-white/10 bg-violet-500/[0.08] text-[12px] text-violet-300 tracking-[0.01em]">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_#7c6dfa] animate-pulse" />
              AI Voice Assistant Platform
            </div>

            {/* Headline */}
            <h1 className="vx-f2 text-[56px] leading-[1.05] tracking-[-0.04em] font-light text-[#f0f0f5] m-0">
              Build AI
              <br />
              assistants{" "}
              <em
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  background:
                    "linear-gradient(120deg, #a89cf8 0%, #34d89f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                for
              </em>
              <br />
              any website.
            </h1>

            {/* Subheading */}
            <p className="vx-f3 mt-6 text-[16px] text-[#8585a0] leading-[1.7] font-light max-w-[400px]">
              Customizable voice assistants that talk, guide users, and embed
              into any site in minutes — not weeks.
            </p>

            {/* Actions */}
            <div className="vx-f4 mt-10 flex flex-col items-start gap-3">
              <button
                onClick={handleLogin}
                className="flex items-center gap-2.5 h-12 px-[22px] rounded-xl bg-[#f0f0f5] text-[#0a0a0f] text-[14.5px] font-medium tracking-tight border-0 cursor-pointer hover:-translate-y-px hover:opacity-90 active:translate-y-0 transition-all duration-200"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <span className="flex items-center gap-1.5 text-xs text-[#8585a0] tracking-tight">
                <span className="w-3.5 h-px bg-[#8585a0]/50" />
                Free plan includes 200 AI responses
              </span>
            </div>
          </div>

          {/* Right — Card */}
          <div className="relative vx-f3">
            {/* Glow */}
            <div
              className="absolute -inset-20 pointer-events-none z-0"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 40%, rgba(124,109,250,0.14) 0%, transparent 70%), radial-gradient(ellipse at 30% 70%, rgba(52,216,159,0.08) 0%, transparent 60%)",
              }}
            />

            {/* Card */}
            <div className="relative z-10 vx-card-shine bg-[#111118] border border-white/[0.1] rounded-3xl p-7 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[11px] text-[#8585a0] uppercase tracking-[0.08em] mb-1 m-0">
                    Platform overview
                  </p>
                  <h2 className="text-[20px] font-medium tracking-[-0.03em] text-[#f0f0f5] m-0">
                    Features
                  </h2>
                </div>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-400 flex items-center justify-center flex-shrink-0">
                  <IconPlay className="w-5 h-5" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#16161f] border border-white/[0.07] rounded-xl p-3"
                  >
                    <div className="text-[20px] font-medium tracking-[-0.04em] text-[#f0f0f5] mb-0.5">
                      {s.val}
                      <span className="text-[13px] font-normal text-emerald-400 ml-0.5">
                        {s.unit}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#8585a0] tracking-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Waveform */}
              <div className="flex items-center gap-3.5 bg-[#16161f] border border-white/[0.07] rounded-2xl px-4 py-4 mb-3.5">
                <div className="w-9 h-9 flex-shrink-0 rounded-[10px] flex items-center justify-center bg-violet-500/[0.15] border border-violet-500/25">
                  <IconMic className="w-4 h-4 text-violet-400" />
                </div>
                <div className="flex items-center gap-[3px] flex-1">
                  {BAR_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className="vx-bar w-[3px] rounded-sm"
                      style={{
                        height: `${h}px`,
                        background: "linear-gradient(180deg, #7c6dfa, #34d89f)",
                        "--peak": (h / 8).toFixed(1),
                        "--d": `${(0.9 + ((i * 0.03) % 0.8)).toFixed(2)}s`,
                        "--delay": `${(i * 0.06).toFixed(2)}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 whitespace-nowrap">
                  <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </div>
              </div>

              {/* Feature rows */}
              <div className="flex flex-col gap-2">
                {FEATURES.map(({ Icon, ringCls, iconCls, name, desc, tag }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3.5 px-4 py-3.5 bg-[#16161f] border border-white/[0.07] rounded-2xl hover:border-white/[0.13] hover:bg-white/[0.02] transition-all duration-200 cursor-default"
                  >
                    <div
                      className={`w-9 h-9 flex-shrink-0 rounded-[10px] flex items-center justify-center ${ringCls}`}
                    >
                      <Icon className={`w-4 h-4 ${iconCls}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13.5px] font-medium text-[#f0f0f5] tracking-tight mb-0.5 m-0">
                        {name}
                      </p>
                      <p className="text-[12px] text-[#8585a0] tracking-tight m-0">
                        {desc}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-[10.5px] px-2 py-[3px] rounded-md border border-white/[0.07] text-[#8585a0] bg-[#0a0a0f] tracking-wide">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Trust strip ── */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-10 py-4 border-t border-white/[0.07] flex items-center gap-8 flex-wrap">
          {[
            "SOC 2 Type II",
            "GDPR compliant",
            "99.9% uptime SLA",
            "12k+ developers",
          ].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 text-[12.5px] text-[#8585a0] tracking-tight"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 flex-shrink-0" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
