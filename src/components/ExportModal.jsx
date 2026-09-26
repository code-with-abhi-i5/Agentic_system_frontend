import React, { useState } from "react";
import { X, FileSpreadsheet, FileCode, FileText, Download, CheckCircle2, Sparkles, ExternalLink, Copy } from "lucide-react";
import confetti from "canvas-confetti";
import { exportDatasetToGoogleSheet } from "../services/api";

export default function ExportModal({ dataset = [], datasetId, datasetTitle, isOpen, onClose }) {
  if (!isOpen) return null;

  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [isExporting, setIsExporting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sheetSyncNotice, setSheetSyncNotice] = useState(false);
  const [copiedClipboard, setCopiedClipboard] = useState(false);

  const getDatasetKeys = () => {
    if (!Array.isArray(dataset) || dataset.length === 0) return [];
    return Array.from(
      new Set(
        dataset.flatMap((item) => (typeof item === "object" && item !== null ? Object.keys(item) : []))
      )
    ).filter(
      (k) => !["_id", "__v", "id", "datasetId"].includes(k)
    );
  };

  const getTsvData = () => {
    const keys = getDatasetKeys();
    if (keys.length === 0) return "";
    const headers = keys.map((k) => k.replace(/([A-Z])/g, ' $1').trim().replace(/^./, (str) => str.toUpperCase())).join("\t");
    const rows = dataset.map((d) => 
      keys.map((k) => {
        let val = d[k];
        if (val === undefined || val === null) return "";
        if (typeof val === "object") return JSON.stringify(val);
        return String(val).replace(/[\t\r\n]+/g, " ");
      }).join("\t")
    );
    return [headers, ...rows].join("\n");
  };

  const handleDownload = async () => {
    setIsExporting(true);

    if (selectedFormat === "sheets") {
      const tsv = getTsvData();

      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(tsv);
          setCopiedClipboard(true);
        }
      } catch (e) {}

      // Proactively open tab so popup blockers don't block async window.open
      const newTab = window.open("about:blank", "_blank");

      // Get Google Sheet URL (either custom webhook URL or sheets.new)
      let sheetUrl = "https://sheets.new";
      let isWebhookCreated = false;
      try {
        const res = await exportDatasetToGoogleSheet(datasetId);
        if (res?.sheetUrl) {
          sheetUrl = res.sheetUrl;
          if (res.mode === "webhook" || res.sheetUrl.includes("docs.google.com")) {
            isWebhookCreated = true;
          }
        }
      } catch (e) {}

      if (newTab) {
        newTab.location.href = sheetUrl;
      } else {
        window.open(sheetUrl, "_blank");
      }

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setIsExporting(false);
      setSheetSyncNotice({ active: true, isWebhookCreated, sheetUrl });
      return;
    }

    setTimeout(() => {
      let content = "";
      let filename = `kortex_dataset_${Date.now()}`;
      let mimeType = "text/plain";
      const keys = getDatasetKeys();

      if (selectedFormat === "csv") {
        const headers = keys.map((k) => `"${String(k).replace(/"/g, '""')}"`);
        const rows = dataset.map((d) =>
          keys.map((k) => {
            let val = d[k];
            if (val === undefined || val === null) return '""';
            if (typeof val === "object") val = JSON.stringify(val);
            return `"${String(val).replace(/"/g, '""')}"`;
          }).join(",")
        );
        content = [headers.join(","), ...rows].join("\n");
        filename += ".csv";
        mimeType = "text/csv;charset=utf-8;";
      } else if (selectedFormat === "json") {
        content = JSON.stringify(dataset, null, 2);
        filename += ".json";
        mimeType = "application/json;charset=utf-8;";
      } else {
        // Excel CSV fallback with tab separation
        const headers = keys.map((k) => k.replace(/([A-Z])/g, ' $1').trim().replace(/^./, (str) => str.toUpperCase())).join("\t");
        const rows = dataset.map((d) => 
          keys.map((k) => {
            let val = d[k];
            if (val === undefined || val === null) return "";
            if (typeof val === "object") return JSON.stringify(val);
            return String(val).replace(/[\t\r\n]+/g, " ");
          }).join("\t")
        );
        content = [headers, ...rows].join("\n");
        filename += ".xls";
        mimeType = "application/vnd.ms-excel";
      }

      // Trigger browser download
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Celebration Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setIsExporting(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff"
            }}>
              <Download style={{ width: "16px", height: "16px" }} />
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff" }}>
                Export Structured Dataset
              </h3>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                {datasetTitle ? `${datasetTitle} • ` : ""}{dataset?.length || 0} cleaned & source-backed records
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="matte-nav-inactive"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#fff", width: "30px", height: "30px", padding: 0, borderRadius: "8px" }}
          >
            <X style={{ width: "15px", height: "15px" }} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>
            SELECT EXPORT DESTINATION:
          </label>

          {/* Option: Google Sheets (Premier 1-Click Cloud Sync) */}
          <div
            onClick={() => setSelectedFormat("sheets")}
            className="export-option-card"
            style={{
              borderColor: selectedFormat === "sheets" ? "var(--emerald-primary)" : "var(--border-subtle)",
              background: selectedFormat === "sheets" ? "rgba(16, 185, 129, 0.08)" : "var(--bg-tertiary)",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "#0F9D58",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <FileSpreadsheet style={{ width: "17px", height: "17px", color: "#fff" }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "#fff", display: "block" }}>
                    Google Sheets
                  </span>
                  <span style={{
                    fontSize: "0.62rem",
                    padding: "1px 6px",
                    borderRadius: "4px",
                    background: "rgba(16, 185, 129, 0.2)",
                    color: "var(--emerald-primary)",
                    fontWeight: "700",
                    letterSpacing: "0.03em"
                  }}>
                    1-CLICK FREE
                  </span>
                </div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                  Open in Google Sheets with pre-formatted grid columns & clipboard paste
                </span>
              </div>
            </div>
            <span style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: selectedFormat === "sheets" ? "var(--emerald-primary)" : "var(--border-medium)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: selectedFormat === "sheets" ? "var(--emerald-primary)" : "transparent"
            }}>
              {selectedFormat === "sheets" && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }}></span>}
            </span>
          </div>

          {/* Option: CSV */}
          <div
            onClick={() => setSelectedFormat("csv")}
            className="export-option-card"
            style={{
              borderColor: selectedFormat === "csv" ? "#fff" : "var(--border-subtle)",
              background: selectedFormat === "csv" ? "rgba(255, 255, 255, 0.05)" : "var(--bg-tertiary)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <FileSpreadsheet style={{ width: "22px", height: "22px", color: "var(--emerald-primary)" }} />
              <div>
                <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "#fff", display: "block" }}>
                  CSV (Comma Separated)
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                  Ideal for Pandas, Excel, or CRM database imports
                </span>
              </div>
            </div>
            <span style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: selectedFormat === "csv" ? "#fff" : "var(--border-medium)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: selectedFormat === "csv" ? "#fff" : "transparent"
            }}>
              {selectedFormat === "csv" && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }}></span>}
            </span>
          </div>

          {/* Option: Excel */}
          <div
            onClick={() => setSelectedFormat("excel")}
            className="export-option-card"
            style={{
              borderColor: selectedFormat === "excel" ? "#fff" : "var(--border-subtle)",
              background: selectedFormat === "excel" ? "rgba(255, 255, 255, 0.05)" : "var(--bg-tertiary)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <FileText style={{ width: "22px", height: "22px", color: "var(--cyan-primary)" }} />
              <div>
                <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "#fff", display: "block" }}>
                  Excel Spreadsheet (.xls)
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                  Pre-formatted Microsoft Excel workbook with column headers
                </span>
              </div>
            </div>
            <span style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: selectedFormat === "excel" ? "#fff" : "var(--border-medium)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: selectedFormat === "excel" ? "#fff" : "transparent"
            }}>
              {selectedFormat === "excel" && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }}></span>}
            </span>
          </div>

          {/* Option: JSON */}
          <div
            onClick={() => setSelectedFormat("json")}
            className="export-option-card"
            style={{
              borderColor: selectedFormat === "json" ? "#fff" : "var(--border-subtle)",
              background: selectedFormat === "json" ? "rgba(255, 255, 255, 0.05)" : "var(--bg-tertiary)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <FileCode style={{ width: "22px", height: "22px", color: "var(--amber-primary)" }} />
              <div>
                <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "#fff", display: "block" }}>
                  JSON (Raw Structured Data)
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
                  Full payload with nested source metadata & confidence
                </span>
              </div>
            </div>
            <span style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: selectedFormat === "json" ? "#fff" : "var(--border-medium)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: selectedFormat === "json" ? "#fff" : "transparent"
            }}>
              {selectedFormat === "json" && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }}></span>}
            </span>
          </div>

          {/* Google Sheets Sync Notification Card */}
          {sheetSyncNotice && (
            <div style={{
              marginTop: "0.75rem",
              padding: "0.8rem 1rem",
              borderRadius: "10px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              fontSize: "0.78rem",
              color: "#e5e5e5",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 style={{ width: "16px", height: "16px", color: "var(--emerald-primary)", flexShrink: 0 }} />
                <span style={{ fontWeight: "700", color: "#fff" }}>
                  {sheetSyncNotice?.isWebhookCreated ? "Spreadsheet Created in Google Drive! 🚀" : "Google Sheets opened in new tab! 🎉"}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.74rem", color: "#aaa", lineHeight: "1.4" }}>
                {sheetSyncNotice?.isWebhookCreated
                  ? `Your dataset (${dataset?.length || 0} records) has been populated directly into your Google Sheet!`
                  : `All ${dataset?.length || 0} records are copied to your clipboard. Click on Cell A1 in Google Sheets and press Ctrl+V (or Cmd+V) to paste your pre-formatted table.`
                }
              </p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.2rem" }}>
                <button
                  onClick={() => {
                    const tsv = getTsvData();
                    navigator.clipboard.writeText(tsv);
                    setCopiedClipboard(true);
                    setTimeout(() => setCopiedClipboard(false), 2000);
                  }}
                  className="matte-nav-inactive"
                  style={{ fontSize: "0.72rem", padding: "0.3rem 0.6rem", display: "inline-flex", alignItems: "center", gap: "0.35rem", cursor: "pointer" }}
                >
                  <Copy style={{ width: "12px", height: "12px" }} />
                  <span>{copiedClipboard ? "Copied!" : "Copy Data Again"}</span>
                </button>
                <a
                  href={sheetSyncNotice?.sheetUrl || "https://sheets.new"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.72rem", padding: "0.3rem 0.6rem", display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--emerald-primary)", textDecoration: "none" }}
                >
                  <ExternalLink style={{ width: "12px", height: "12px" }} />
                  <span>Re-open Google Sheet</span>
                </a>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
            <button onClick={onClose} className="matte-nav-inactive">
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={isExporting || success}
              className={selectedFormat === "sheets" ? "matte-btn-white" : "matte-btn-white"}
              style={{
                minWidth: "160px",
                background: selectedFormat === "sheets" ? "var(--emerald-primary)" : "#fff",
                color: selectedFormat === "sheets" ? "#000" : "#000",
                fontWeight: "700"
              }}
            >
              {selectedFormat === "sheets" ? (
                isExporting ? (
                  <span>Syncing...</span>
                ) : (
                  <>
                    <ExternalLink style={{ width: "15px", height: "15px" }} />
                    <span>Open in Google Sheets ↗</span>
                  </>
                )
              ) : success ? (
                <>
                  <CheckCircle2 style={{ width: "16px", height: "16px" }} />
                  <span>Downloaded!</span>
                </>
              ) : isExporting ? (
                <span>Generating...</span>
              ) : (
                <>
                  <Download style={{ width: "16px", height: "16px" }} />
                  <span>Download File</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

