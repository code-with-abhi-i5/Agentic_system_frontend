import React, { useMemo } from "react";
import {
  Globe,
  FileSearch,
  ScanSearch,
  FilterX,
  ShieldCheck,
  Database,
  ArrowRight,
  Clock,
  CheckCircle2,
  Zap,
} from "lucide-react";

const STAGES = [
  {
    id: "discovery",
    label: "Web Discovery",
    description: "Tavily source search",
    icon: Globe,
    color: "var(--cyan-primary)",
    bgColor: "rgba(6, 182, 212, 0.12)",
    borderColor: "rgba(6, 182, 212, 0.35)",
    glowColor: "rgba(6, 182, 212, 0.2)",
    statLabel: "Sources Found",
    statKey: "sourcesFound",
  },
  {
    id: "extraction",
    label: "AI Extraction",
    description: "LLM entity parsing",
    icon: FileSearch,
    color: "var(--indigo-light)",
    bgColor: "rgba(99, 102, 241, 0.12)",
    borderColor: "rgba(99, 102, 241, 0.35)",
    glowColor: "rgba(99, 102, 241, 0.2)",
    statLabel: "Records Extracted",
    statKey: "rawRecords",
  },
  {
    id: "deduplication",
    label: "Deduplication",
    description: "Levenshtein filtering",
    icon: FilterX,
    color: "var(--purple-primary)",
    bgColor: "rgba(168, 85, 247, 0.12)",
    borderColor: "rgba(168, 85, 247, 0.35)",
    glowColor: "rgba(168, 85, 247, 0.2)",
    statLabel: "Duplicates Removed",
    statKey: "removed",
  },
  {
    id: "validation",
    label: "Quality Validation",
    description: "Confidence scoring",
    icon: ShieldCheck,
    color: "var(--amber-primary)",
    bgColor: "rgba(245, 158, 11, 0.12)",
    borderColor: "rgba(245, 158, 11, 0.35)",
    glowColor: "rgba(245, 158, 11, 0.2)",
    statLabel: "Avg Confidence",
    statKey: "avgConfidence",
    statSuffix: "%",
  },
  {
    id: "storage",
    label: "Dataset Stored",
    description: "MongoDB committed",
    icon: Database,
    color: "var(--emerald-primary)",
    bgColor: "rgba(16, 185, 129, 0.12)",
    borderColor: "rgba(16, 185, 129, 0.35)",
    glowColor: "rgba(16, 185, 129, 0.2)",
    statLabel: "Verified Records",
    statKey: "verified",
  },
];

export default function DataLineageFlow({ lineage, isVisible = true }) {
  const lineageData = useMemo(() => {
    if (!lineage) return null;
    return lineage;
  }, [lineage]);

  if (!isVisible || !lineageData) return null;

  const getStageData = (stageId) => lineageData[stageId] || {};
  const getStageDuration = (stageData) => {
    if (stageData.startedAt && stageData.completedAt) {
      const ms = stageData.completedAt - stageData.startedAt;
      return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
    }
    return null;
  };

  return (
    <div className="lineage-container glass-panel" style={{ padding: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "38px",
            height: "38px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(16, 185, 129, 0.15))",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Zap style={{ width: "20px", height: "20px", color: "var(--cyan-primary)" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff", margin: 0 }}>
              Data Lineage Pipeline
            </h3>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", margin: 0 }}>
              Full audit trail from raw sources to verified dataset
            </p>
          </div>
        </div>
      </div>

      {/* Pipeline Flow */}
      <div className="lineage-pipeline">
        {STAGES.map((stage, index) => {
          const data = getStageData(stage.id);
          const isCompleted = data.status === "completed";
          const isPartial = data.status === "partial";
          const duration = getStageDuration(data);
          const Icon = stage.icon;
          const statValue = data[stage.statKey];

          return (
            <React.Fragment key={stage.id}>
              {/* Stage Node */}
              <div
                className={`lineage-node ${isCompleted ? "completed" : isPartial ? "partial" : "pending"}`}
                style={{
                  "--node-color": stage.color,
                  "--node-bg": stage.bgColor,
                  "--node-border": stage.borderColor,
                  "--node-glow": stage.glowColor,
                }}
              >
                {/* Icon */}
                <div className="lineage-node-icon" style={{
                  background: stage.bgColor,
                  border: `1px solid ${stage.borderColor}`,
                  color: stage.color,
                }}>
                  <Icon style={{ width: "20px", height: "20px" }} />
                  {isCompleted && (
                    <div className="lineage-check-badge">
                      <CheckCircle2 style={{ width: "12px", height: "12px" }} />
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="lineage-node-label">
                  <span style={{ fontWeight: "700", color: isCompleted ? "#fff" : "var(--text-muted)", fontSize: "0.82rem" }}>
                    {stage.label}
                  </span>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-subtle)" }}>
                    {stage.description}
                  </span>
                </div>

                {/* Stats */}
                {statValue !== undefined && statValue !== null && (
                  <div className="lineage-node-stat" style={{ color: stage.color }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: "800" }}>
                      {statValue}{stage.statSuffix || ""}
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-subtle)" }}>
                      {stage.statLabel}
                    </span>
                  </div>
                )}

                {/* Duration */}
                {duration && (
                  <div className="lineage-node-duration">
                    <Clock style={{ width: "11px", height: "11px" }} />
                    <span>{duration}</span>
                  </div>
                )}
              </div>

              {/* Connector Arrow */}
              {index < STAGES.length - 1 && (
                <div className="lineage-connector">
                  <div className={`lineage-connector-line ${isCompleted ? "active" : ""}`} />
                  <ArrowRight style={{
                    width: "14px",
                    height: "14px",
                    color: isCompleted ? stage.color : "var(--text-subtle)",
                    flexShrink: 0,
                  }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
