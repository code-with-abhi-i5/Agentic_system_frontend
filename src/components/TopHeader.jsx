import React from "react";
import { Plus, Search, Bell, Sparkles, Activity, ShieldCheck, User, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TopHeader({ activeTab, onNewTaskClick, onExportClick, onGoToLanding }) {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const titles = {
    "mission-control": "Autonomous Mission Control",
    "overview": "Platform Performance & Analytics",
    "datasets": "Centralized Datasets Explorer",
    "history": "Workflow Execution History",
    "governance": "Source Governance & Compliance"
  };

  const displayName = user?.name || "Operator";
  const firstName = displayName.split(" ")[0];

  return (
    <header className="top-header">
      {/* Left: Breadcrumbs with Home Link */}
      <div className="header-left">
        <div className="breadcrumb-path">
          <button
            onClick={onGoToLanding}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-subtle)",
              cursor: "pointer",
              padding: 0,
              fontSize: "0.82rem",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "color 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--cyan-primary)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-subtle)"}
            title="Return to Home / Landing Page"
          >
            <Home style={{ width: "13px", height: "13px" }} />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="breadcrumb-active">{titles[activeTab] || "Dashboard"}</span>
        </div>
      </div>

      {/* Right: Quick Actions & Metrics */}
      <div className="header-right">
        {/* Live System Performance Pill */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.4rem 0.85rem",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "999px",
          fontSize: "0.74rem",
          color: "var(--text-muted)"
        }}>
          <Activity style={{ width: "14px", height: "14px", color: "var(--cyan-primary)" }} />
          <span>Latency: <strong style={{ color: "#fff" }}>18ms</strong></span>
          <span style={{ color: "var(--border-medium)" }}>|</span>
          <span>Cluster: <strong style={{ color: "var(--emerald-primary)" }}>Optimal</strong></span>
        </div>

        {/* Global Action: New Task */}
        <button 
          onClick={onNewTaskClick}
          className="btn-primary"
          style={{ padding: "0.55rem 1.1rem", fontSize: "0.82rem" }}
        >
          <Plus style={{ width: "16px", height: "16px" }} />
          <span>New Extraction Task</span>
        </button>

        {/* User Account Button */}
        {isAuthenticated ? (
          <button
            onClick={() => openAuthModal("login")}
            className="btn-secondary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 0.75rem",
              borderRadius: "10px",
              fontSize: "0.78rem"
            }}
            title={`Logged in as ${user?.email || displayName}`}
          >
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px #10b981"
            }} />
            <span style={{ color: "#e2e8f0", fontWeight: "600" }}>{firstName}</span>
          </button>
        ) : (
          <button
            onClick={() => openAuthModal("login")}
            className="btn-secondary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.4rem 0.75rem",
              borderRadius: "10px",
              fontSize: "0.78rem",
              borderColor: "rgba(6,182,212,0.4)",
              color: "#38bdf8"
            }}
          >
            <User style={{ width: "14px", height: "14px" }} />
            <span>Sign In</span>
          </button>
        )}

        {/* Notifications Icon */}
        <button 
          className="btn-secondary"
          style={{ width: "38px", height: "38px", padding: 0, borderRadius: "10px" }}
          title="System Notifications"
        >
          <Bell style={{ width: "16px", height: "16px" }} />
        </button>
      </div>
    </header>
  );
}
