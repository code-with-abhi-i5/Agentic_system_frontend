import React, { useEffect, useRef } from "react";
import { 
  Network, 
  Terminal, 
  CheckCircle2, 
  Loader2, 
  Cpu, 
  Search, 
  Globe, 
  Filter, 
  FileSpreadsheet,
  Maximize2
} from "lucide-react";

export default function LiveSwarmTracker({ currentStep, logs, isRunning }) {
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const steps = [
    { num: 1, title: "Intent & Schema", icon: Cpu, desc: "Extracting columns" },
    { num: 2, title: "Source Discovery", icon: Search, desc: "Tavily web hunting" },
    { num: 3, title: "Deep Scraping", icon: Globe, desc: "Puppeteer headless" },
    { num: 4, title: "Deduplication", icon: Filter, desc: "Levenshtein filter" },
    { num: 5, title: "Dataset Assembly", icon: FileSpreadsheet, desc: "Clean & structured" }
  ];

  const activeAgents = [
    {
      name: "TavilyScout-01",
      role: "URL Discovery & Domain Allowlist Filter",
      tool: "Tavily Search API",
      status: currentStep >= 2 ? (currentStep > 2 ? "Completed" : "Hunting URLs") : "Queued",
      color: "var(--cyan-primary)"
    },
    {
      name: "PuppeteerCluster-Node4",
      role: "Headless Browser DOM Reader",
      tool: "Puppeteer / Cheerio",
      status: currentStep >= 3 ? (currentStep > 3 ? "Completed" : "Extracting DOM") : "Queued",
      color: "var(--indigo-light)"
    },
    {
      name: "ZodQualityGuard",
      role: "Fuzzy Deduplication & Schema Verification",
      tool: "Zod & Levenshtein Engine",
      status: currentStep >= 4 ? (currentStep > 4 ? "Completed" : "Deduplicating") : "Queued",
      color: "var(--emerald-primary)"
    }
  ];

  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(6, 182, 212, 0.15)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--cyan-primary)"
          }}>
            <Network style={{ width: "18px", height: "18px" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", letterSpacing: "-0.01em" }}>
              Live Autonomous Swarm Pipeline
            </h3>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              LangGraph StateGraph compiled dynamically for this data requirement
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="badge badge-cyan" style={{ padding: "0.35rem 0.8rem", fontSize: "0.78rem" }}>
            {isRunning ? (
              <>
                <Loader2 style={{ width: "13px", height: "13px", animation: "spin 1s linear infinite" }} />
                <span>Phase {currentStep} of 5 Active</span>
              </>
            ) : (
              <>
                <CheckCircle2 style={{ width: "13px", height: "13px" }} />
                <span>Pipeline Ready</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* 5-Step Visual Pipeline Stepper */}
      <div className="pipeline-steps-bar">
        {steps.map((step) => {
          const Icon = step.icon;
          const isDone = currentStep > step.num;
          const isCurrent = currentStep === step.num;

          return (
            <div
              key={step.num}
              className={`pipeline-step-node ${isCurrent ? "active" : ""} ${isDone ? "completed" : ""}`}
            >
              <div className="step-node-header">
                <span style={{ fontSize: "0.75rem", fontWeight: "700" }}>STEP 0{step.num}</span>
                {isDone ? (
                  <CheckCircle2 style={{ width: "15px", height: "15px", color: "var(--emerald-primary)" }} />
                ) : isCurrent ? (
                  <Loader2 style={{ width: "15px", height: "15px", color: "var(--indigo-primary)", animation: "spin 1.5s linear infinite" }} />
                ) : (
                  <span style={{ color: "var(--text-subtle)", fontSize: "0.72rem" }}>Waiting</span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.3rem" }}>
                <Icon style={{ width: "16px", height: "16px", color: isCurrent ? "var(--indigo-light)" : "var(--text-muted)" }} />
                <span className="step-node-title">{step.title}</span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Sub-Agents Status Grid */}
      <div className="agent-worker-grid">
        {activeAgents.map((agent, i) => (
          <div key={i} className="agent-worker-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.88rem", fontWeight: "700", color: agent.color }}>
                {agent.name}
              </span>
              <span style={{
                fontSize: "0.72rem",
                padding: "0.2rem 0.55rem",
                borderRadius: "6px",
                background: agent.status.includes("Completed") ? "rgba(16, 185, 129, 0.12)" : "rgba(99, 102, 241, 0.12)",
                color: agent.status.includes("Completed") ? "var(--emerald-primary)" : "var(--indigo-light)",
                fontWeight: "700",
                border: `1px solid ${agent.status.includes("Completed") ? "rgba(16, 185, 129, 0.25)" : "rgba(99, 102, 241, 0.25)"}`
              }}>
                {agent.status}
              </span>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{agent.role}</span>
            <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", fontFamily: "var(--font-mono)" }}>
              Tool: {agent.tool}
            </div>
          </div>
        ))}
      </div>

      {/* Swarm Live Terminal Logs Window */}
      <div className="terminal-console">
        <div className="terminal-topbar">
          <div className="terminal-dots">
            <span className="t-dot t-red"></span>
            <span className="t-dot t-yellow"></span>
            <span className="t-dot t-green"></span>
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Terminal style={{ width: "14px", height: "14px" }} />
            <span>Kortex Swarm Execution Log (SSE Event Stream)</span>
          </span>
          <span style={{ color: "var(--emerald-primary)", fontWeight: "700", fontSize: "0.72rem", letterSpacing: "0.05em" }}>
            LIVE 60FPS
          </span>
        </div>

        <div className="terminal-logs">
          {logs.length === 0 ? (
            <div className="terminal-line" style={{ color: "var(--text-subtle)", fontStyle: "italic" }}>
              <span className="t-time">[{new Date().toTimeString().split(" ")[0]}]</span>
              <span className="t-agent">System ›</span>
              <span className="t-msg" style={{ color: "var(--text-subtle)" }}>
                Awaiting workflow execution. Enter your target prompt in Mission Control to trigger live multi-agent streaming.
              </span>
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="terminal-line">
                <span className="t-time">[{log.time}]</span>
                <span className="t-agent">{log.agent} ›</span>
                <span className={log.type === "success" ? "t-success" : "t-msg"}>
                  {log.msg}
                </span>
              </div>
            ))
          )}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
