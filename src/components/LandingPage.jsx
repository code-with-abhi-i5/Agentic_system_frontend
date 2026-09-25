import React, { useState } from "react";
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Sparkles,
  Database,
  BarChart3,
  Bot,
  Search,
  CheckCircle2,
  Lock,
  Zap,
  Globe,
  FileSpreadsheet,
  Terminal,
  Activity,
  ChevronRight,
  Play
} from "lucide-react";

export default function LandingPage({ onEnterApp, onOpenAuth }) {
  const [samplePrompt, setSamplePrompt] = useState("Top 10 AI startups in India with founders & funding");

  const promptPresets = [
    "🚀 Bangalore AI Startups",
    "💼 Remote Software Jobs",
    "💰 Series A Fintech Leads",
    "🏥 HealthTech Innovators 2026"
  ];

  const pipelineStages = [
    { step: "01", name: "Intent Analysis", role: "Dynamic Zod Schema compiler", icon: Terminal, color: "#6366f1" },
    { step: "02", name: "Web Discovery", role: "Tavily Search API allowlist scout", icon: Search, color: "#06b6d4" },
    { step: "03", name: "Deep Extraction", role: "Puppeteer headless DOM parsing", icon: Bot, color: "#a855f7" },
    { step: "04", name: "Deduplication", role: "Fuzzy Levenshtein distance filter", icon: ShieldCheck, color: "#f59e0b" },
    { step: "05", name: "Human Review", role: "Interactive HITL schema verification", icon: CheckCircle2, color: "#10b981" },
  ];

  const features = [
    {
      title: "Autonomous Swarm Pipeline",
      desc: "LangGraph StateGraph dynamically compiles DAGs with specialized agent nodes executing in parallel with SSE streaming.",
      icon: Cpu,
      tag: "Agentic Architecture"
    },
    {
      title: "Human-in-the-Loop Schema Editor",
      desc: "Review AI-detected fields, analyze fill-rates, modify data types, and approve columns before committing to MongoDB.",
      icon: Layers,
      tag: "Zero Bad Data"
    },
    {
      title: "Talk to Your Dataset",
      desc: "Instant conversational Q&A over scraped records. Ask complex aggregation questions with real-time AI citation answers.",
      icon: Sparkles,
      tag: "In-Memory RAG"
    },
    {
      title: "AI Executive Reports",
      desc: "Synthesize comprehensive Market Overviews, Competitive Matrices, and Strategic Insights exported to Markdown & CSV.",
      icon: BarChart3,
      tag: "1-Click Synthesis"
    },
    {
      title: "5-Stage Real-Time Lineage",
      desc: "Full auditability tracking discovery latency, model tokens, duplicates filtered, and confidence scores across every row.",
      icon: Activity,
      tag: "Enterprise Audit"
    },
    {
      title: "Zero-Data-Loss Persistence",
      desc: "Resilient dual-layer storage with MongoDB Atlas integration and automated physical disk backups that survive system restarts.",
      icon: Database,
      tag: "Fault-Tolerant"
    }
  ];

  return (
    <div className="landing-container" style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 50% -20%, #1e1b4b 0%, #07090e 70%)",
      color: "#f1f5f9",
      fontFamily: "var(--font-sans)",
      overflowX: "hidden"
    }}>
      {/* ═══════════════════════════════════════════════════════════════
          TOP NAVBAR
          ═══════════════════════════════════════════════════════════════ */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(16px)",
        background: "rgba(7, 9, 14, 0.75)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(99,102,241,0.4)"
          }}>
            <Layers style={{ width: "20px", height: "20px", color: "#fff" }} />
          </div>
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: "800", letterSpacing: "-0.02em", color: "#fff" }}>
              KORTEX AI
            </div>
            <div style={{ fontSize: "0.68rem", color: "var(--cyan-primary)", fontWeight: "600", letterSpacing: "0.08em" }}>
              DATA INTELLIGENCE
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden-mobile">
          <a href="#pipeline" style={{ color: "var(--text-muted)", fontSize: "0.86rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="var(--text-muted)"}>Pipeline</a>
          <a href="#features" style={{ color: "var(--text-muted)", fontSize: "0.86rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="var(--text-muted)"}>Capabilities</a>
          <a href="#architecture" style={{ color: "var(--text-muted)", fontSize: "0.86rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="var(--text-muted)"}>Multi-Agent Swarm</a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            onClick={() => onOpenAuth("login")}
            style={{
              padding: "0.55rem 1.1rem",
              borderRadius: "10px",
              background: "transparent",
              border: "1px solid var(--border-medium)",
              color: "#e2e8f0",
              fontSize: "0.84rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--cyan-primary)";
              e.currentTarget.style.color = "#38bdf8";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border-medium)";
              e.currentTarget.style.color = "#e2e8f0";
            }}
          >
            Sign In
          </button>

          <button
            onClick={() => onEnterApp()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.55rem 1.25rem",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #06b6d4, #6366f1)",
              border: "none",
              color: "#fff",
              fontSize: "0.84rem",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(6,182,212,0.3)",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(6,182,212,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.3)";
            }}
          >
            <span>Launch Platform</span>
            <ArrowRight style={{ width: "15px", height: "15px" }} />
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "5rem 1.5rem 3rem",
        textAlign: "center",
        position: "relative"
      }}>
        {/* Glow ambient background */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse at center, rgba(6,182,212,0.15), rgba(99,102,241,0.05), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0
        }} />

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.35rem 0.9rem",
          borderRadius: "999px",
          background: "rgba(99, 102, 241, 0.12)",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          color: "#a5b4fc",
          fontSize: "0.78rem",
          fontWeight: "600",
          letterSpacing: "0.02em",
          marginBottom: "1.75rem"
        }}>
          <span style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#06b6d4",
            boxShadow: "0 0 8px #06b6d4"
          }} />
          <span>KORTEX v2.4 • AUTONOMOUS AGENTIC DATA PLATFORM</span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
          fontWeight: "900",
          lineHeight: "1.12",
          letterSpacing: "-0.03em",
          maxWidth: "960px",
          margin: "0 auto 1.5rem",
          background: "linear-gradient(180deg, #ffffff 40%, #94a3b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Transform Unstructured Web Noise into Production Data Intelligence
        </h1>

        {/* Subhead */}
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.22rem)",
          lineHeight: "1.6",
          color: "var(--text-muted)",
          maxWidth: "760px",
          margin: "0 auto 2.5rem"
        }}>
          Autonomous LangGraph multi-agent swarm that discovers authoritative sources, executes headless extraction, removes duplicates with fuzzy Levenshtein, and enforces Human-in-the-Loop schema verification.
        </p>

        {/* Dual CTA Buttons */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "3.5rem"
        }}>
          <button
            onClick={() => onOpenAuth("signup")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.85rem 1.85rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #06b6d4, #6366f1)",
              border: "none",
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(6,182,212,0.35)",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(6,182,212,0.55)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(6,182,212,0.35)";
            }}
          >
            <span>Create Free Account</span>
            <ArrowRight style={{ width: "17px", height: "17px" }} />
          </button>

          <button
            onClick={() => onEnterApp()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.85rem 1.85rem",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border-medium)",
              color: "#f1f5f9",
              fontSize: "0.95rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.borderColor = "var(--border-active)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
              e.currentTarget.style.borderColor = "var(--border-medium)";
            }}
          >
            <Play style={{ width: "16px", height: "16px", color: "var(--cyan-primary)" }} />
            <span>Launch Mission Control</span>
          </button>
        </div>

        {/* Live Interactive Extraction Studio Simulator */}
        <div style={{
          maxWidth: "880px",
          margin: "0 auto",
          background: "rgba(13, 16, 23, 0.8)",
          borderRadius: "20px",
          border: "1px solid rgba(6, 182, 212, 0.3)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(6, 182, 212, 0.15)",
          padding: "1.75rem",
          textAlign: "left"
        }}>
          {/* Header of simulator */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f43f5e" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
              <span style={{ marginLeft: "0.75rem", fontSize: "0.76rem", color: "var(--text-subtle)", fontFamily: "var(--font-mono)" }}>
                kortex-orchestrator://swarm-dag-v2
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem", color: "#10b981", fontWeight: "600" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
              ENGINE READY
            </div>
          </div>

          {/* Prompt input field */}
          <div style={{
            display: "flex",
            gap: "0.75rem",
            background: "rgba(7, 9, 14, 0.9)",
            border: "1px solid var(--border-medium)",
            borderRadius: "12px",
            padding: "0.5rem 0.75rem",
            marginBottom: "1rem"
          }}>
            <Terminal style={{ width: "18px", height: "18px", color: "var(--cyan-primary)", marginTop: "0.45rem", shrink: 0 }} />
            <input
              type="text"
              value={samplePrompt}
              onChange={(e) => setSamplePrompt(e.target.value)}
              placeholder="Describe your extraction target in plain English..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#f1f5f9",
                fontSize: "0.92rem",
                fontFamily: "inherit"
              }}
            />
            <button
              onClick={() => onEnterApp()}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                border: "none",
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: "700",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              Run Swarm
            </button>
          </div>

          {/* Presets chips */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "0.74rem", color: "var(--text-subtle)" }}>Presets:</span>
            {promptPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setSamplePrompt(preset.replace(/^[^\w]+/, "").trim())}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "8px",
                  padding: "0.3rem 0.65rem",
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--cyan-primary)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PIPELINE WORKFLOW SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section id="pipeline" style={{
        maxWidth: "1200px",
        margin: "4rem auto",
        padding: "0 1.5rem"
      }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ color: "var(--cyan-primary)", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
            LANGGRAPH STATEGRAPH ARCHITECTURE
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: "800", letterSpacing: "-0.02em" }}>
            5-Stage Autonomous Extraction Swarm
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0.5rem auto 0", fontSize: "0.95rem" }}>
            Every user prompt dynamically compiles into an observable multi-agent state graph.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "1.25rem"
        }}>
          {pipelineStages.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} style={{
                background: "rgba(16, 21, 34, 0.6)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "16px",
                padding: "1.5rem",
                position: "relative",
                transition: "all 0.3s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = st.color;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${st.color}25`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: "800",
                  color: st.color,
                  marginBottom: "0.75rem"
                }}>
                  STEP {st.step}
                </div>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: `${st.color}15`,
                  border: `1px solid ${st.color}35`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem"
                }}>
                  <Icon style={{ width: "20px", height: "20px", color: st.color }} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.4rem", color: "#fff" }}>
                  {st.name}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-subtle)", lineHeight: "1.5" }}>
                  {st.role}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CORE CAPABILITIES GRID
          ═══════════════════════════════════════════════════════════════ */}
      <section id="features" style={{
        maxWidth: "1200px",
        margin: "5rem auto",
        padding: "0 1.5rem"
      }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ color: "var(--indigo-light)", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
            ENTERPRISE CAPABILITIES
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: "800", letterSpacing: "-0.02em" }}>
            Engineered for Precision & Zero Hallucinations
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0.5rem auto 0", fontSize: "0.95rem" }}>
            Everything you need to extract, clean, chat with, and report on web-scale intelligence.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "1.5rem"
        }}>
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} style={{
                background: "rgba(13, 16, 23, 0.7)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "18px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.3s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--border-active)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.6)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(99, 102, 241, 0.1)",
                      border: "1px solid rgba(99, 102, 241, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Icon style={{ width: "22px", height: "22px", color: "var(--cyan-primary)" }} />
                    </div>
                    <span style={{
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      color: "var(--indigo-light)",
                      background: "rgba(99, 102, 241, 0.12)",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "6px"
                    }}>
                      {feat.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.75rem", color: "#fff" }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CALL TO ACTION FOOTER BANNER
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: "1200px",
        margin: "6rem auto 3rem",
        padding: "0 1.5rem"
      }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)",
          border: "1px solid rgba(6, 182, 212, 0.35)",
          borderRadius: "24px",
          padding: "3.5rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <h2 style={{ fontSize: "2.4rem", fontWeight: "800", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Ready to Automate Your Data Intelligence?
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 2rem", fontSize: "1rem" }}>
            Launch your first autonomous extraction job in under 30 seconds with full source verification.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => onOpenAuth("signup")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 2rem",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                border: "none",
                color: "#fff",
                fontWeight: "700",
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)"
              }}
            >
              <span>Get Started Now</span>
              <ArrowRight style={{ width: "16px", height: "16px" }} />
            </button>
            <button
              onClick={() => onEnterApp()}
              style={{
                padding: "0.85rem 2rem",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-medium)",
                color: "#fff",
                fontWeight: "600",
                fontSize: "0.95rem",
                cursor: "pointer"
              }}
            >
              Enter Mission Control
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "2rem",
        textAlign: "center",
        color: "var(--text-subtle)",
        fontSize: "0.8rem"
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <Layers style={{ width: "16px", height: "16px", color: "var(--cyan-primary)" }} />
          <span style={{ fontWeight: "700", color: "#e2e8f0" }}>KORTEX AI</span>
          <span>•</span>
          <span>Lead Architect: Priyanshu Ghosh</span>
        </div>
        <div>
          Autonomous Multi-Agent Web Intelligence & Data Extraction Platform. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
