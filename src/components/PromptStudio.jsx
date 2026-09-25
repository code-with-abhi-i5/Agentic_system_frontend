import React, { useState } from "react";
import { Sparkles, Play, RotateCcw, Sliders, Globe, Shield, Terminal } from "lucide-react";
import { PRESET_TEMPLATES } from "../data/promptTemplates";

export default function PromptStudio({ onLaunchExtraction, isRunning }) {
  const [prompt, setPrompt] = useState(
    "Find top 50 AI Startups in Bangalore with founder names, funding rounds, tech stacks & contact emails."
  );
  const [maxRecords, setMaxRecords] = useState(50);
  const [strictDeduplication, setStrictDeduplication] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isRunning) return;
    onLaunchExtraction({
      prompt,
      maxRecords,
      strictDeduplication
    });
  };

  const handleTemplateClick = (templatePrompt) => {
    setPrompt(templatePrompt);
  };

  return (
    <div className="prompt-studio-wrapper">
      {/* Studio Header */}
      <div className="studio-header">
        <div className="studio-title">
          <div style={{
            width: "30px",
            height: "30px",
            borderRadius: "8px",
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--indigo-light)"
          }}>
            <Sparkles style={{ width: "16px", height: "16px" }} />
          </div>
          <div>
            <h2>Autonomous Prompt Studio</h2>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Describe your target dataset in plain English. The AI Orchestrator will design & execute the workflow.
            </p>
          </div>
        </div>

        {/* Advanced Config Toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="btn-secondary"
          style={{ padding: "0.4rem 0.8rem", fontSize: "0.78rem" }}
        >
          <Sliders style={{ width: "14px", height: "14px" }} />
          <span>{showAdvanced ? "Hide Parameters" : "Parameters"}</span>
        </button>
      </div>

      {/* Main Prompt Input */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Find 50 Series A B2B SaaS startups in Germany with their C-level contacts and tech stack..."
          className="prompt-textarea"
          rows={3}
        />

        {/* Preset Templates Row */}
        <div className="template-pills-row">
          <span className="template-label">QUICK TEMPLATES:</span>
          {PRESET_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleTemplateClick(tmpl.prompt)}
              className="template-pill"
            >
              {tmpl.title}
            </button>
          ))}
        </div>

        {/* Advanced Options Accordion */}
        {showAdvanced && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            padding: "1rem",
            background: "rgba(7, 9, 14, 0.4)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "12px",
            fontSize: "0.82rem"
          }}>
            <div>
              <label style={{ color: "var(--text-muted)", display: "block", marginBottom: "0.4rem", fontWeight: "600" }}>
                Target Record Quota:
              </label>
              <select
                value={maxRecords}
                onChange={(e) => setMaxRecords(Number(e.target.value))}
                style={{
                  width: "100%",
                  background: "var(--bg-secondary)",
                  color: "#fff",
                  border: "1px solid var(--border-medium)",
                  borderRadius: "8px",
                  padding: "0.45rem 0.75rem",
                  fontSize: "0.82rem"
                }}
              >
                <option value={25}>25 Records (Fast Scout)</option>
                <option value={50}>50 Records (Standard Deep)</option>
                <option value={100}>100 Records (High Volume)</option>
                <option value={250}>250 Records (Enterprise Full)</option>
              </select>
            </div>

            <div>
              <label style={{ color: "var(--text-muted)", display: "block", marginBottom: "0.4rem", fontWeight: "600" }}>
                Deduplication Engine:
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.3rem" }}>
                <input
                  type="checkbox"
                  id="dedup"
                  checked={strictDeduplication}
                  onChange={(e) => setStrictDeduplication(e.target.checked)}
                  style={{ accentColor: "var(--indigo-primary)", width: "16px", height: "16px" }}
                />
                <label htmlFor="dedup" style={{ color: "#cbd5e1", fontSize: "0.8rem" }}>
                  Strict Levenshtein + Domain Hash Filtering
                </label>
              </div>
            </div>

            <div>
              <label style={{ color: "var(--text-muted)", display: "block", marginBottom: "0.4rem", fontWeight: "600" }}>
                Source Governance:
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--emerald-primary)", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                <Shield style={{ width: "14px", height: "14px" }} />
                <span>Strict Robots.txt & Rate-limit Enforcement</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
          <button
            type="button"
            onClick={() => setPrompt("")}
            className="btn-secondary"
            style={{ fontSize: "0.8rem", padding: "0.5rem 0.9rem" }}
          >
            <RotateCcw style={{ width: "14px", height: "14px" }} />
            <span>Clear Input</span>
          </button>

          <button
            type="submit"
            disabled={isRunning || !prompt.trim()}
            className="btn-primary"
            style={{ minWidth: "220px" }}
          >
            {isRunning ? (
              <>
                <div className="pulse-dot" style={{ background: "#fff", boxShadow: "0 0 8px #fff" }}></div>
                <span>Executing Workflow...</span>
              </>
            ) : (
              <>
                <Play style={{ width: "16px", height: "16px", fill: "currentColor" }} />
                <span>Launch Autonomous Extraction</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
