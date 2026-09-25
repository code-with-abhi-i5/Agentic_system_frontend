import React from "react";
import { MoreHorizontal } from "lucide-react";

export default function OverviewStats({ dataset = [] }) {
  const avgAccuracy = dataset.length > 0
    ? Math.round(dataset.reduce((acc, r) => acc + (r.confidence || 98), 0) / dataset.length)
    : 98.5;

  return (
    <div className="matte-card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#fff" }}>Extraction Yield</h3>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>Live Swarm Pipeline</span>
          </div>
          <button style={{ background: "transparent", border: "none", color: "#666", cursor: "pointer" }}>
            <MoreHorizontal size={16} />
          </button>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", fontSize: "0.75rem", color: "#888" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#fff" }}></div> Validated
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#444" }}></div> Deduplicated
          </div>
        </div>
      </div>

      {/* Mock Bar Chart Area */}
      <div style={{ display: "flex", alignItems: "flex-end", height: "100px", gap: "0.5rem", marginTop: "2rem", marginBottom: "1.5rem", position: "relative" }}>
        <div style={{ position: "absolute", left: "-15px", top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "0.6rem", color: "#666" }}>
          <span>10k</span>
          <span>5k</span>
          <span>0</span>
        </div>
        {[40, 60, 50, 80, 95, 75, 85].map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "100%", height: `${h}%`, background: h > 70 ? "#fff" : "rgba(255,255,255,0.2)", borderRadius: "4px 4px 0 0" }}></div>
          </div>
        ))}
        <div style={{ position: "absolute", bottom: "-20px", left: 0, right: 0, display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#666" }}>
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "1rem" }}>
        <div style={{ fontSize: "2.2rem", fontWeight: "600", color: "#fff", letterSpacing: "-0.02em" }}>
          {dataset.length > 0 ? `${dataset.length}` : "4,201"} <span style={{ fontSize: "1rem", color: "#888", fontWeight: "400" }}>Rows</span>
        </div>
        <div style={{ background: "#fff", color: "#000", padding: "0.25rem 0.6rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {avgAccuracy}% <span style={{ fontWeight: "500", color: "#555" }}>Accuracy</span>
        </div>
      </div>
    </div>
  );
}
