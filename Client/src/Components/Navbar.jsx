import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import { ServerUrl } from "../App";
import toast from "react-hot-toast";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("logout failed");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background:
          "linear-gradient(180deg, rgba(10,14,25,0.95), rgba(10,14,25,0.88))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        .mobile-dropdown { animation: slideDown 0.2s ease; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-hamburger { display: none !important; }
          .mobile-dropdown-wrapper { display: none !important; }
        }
      `}</style>

      {/* Main bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 75,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            cursor: "pointer",
          }}
        >
          <img
            src={logo1}
            alt="Voxly"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
            }}
          />

          <div>
            <h2
              style={{
                margin: 0,
                color: "#fff",
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              Voxly
            </h2>

            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: 11,
              }}
            >
              AI Voice Assistant
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        {user && (
          <div
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <button
              onClick={() => navigate("/builder")}
              style={{
                padding: "12px 24px",
                borderRadius: 990,
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg,#a855f7,#06b6d4)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Builder
            </button>

            <button
              onClick={() => navigate("/billing")}
              style={{
                padding: "12px 24px",
                borderRadius: 990,
                border: "none",
                background: "transparent",
                color: "#9ca3af",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              Billing
            </button>

            {/* User pill */}
            {/* Premium User Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginLeft: 12,
                padding: "8px 10px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 999,
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  padding: 2,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#a855f7,#06b6d4)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "#111827",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Info */}
              <div
                style={{
                  minWidth: 0,
                  maxWidth: 170,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name}
                </p>

                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: 12,
                    color: "#9ca3af",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email}
                </p>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  height: 30,
                  background: "rgba(255,255,255,0.08)",
                  marginLeft: 4,
                }}
              />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255,255,255,0.05)",
                  color: "#9ca3af",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                  e.currentTarget.style.color = "#ef4444";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "#9ca3af";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FiLogOut size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile hamburger */}
        {user && (
          <button
            className="mobile-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 10,
              cursor: "pointer",
              color: "#9ca3af",
              padding: "8px",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f9fafb")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {menuOpen && user && (
        <div
          className="mobile-dropdown-wrapper mobile-dropdown"
          style={{ padding: "0 16px 16px" }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: 18,
              backdropFilter: "blur(12px)",
            }}
          >
            {/* User info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingBottom: 16,
                marginBottom: 16,
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#a855f7,#06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#f9fafb",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={() => {
                  navigate("/builder");
                  setMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg,#a855f7,#06b6d4)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "inherit",
                }}
              >
                Builder
              </button>

              <button
                onClick={() => {
                  navigate("/billing");
                  setMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.09)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#d1d5db",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                Billing
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: "1px solid rgba(239,68,68,0.2)",
                  background: "rgba(239,68,68,0.08)",
                  color: "#ef4444",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <FiLogOut size={15} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
