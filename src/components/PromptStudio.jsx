import React, { useState } from "react";
import { Sparkles, Terminal } from "lucide-react";

export default function PromptStudio({ onLaunchExtraction, onCancelExtraction, isRunning }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isRunning) return;
    onLaunchExtraction({
      prompt: prompt || "Find top 50 AI Startups in Bangalore...",
      maxRecords: 50,
      strictDeduplication: true
    });
  };

  return (
    <div className="matte-card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      {/* Top illustration block */}
      <div style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)", borderRadius: "12px", padding: "1rem", marginBottom: "1.5rem", border: "1px solid rgba(255,255,255,0.02)", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Terminal size={16} color="#fff" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%", paddingTop: "0.25rem" }}>
          <div style={{ height: "6px", width: "60%", background: "rgba(255,255,255,0.1)", borderRadius: "4px" }}></div>
          <div style={{ height: "6px", width: "80%", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }}></div>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#fff", marginBottom: "0.5rem" }}>
          Configure your Extraction
        </h3>
        <p style={{ fontSize: "0.8rem", color: "#888", lineHeight: "1.5" }}>
          A curated AI workflow seamlessly targeting diverse web sources to compile your desired datasets autonomously.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What data do you need?" 
          className="matte-input" 
          style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "0.5rem" }}
        />
        {!isRunning ? (
          <button 
            onClick={handleSubmit} 
            disabled={!prompt.trim()} 
            className="matte-btn-white" 
            style={{ width: "100%" }}
          >
            Launch Extraction
          </button>
        ) : (
          <button 
            onClick={onCancelExtraction} 
            className="matte-btn-dark" 
            style={{ width: "100%", background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e", border: "1px solid rgba(244, 63, 94, 0.3)" }}
          >
            Stop Execution
          </button>
        )}
      </div>
    </div>
  );
}
