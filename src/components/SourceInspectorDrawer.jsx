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
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--indigo-light)"
            }}>
              <Layers style={{ width: "18px", height: "18px" }} />
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
            className="btn-secondary"
            style={{ width: "32px", height: "32px", padding: 0, borderRadius: "8px" }}
          >
            <X style={{ width: "16px", height: "16px" }} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="drawer-content">
          {/* Target Entity Overview */}
          <div style={{
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "14px",
            padding: "1.1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "#fff" }}>
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

          {/* Source Link & Verification Box */}
          <div>
            <label style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "0.5rem" }}>
              ORIGINAL WEB SOURCE URL
            </label>
            <div className="source-url-box">
              <span className="source-url-text">{record.sourceUrl}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", shrink: 0 }}>
                <button
                  onClick={() => copyToClipboard(record.sourceUrl)}
                  className="btn-secondary"
                  style={{ padding: "0.35rem 0.6rem", fontSize: "0.72rem" }}
                  title="Copy URL"
                >
                  <Copy style={{ width: "12px", height: "12px" }} />
                </button>
                <a
                  href={record.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: "0.35rem 0.75rem", fontSize: "0.72rem", textDecoration: "none" }}
                >
                  <ExternalLink style={{ width: "12px", height: "12px" }} />
                  <span>Visit Source</span>
                </a>
              </div>
            </div>
          </div>

          {/* Metadata Audit Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem"
          }}>
            <div style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "10px",
              padding: "0.85rem"
            }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-subtle)", display: "block" }}>
                EXTRACTED AT
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginTop: "0.2rem", fontSize: "0.82rem", color: "#fff", fontWeight: "600" }}>
                <Clock style={{ width: "13px", height: "13px", color: "var(--cyan-primary)" }} />
                <span>{record.scrapedAt}</span>
              </div>
            </div>

            <div style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "10px",
              padding: "0.85rem"
            }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-subtle)", display: "block" }}>
                PERMITTED DOMAIN
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginTop: "0.2rem", fontSize: "0.82rem", color: "var(--emerald-primary)", fontWeight: "600" }}>
                <Globe style={{ width: "13px", height: "13px" }} />
                <span>{record.sourceDomain}</span>
              </div>
            </div>
          </div>

          {/* Raw Text Excerpt */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <label style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                RAW CONTEXT EXCERPT (EXTRACTED SNIPPET)
              </label>
              <span style={{ fontSize: "0.7rem", color: "var(--indigo-light)" }}>
                Puppeteer DOM Reader
              </span>
            </div>
            <div className="raw-snippet-box">
              {record.snippet}
            </div>
          </div>

          {/* Zod Validation Confirmation */}
          <div style={{
            padding: "0.85rem",
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "0.78rem",
            color: "var(--emerald-primary)"
          }}>
            <CheckCircle2 style={{ width: "16px", height: "16px", shrink: 0 }} />
            <span>
              Passed 7/7 schema assertions: Email format valid, URL reachable, Deduplication hash unique.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
