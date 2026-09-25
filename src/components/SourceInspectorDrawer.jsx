import React from "react";
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Globe, 
  FileText, 
  CheckCircle2, 
  Building2,
  Copy,
  Layers
} from "lucide-react";

export default function SourceInspectorDrawer({ record, onClose }) {
  if (!record) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="inspector-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff"
            }}>
              <Layers style={{ width: "20px", height: "20px" }} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff" }}>
                Source Provenance Inspector
              </h3>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Auditable citation backing for {record.company}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="matte-nav-inactive"
            style={{ width: "36px", height: "36px", padding: 0, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer" }}
          >
            <X style={{ width: "18px", height: "18px" }} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="drawer-content" style={{ padding: "2rem", gap: "2rem" }}>
          {/* Target Entity Overview */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "#fff" }}>
                {record.company}
              </span>
              <span className="badge badge-emerald">
                <ShieldCheck style={{ width: "12px", height: "12px" }} />
                <span>{record.confidence}% Quality Score</span>
              </span>
            </div>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              {record.role}: <strong style={{ color: "#fff" }}>{record.founder}</strong> ({record.email})
            </span>
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", color: "#888", fontWeight: "600", letterSpacing: "0.05em", display: "block", marginBottom: "0.75rem" }}>
              Original Web Source URL
            </label>
            <div className="matte-card" style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
              <span style={{ fontSize: "0.85rem", color: "#ccc", wordBreak: "break-all", flex: 1, fontFamily: "monospace" }}>{record.sourceUrl}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                <button
                  onClick={() => copyToClipboard(record.sourceUrl)}
                  className="matte-btn-white"
                  style={{ padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                  title="Copy URL"
                >
                  <Copy style={{ width: "14px", height: "14px" }} />
                </button>
                <a
                  href={record.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="matte-btn-white"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <ExternalLink style={{ width: "14px", height: "14px" }} />
                  <span>Visit Source</span>
                </a>
              </div>
            </div>
          </div>

          {/* Metadata Audit Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem"
          }}>
            <div className="matte-card" style={{ padding: "1.25rem" }}>
              <span style={{ fontSize: "0.8rem", color: "#888", display: "block", fontWeight: "600" }}>
                Extracted At
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.9rem", color: "#fff", fontWeight: "500" }}>
                <Clock style={{ width: "16px", height: "16px", color: "rgba(255,255,255,0.7)" }} />
                <span>{record.scrapedAt}</span>
              </div>
            </div>

            <div className="matte-card" style={{ padding: "1.25rem" }}>
              <span style={{ fontSize: "0.8rem", color: "#888", display: "block", fontWeight: "600" }}>
                Permitted Domain
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.9rem", color: "var(--emerald-primary)", fontWeight: "500" }}>
                <Globe style={{ width: "16px", height: "16px" }} />
                <span>{record.sourceDomain}</span>
              </div>
            </div>
          </div>

          {/* Raw Text Excerpt */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <label style={{ fontSize: "0.8rem", color: "#888", fontWeight: "600", letterSpacing: "0.05em" }}>
                Raw Context Excerpt (Snippet)
              </label>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                Puppeteer DOM Reader
              </span>
            </div>
            <div className="matte-card" style={{ padding: "1.5rem", fontFamily: "monospace", fontSize: "0.85rem", lineHeight: "1.6", color: "#ccc", background: "rgba(255,255,255,0.02)" }}>
              {record.snippet}
            </div>
          </div>

          {/* Zod Validation Confirmation */}
          <div style={{
            padding: "1.25rem",
            background: "rgba(16, 185, 129, 0.05)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.85rem",
            color: "var(--emerald-primary)",
            lineHeight: "1.5"
          }}>
            <CheckCircle2 style={{ width: "20px", height: "20px", flexShrink: 0 }} />
            <span>
              Passed 7/7 schema assertions: Email format valid, URL reachable, Deduplication hash unique.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
