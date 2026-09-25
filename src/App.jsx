import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import OverviewStats from "./components/OverviewStats";
import PromptStudio from "./components/PromptStudio";
import LiveSwarmTracker from "./components/LiveSwarmTracker";
import DataTable from "./components/DataTable";
import SourceInspectorDrawer from "./components/SourceInspectorDrawer";
import ExportModal from "./components/ExportModal";
import HistoryView from "./components/HistoryView";
import GovernanceView from "./components/GovernanceView";
import SchemaReviewModal from "./components/SchemaReviewModal";
import AIChatPanel from "./components/AIChatPanel";
import DataLineageFlow from "./components/DataLineageFlow";
import ResearchReportModal from "./components/ResearchReportModal";
import AuthModal from "./components/AuthModal";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import { useAuth } from "./context/AuthContext";
import { getBackendDatasets, getBackendTasks, launchBackendTask, confirmSchema } from "./services/api";
import confetti from "canvas-confetti";

export default function App() {
  const { user, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState("landing"); // 'landing' | 'auth' | 'dashboard'
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'signup'
  const [activeTab, setActiveTab] = useState("mission-control");
  const [dataset, setDataset] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [inspectingRecord, setInspectingRecord] = useState(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Feature 1: Schema Review State
  const [showSchemaReview, setShowSchemaReview] = useState(false);
  const [schemaReviewData, setSchemaReviewData] = useState(null);

  // Feature 2: AI Chat State
  const [showAIChat, setShowAIChat] = useState(false);
  const [currentDatasetId, setCurrentDatasetId] = useState(null);
  const [currentDatasetTitle, setCurrentDatasetTitle] = useState("");

  // Feature 3: Data Lineage State
  const [lineageData, setLineageData] = useState(null);

  // Feature 4: Research Report State
  const [showReportModal, setShowReportModal] = useState(false);

  // Sync with Backend on Mount
  const refreshBackendData = async () => {
    try {
      const backendDatasets = await getBackendDatasets();
      if (backendDatasets && backendDatasets.length > 0) {
        setIsBackendConnected(true);
        // Load the most recent dataset's records
        const latest = backendDatasets[0];
        setDataset(latest?.records || []);
        setCurrentDatasetId(latest?._id || null);
        setCurrentDatasetTitle(latest?.title || "");
        // Load lineage if available
        if (latest?.lineage) {
          setLineageData(latest.lineage);
        }
      } else {
        setIsBackendConnected(true);
      }

      const backendTasks = await getBackendTasks();
      if (backendTasks && Array.isArray(backendTasks)) {
        setTasks(backendTasks);
      }
    } catch (err) {
      console.warn("Backend not yet reachable:", err.message);
      setIsBackendConnected(false);
    }
  };

  useEffect(() => {
    refreshBackendData();
  }, [user]);

  // Autonomous Extraction calling real Backend SSE Task API
  const handleLaunchExtraction = async ({ prompt, maxRecords, strictDeduplication }) => {
    setIsRunning(true);
    setCurrentStep(1);
    setLineageData(null);

    const timeStr = new Date().toTimeString().split(" ")[0];
    setLogs([
      {
        time: timeStr,
        agent: "IntentAnalyzer",
        type: "info",
        msg: `Incoming prompt received: "${prompt.slice(0, 60)}...". Compiling dynamic Zod schema.`
      }
    ]);

    await launchBackendTask(
      { prompt, maxRecords, strictDeduplication },
      {
        onStatus: (status) => {
          if (status.includes("Planning")) setCurrentStep(1);
          else if (status.includes("Discovering") || status.includes("Tavily")) setCurrentStep(2);
          else if (status.includes("Scraping") || status.includes("Puppeteer") || status.includes("Extracting")) setCurrentStep(3);
          else if (status.includes("Deduplication") || status.includes("Validation")) setCurrentStep(4);
        },
        onLog: (log) => {
          if (log) setLogs((prev) => [...prev, log]);
        },
        onProgress: (progress) => {
          if (progress >= 85) setCurrentStep(5);
        },
        onDataset: (newDataset) => {
          if (newDataset?.records?.length) {
            setDataset((prev) => [...newDataset.records, ...prev]);
            setCurrentDatasetId(newDataset._id || null);
            setCurrentDatasetTitle(newDataset.title || "");
          }
        },
        // Feature 1: Schema Review Handler
        onSchemaReview: (data) => {
          setSchemaReviewData(data);
          setShowSchemaReview(true);
          setCurrentStep(5);
          setIsRunning(false);
          setLogs((prev) => [
            ...prev,
            {
              time: new Date().toTimeString().split(" ")[0],
              agent: "SchemaDetector",
              type: "success",
              msg: `Schema detected with ${data.proposedSchema?.length || 0} fields. Awaiting your review...`,
            },
          ]);
        },
        // Feature 3: Lineage Updates
        onLineageUpdate: (data) => {
          setLineageData((prev) => ({
            ...(prev || {}),
            [data.stage]: data.data,
          }));
        },
        onAwaitingConfirmation: () => {
          // SSE stream has ended, waiting for schema confirmation
          setIsRunning(false);
        },
        onDone: () => {
          setCurrentStep(5);
          setIsRunning(false);
          refreshBackendData();
          try {
            confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
          } catch (e) {}
        },
        onError: (err) => {
          setIsRunning(false);
          setLogs((prev) => [
            ...prev,
            {
              time: new Date().toTimeString().split(" ")[0],
              agent: "Engine",
              type: "error",
              msg: `Execution error: ${err.message}`
            }
          ]);
        }
      }
    );
  };

  // Feature 1: Handle Schema Confirmation
  const handleSchemaConfirm = async ({ taskId, approvedSchema, fieldMappings, excludedFields }) => {
    try {
      const result = await confirmSchema(taskId, {
        approvedSchema,
        fieldMappings,
        excludedFields,
      });

      if (result.success && result.data?.dataset) {
        const newDataset = result.data.dataset;
        setDataset(newDataset.records || []);
        setCurrentDatasetId(newDataset._id || null);
        setCurrentDatasetTitle(newDataset.title || "");

        // Update lineage with storage stage
        if (newDataset.lineage) {
          setLineageData(newDataset.lineage);
        }

        setShowSchemaReview(false);
        setSchemaReviewData(null);

        // Refresh backend data
        refreshBackendData();

        // Confetti celebration
        try {
          confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        } catch (e) {}

        setLogs((prev) => [
          ...prev,
          {
            time: new Date().toTimeString().split(" ")[0],
            agent: "Engine",
            type: "success",
            msg: `Dataset saved with ${newDataset.records?.length || 0} records and custom schema applied! 🎉`,
          },
        ]);
      }
    } catch (err) {
      console.error("Schema confirmation error:", err);
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toTimeString().split(" ")[0],
          agent: "Engine",
          type: "error",
          msg: `Schema confirmation failed: ${err.message}`,
        },
      ]);
    }
  };

  const handleLoadWorkflowDataset = (task) => {
    if (task.datasetId?.records?.length) {
      setDataset(task.datasetId.records);
      setCurrentDatasetId(task.datasetId._id || null);
      setCurrentDatasetTitle(task.datasetId.title || "");
      if (task.datasetId.lineage) {
        setLineageData(task.datasetId.lineage);
      }
    }
    setActiveTab("datasets");
  };

  if (currentView === "landing") {
    return (
      <LandingPage
        onEnterApp={() => setCurrentView("dashboard")}
        onOpenAuth={(mode = "login") => {
          setAuthMode(mode);
          setCurrentView("auth");
        }}
      />
    );
  }

  if (currentView === "auth") {
    return (
      <AuthPage
        initialMode={authMode}
        onBackToHome={() => setCurrentView("landing")}
        onSuccessLogin={() => setCurrentView("dashboard")}
      />
    );
  }

  return (
    <div className="app-container">
      {/* 1. Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        datasetCount={dataset.length}
        taskCount={tasks.length}
        isBackendConnected={isBackendConnected}
        onGoToLanding={() => setCurrentView("landing")}
      />

      {/* 2. Main Viewport */}
      <div className="main-viewport">
        {/* Top Header */}
        <TopHeader
          activeTab={activeTab}
          onNewTaskClick={() => setActiveTab("mission-control")}
          onExportClick={() => setIsExportModalOpen(true)}
          onGoToLanding={() => setCurrentView("landing")}
        />

        {/* Content Area */}
        <main className="content-wrapper">
          {/* TAB 1: MISSION CONTROL (Prompt Studio + Live Swarm Tracker + Data Table) */}
          {activeTab === "mission-control" && (
            <>
              {/* Executive Stats Banner with Live Dynamic Values */}
              <OverviewStats dataset={dataset} tasks={tasks} isRunning={isRunning} />

              {/* Prompt Studio Input Box */}
              <PromptStudio
                onLaunchExtraction={handleLaunchExtraction}
                isRunning={isRunning}
              />

              {/* Live Multi-Agent Swarm Tracker Pipeline & Terminal */}
              <LiveSwarmTracker
                currentStep={currentStep}
                logs={logs}
                isRunning={isRunning}
              />

              {/* Feature 3: Data Lineage Visualizer */}
              <DataLineageFlow
                lineage={lineageData}
                isVisible={!!lineageData}
              />

              {/* Centralized Interactive Data Table */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff" }}>
                      Extracted Structured Intelligence
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Real-time source-backed dataset verified by autonomous quality guardrails
                    </p>
                  </div>
                </div>

                <DataTable
                  dataset={dataset}
                  onInspectSource={(record) => setInspectingRecord(record)}
                  onExportClick={() => setIsExportModalOpen(true)}
                  onChatClick={() => setShowAIChat(true)}
                  onReportClick={() => setShowReportModal(true)}
                />
              </div>
            </>
          )}

          {/* TAB 2: EXECUTIVE OVERVIEW */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <OverviewStats dataset={dataset} tasks={tasks} isRunning={isRunning} />

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                gap: "1.5rem"
              }}>
                <div className="glass-panel">
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff", marginBottom: "0.5rem" }}>
                    Autonomous Scraping vs Manual Scrapers
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                    How Kortex AI eliminates workflow maintenance overhead
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.82rem" }}>
                    <div style={{ padding: "0.75rem", borderRadius: "10px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "var(--emerald-primary)" }}>
                      ✓ <strong>Zero-Maintenance Scrapers:</strong> Agent adapts to DOM changes on-the-fly.
                    </div>
                    <div style={{ padding: "0.75rem", borderRadius: "10px", background: "rgba(6, 182, 212, 0.08)", border: "1px solid rgba(6, 182, 212, 0.2)", color: "var(--cyan-primary)" }}>
                      ✓ <strong>Source Provenance:</strong> Every record is linked with full URL citations.
                    </div>
                    <div style={{ padding: "0.75rem", borderRadius: "10px", background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.2)", color: "var(--indigo-light)" }}>
                      ✓ <strong>Multi-Model Balancing:</strong> Heavy tools use Groq / Tavily, summarization uses Qwen / Llama.
                    </div>
                  </div>
                </div>

                <div className="glass-panel">
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff", marginBottom: "0.5rem" }}>
                    Data Cleanliness Guardrails
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                    Active validation metrics applied to every extraction run
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "0.3rem" }}>
                        <span style={{ color: "#cbd5e1" }}>Schema Conformance</span>
                        <span style={{ color: "var(--emerald-primary)", fontWeight: "700" }}>100%</span>
                      </div>
                      <div style={{ height: "6px", background: "var(--bg-tertiary)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ width: "100%", height: "100%", background: "var(--emerald-primary)" }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "0.3rem" }}>
                        <span style={{ color: "#cbd5e1" }}>Duplicate Elimination Rate</span>
                        <span style={{ color: "var(--cyan-primary)", fontWeight: "700" }}>98.5%</span>
                      </div>
                      <div style={{ height: "6px", background: "var(--bg-tertiary)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ width: "98.5%", height: "100%", background: "var(--cyan-primary)" }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "0.3rem" }}>
                        <span style={{ color: "#cbd5e1" }}>Source Verification Completeness</span>
                        <span style={{ color: "var(--indigo-light)", fontWeight: "700" }}>100.0%</span>
                      </div>
                      <div style={{ height: "6px", background: "var(--bg-tertiary)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ width: "100%", height: "100%", background: "var(--indigo-primary)" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DATASETS EXPLORER */}
          {activeTab === "datasets" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="glass-panel" style={{ padding: "1.5rem" }}>
                <h2 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#fff" }}>
                  Centralized Dataset Repository
                </h2>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Search, filter, inspect provenance, and export your collected business intelligence
                </p>
              </div>

              {/* Lineage for current dataset */}
              <DataLineageFlow
                lineage={lineageData}
                isVisible={!!lineageData}
              />

              <DataTable
                dataset={dataset}
                onInspectSource={(record) => setInspectingRecord(record)}
                onExportClick={() => setIsExportModalOpen(true)}
                onChatClick={() => setShowAIChat(true)}
                onReportClick={() => setShowReportModal(true)}
              />
            </div>
          )}

          {/* TAB 4: WORKFLOW HISTORY */}
          {activeTab === "history" && (
            <HistoryView onLoadWorkflowDataset={handleLoadWorkflowDataset} />
          )}

          {/* TAB 5: SOURCE GOVERNANCE */}
          {activeTab === "governance" && (
            <GovernanceView />
          )}
        </main>
      </div>

      {/* 3. Deep Source Inspector Slide-Over Drawer */}
      <SourceInspectorDrawer
        record={inspectingRecord}
        onClose={() => setInspectingRecord(null)}
      />

      {/* 4. Export Modal (CSV / Excel / JSON) */}
      <ExportModal
        dataset={dataset}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Feature 1: Schema Review Modal */}
      <SchemaReviewModal
        isOpen={showSchemaReview}
        proposedSchema={schemaReviewData?.proposedSchema || []}
        sampleRecords={schemaReviewData?.sampleRecords || []}
        totalRecords={schemaReviewData?.totalRecords || 0}
        datasetTitle={schemaReviewData?.datasetTitle || ""}
        taskId={schemaReviewData?.taskId || ""}
        onConfirm={handleSchemaConfirm}
        onClose={() => {
          setShowSchemaReview(false);
          setSchemaReviewData(null);
        }}
      />

      {/* Feature 2: AI Chat Panel */}
      <AIChatPanel
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        datasetId={currentDatasetId}
        datasetTitle={currentDatasetTitle}
        totalRecords={dataset.length}
      />

      {/* Feature 4: Research Report Modal */}
      <ResearchReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        datasetId={currentDatasetId}
        datasetTitle={currentDatasetTitle}
      />

      {/* Operator Authentication Modal */}
      <AuthModal />
    </div>
  );
}
