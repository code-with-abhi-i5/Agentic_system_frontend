import React, { useState } from "react";
import {
  Layers,
  ShieldCheck,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Zap,
  ArrowLeft,
  Cpu,
  Terminal,
  Activity
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import confetti from "canvas-confetti";

export default function AuthPage({ initialMode = "login", onBackToHome, onSuccessLogin }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login({ email, password });
        setSuccessMsg("Authorization Successful! Access Granted.");
      } else {
        await register({ name, email, password });
        setSuccessMsg("Operator Registered! Swarm Node Online.");
      }

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Redirect to Dashboard
      setTimeout(() => {
        if (onSuccessLogin) onSuccessLogin();
      }, 700);

    } catch (err) {
      setError(err.message || "Authentication failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (type) => {
    if (type === "priyanshu") {
      setName("Priyanshu Ghosh");
      setEmail("priyanshughosh3580@gmail.com");
      setPassword("Password@123");
    } else {
      setName("Research Lead");
      setEmail("lead.operator@kortex.ai");
      setPassword("Kortex@2026");
    }
    setError("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 75% 20%, #1e1b4b 0%, #07090e 70%)",
      color: "#f1f5f9",
      fontFamily: "var(--font-sans)",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Top Bar with Back to Home */}
      <div style={{
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(7, 9, 14, 0.6)",
        backdropFilter: "blur(12px)"
      }}>
        <button
          onClick={onBackToHome}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "color 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
        >
          <ArrowLeft style={{ width: "16px", height: "16px" }} />
          <span>Back to Home</span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Layers style={{ width: "16px", height: "16px", color: "#fff" }} />
          </div>
          <span style={{ fontSize: "0.95rem", fontWeight: "800", letterSpacing: "-0.01em" }}>
            KORTEX AI
          </span>
        </div>

        <button
          onClick={onSuccessLogin}
          style={{
            background: "transparent",
            border: "1px solid var(--border-subtle)",
            borderRadius: "8px",
            padding: "0.35rem 0.85rem",
            color: "var(--text-subtle)",
            fontSize: "0.75rem",
            cursor: "pointer"
          }}
          title="Directly enter mission control as guest"
        >
          Skip / Guest Mode →
        </button>
      </div>

      {/* Main Split Grid */}
      <div style={{
        flex: 1,
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
        gap: "3rem",
        alignItems: "center",
        padding: "3rem 1.5rem"
      }}>
        {/* Left Side: System Telemetry Branding */}
        <div className="hidden-mobile" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.3rem 0.8rem",
            borderRadius: "999px",
            background: "rgba(6,182,212,0.12)",
            border: "1px solid rgba(6,182,212,0.3)",
            color: "#38bdf8",
            fontSize: "0.76rem",
            fontWeight: "700",
            width: "fit-content"
          }}>
            <ShieldCheck style={{ width: "14px", height: "14px" }} />
            <span>SECURE OPERATOR ACCESS</span>
          </div>

          <h2 style={{
            fontSize: "2.4rem",
            fontWeight: "900",
            lineHeight: "1.2",
            letterSpacing: "-0.02em"
          }}>
            Enter the Autonomous Data Intelligence Swarm
          </h2>

          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
            Authorize your node to execute LangGraph state graphs, manage custom dataset schemas, and perform AI conversational synthesis on source-verified records.
          </p>

          {/* Live Telemetry Card */}
          <div style={{
            background: "rgba(13, 16, 23, 0.7)",
            border: "1px solid var(--border-medium)",
            borderRadius: "16px",
            padding: "1.25rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", color: "var(--text-subtle)" }}>
              <span>SWARM TELEMETRY</span>
              <span style={{ color: "#10b981", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                ACTIVE
              </span>
            </div>
            <div style={{ color: "#94a3b8", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div>› Node Engine: <span style={{ color: "#38bdf8" }}>LangGraph v1.4 DAG</span></div>
              <div>› Accuracy Engine: <span style={{ color: "#a5b4fc" }}>Levenshtein + Zod</span></div>
              <div>› Data Durability: <span style={{ color: "#34d399" }}>Persistent Disk + Mongo</span></div>
              <div>› Operator State: <span style={{ color: "#f59e0b" }}>Awaiting Credentials</span></div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Card */}
        <div style={{
          background: "rgba(11, 15, 25, 0.9)",
          border: "1px solid rgba(6, 182, 212, 0.3)",
          borderRadius: "24px",
          padding: "2.25rem",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(6, 182, 212, 0.12)",
          position: "relative"
        }}>
          {/* Tabs */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            background: "rgba(16, 21, 34, 0.8)",
            padding: "4px",
            borderRadius: "12px",
            border: "1px solid var(--border-subtle)",
            marginBottom: "1.75rem"
          }}>
            <button
              type="button"
              onClick={() => { setMode("login"); setError(""); }}
              style={{
                padding: "0.65rem",
                borderRadius: "8px",
                border: "none",
                background: mode === "login" ? "linear-gradient(135deg, rgba(6,182,212,0.25), rgba(99,102,241,0.25))" : "transparent",
                color: mode === "login" ? "#38bdf8" : "var(--text-muted)",
                fontWeight: "700",
                fontSize: "0.84rem",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setError(""); }}
              style={{
                padding: "0.65rem",
                borderRadius: "8px",
                border: "none",
                background: mode === "signup" ? "linear-gradient(135deg, rgba(6,182,212,0.25), rgba(99,102,241,0.25))" : "transparent",
                color: mode === "signup" ? "#38bdf8" : "var(--text-muted)",
                fontWeight: "700",
                fontSize: "0.84rem",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Create Account
            </button>
          </div>

          {/* Quick Fill Preset */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "10px",
            padding: "0.5rem 0.75rem",
            marginBottom: "1.5rem",
            fontSize: "0.78rem"
          }}>
            <span style={{ color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Zap style={{ width: "14px", height: "14px", color: "var(--amber-primary)" }} />
              Quick Fill:
            </span>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <button
                type="button"
                onClick={() => handleQuickFill("priyanshu")}
                style={{
                  background: "rgba(6, 182, 212, 0.15)",
                  border: "1px solid rgba(6, 182, 212, 0.35)",
                  color: "#38bdf8",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Priyanshu Demo
              </button>
            </div>
          </div>

          {/* Error / Success Notifications */}
          {error && (
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6rem",
              background: "rgba(244, 63, 94, 0.12)",
              border: "1px solid rgba(244, 63, 94, 0.35)",
              color: "#fda4af",
              borderRadius: "10px",
              padding: "0.75rem",
              fontSize: "0.8rem",
              marginBottom: "1.25rem"
            }}>
              <AlertCircle style={{ width: "16px", height: "16px", color: "#f43f5e", shrink: 0, marginTop: "2px" }} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6rem",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#6ee7b7",
              borderRadius: "10px",
              padding: "0.75rem",
              fontSize: "0.8rem",
              marginBottom: "1.25rem"
            }}>
              <CheckCircle2 style={{ width: "16px", height: "16px", color: "#10b981", shrink: 0, marginTop: "2px" }} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {mode === "signup" && (
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "600", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <User style={{ width: "16px", height: "16px", position: "absolute", left: "12px", top: "12px", color: "var(--text-subtle)" }} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Priyanshu Ghosh"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.75rem 0.65rem 2.4rem",
                      background: "rgba(7, 9, 14, 0.8)",
                      border: "1px solid var(--border-medium)",
                      borderRadius: "10px",
                      color: "#fff",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "600", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                Work / Operator Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail style={{ width: "16px", height: "16px", position: "absolute", left: "12px", top: "12px", color: "var(--text-subtle)" }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="priyanshughosh3580@gmail.com"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.75rem 0.65rem 2.4rem",
                    background: "rgba(7, 9, 14, 0.8)",
                    border: "1px solid var(--border-medium)",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "0.88rem",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "600", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock style={{ width: "16px", height: "16px", position: "absolute", left: "12px", top: "12px", color: "var(--text-subtle)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: "100%",
                    padding: "0.65rem 2.4rem 0.65rem 2.4rem",
                    background: "rgba(7, 9, 14, 0.8)",
                    border: "1px solid var(--border-medium)",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "0.88rem",
                    outline: "none"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "12px",
                    background: "transparent",
                    border: "none",
                    color: "var(--text-subtle)",
                    cursor: "pointer"
                  }}
                >
                  {showPassword ? <EyeOff style={{ width: "15px", height: "15px" }} /> : <Eye style={{ width: "15px", height: "15px" }} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "0.5rem",
                padding: "0.8rem",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                border: "none",
                color: "#fff",
                fontWeight: "700",
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 0 25px rgba(6,182,212,0.35)",
                transition: "all 0.2s",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? (
                <div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              ) : (
                <>
                  <span>{mode === "login" ? "Authorize & Enter Dashboard" : "Create Operator Account"}</span>
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.75rem", color: "var(--text-subtle)" }}>
            Zero-Data-Loss enabled: Session persists across restarts.
          </div>
        </div>
      </div>
    </div>
  );
}
