import React from "react";
import { Network, Search, Globe, ShieldCheck, ExternalLink } from "lucide-react";

export default function LiveSwarmTracker({ currentStep, isRunning }) {
  const activeAgents = [
    {
      name: "Tavily URL Scout",
      role: "Source Discovery",
      icon: Search,
      status: currentStep >= 2 ? (currentStep > 2 ? "Completed" : "Hunting") : "Queued",
    },
    {
      name: "Puppeteer Cluster",
      role: "DOM Extraction",
      icon: Globe,
      status: currentStep >= 3 ? (currentStep > 3 ? "Completed" : "Extracting") : "Queued",
    },
    {
      name: "Zod Schema Guard",
      role: "Fuzzy Deduplication",
      icon: ShieldCheck,
      status: currentStep >= 4 ? (currentStep > 4 ? "Completed" : "Validating") : "Queued",
    }
  ];

  return (
    <div className="matte-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <h3 style={{ fontSize: "1.1rem", color: "#fff", fontWeight: "600", marginBottom: "1rem" }}>
        Active LangGraph Swarm
      </h3>

      <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
        <span style={{ color: "#fff", fontWeight: "600" }}>All Agents</span>
        <span style={{ color: "#666" }}>Scout</span>
        <span style={{ color: "#666" }}>Scrape</span>
        <span style={{ color: "#666" }}>Zod</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {activeAgents.map((agent, i) => {
          const Icon = agent.icon;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ padding: "0.5rem", borderRadius: "8px", background: "rgba(255,255,255,0.03)" }}>
                  <Icon size={16} color="#aaa" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.9rem", color: "#fff", fontWeight: "500" }}>{agent.name}</span>
                  <span style={{ fontSize: "0.75rem", color: "#666" }}>{agent.role}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button className="matte-btn-dark" style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}>
                  Status: {agent.status}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
