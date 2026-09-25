import React from "react";
import { 
  Cpu, 
  Database, 
  BarChart3, 
  History, 
  ShieldCheck, 
  Sparkles, 
  Radio, 
  CheckCircle2,
  Layers,
  LogOut,
  LogIn
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ activeTab, setActiveTab, datasetCount, taskCount, isBackendConnected, onGoToLanding }) {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  const navItems = [
    { id: "mission-control", label: "Mission Control", icon: Cpu, badge: "LIVE" },
    { id: "overview", label: "Executive Overview", icon: BarChart3 },
    { id: "datasets", label: "Datasets Explorer", icon: Database, badge: datasetCount ? `${datasetCount}` : null },
    { id: "history", label: "Workflow History", icon: History, badge: taskCount ? `${taskCount}` : null },
    { id: "governance", label: "Source Governance", icon: ShieldCheck }
  ];

  const displayName = user?.name || "Priyanshu Ghosh";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "PG";

  return (
    <aside className="sidebar">
      <div>
        {/* Brand Header (Clickable to Home) */}
        <div
          className="brand-section"
          onClick={onGoToLanding}
          style={{ cursor: "pointer", transition: "opacity 0.2s" }}
          title="Return to Home Page"
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <div className="brand-logo-icon">
            <Layers className="w-5 h-5" />
          </div>
          <div className="brand-info">
            <h1>KORTEX AI</h1>
            <p>Data Intelligence</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <Icon style={{ width: "18px", height: "18px", shrink: 0 }} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Status & User */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Swarm Engine Status Box */}
        <div className="engine-status-box">
          <div className="status-header">
            <span>BACKEND STATUS</span>
            <span style={{ color: "var(--indigo-light)", fontSize: "0.68rem" }}>PORT 5000</span>
          </div>
          <div className="pulse-indicator">
            <span className="pulse-dot"></span>
            <span>{isBackendConnected ? "API Connected (Live)" : "Swarm Cluster Online"}</span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-subtle)", marginTop: "2px" }}>
            LangGraph DAG • SSE Streaming Active
          </div>
        </div>

        {/* User Card with Auth State */}
        {isAuthenticated ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem",
            borderRadius: "14px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-subtle)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", overflow: "hidden" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "800",
                fontSize: "0.85rem",
                boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
                flexShrink: 0
              }}>
                {initials}
              </div>
              <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <span style={{ fontSize: "0.84rem", fontWeight: "700", color: "#fff", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                  {displayName}
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--cyan-primary)" }}>
                  Verified Operator
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                if (onGoToLanding) onGoToLanding();
              }}
              title="Sign Out"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-subtle)",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f43f5e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
            >
              <LogOut style={{ width: "15px", height: "15px" }} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => openAuthModal("login")}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(99,102,241,0.15))",
              border: "1px solid rgba(6,182,212,0.35)",
              color: "#38bdf8",
              fontWeight: "600",
              fontSize: "0.82rem",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 0 15px rgba(6,182,212,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#06b6d4";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(6,182,212,0.35)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(6,182,212,0.1)";
            }}
          >
            <LogIn style={{ width: "15px", height: "15px" }} />
            <span>Sign In / Join Swarm</span>
          </button>
        )}
      </div>
    </aside>
  );
}
