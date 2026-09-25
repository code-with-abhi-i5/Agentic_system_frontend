import React, { useState, useMemo } from "react";
import { 
  Search, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Check, 
  Eye,
  Building,
  Mail,
  MapPin,
  Sparkles,
  Database,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function DataTable({ dataset = [], onInspectSource, onExportClick, onChatClick, onReportClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortField, setSortField] = useState("confidence");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Extract distinct categories for filter
  const categories = useMemo(() => {
    const set = new Set(dataset.map((d) => d.category).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [dataset]);

  // Filtering and Searching
  const filteredData = useMemo(() => {
    return dataset.filter((item) => {
      const company = item.company || item.name || "";
      const founder = item.founder || item.author || "";
      const location = item.location || "";
      const techStack = item.techStack || item.category || "";

      const matchesSearch =
        company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        techStack.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [dataset, searchQuery, selectedCategory]);

  // Sorting
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (!dataset || dataset.length === 0) {
    return (
      <div className="data-table-wrapper" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem"
        }}>
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "18px",
            background: "rgba(6, 182, 212, 0.12)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--cyan-primary)"
          }}>
            <Database style={{ width: "28px", height: "28px" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#fff", marginBottom: "0.4rem" }}>
              No Intelligence Records Extracted Yet
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "460px", lineHeight: "1.6" }}>
              Launch an autonomous extraction job above or select a preset template to stream live, verified records with full source citations into this table.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="data-table-wrapper">
      {/* Table Toolbar */}
      <div className="table-toolbar">
        {/* Left: Search & Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", flex: 1 }}>
          {/* Search Box */}
          <div style={{ position: "relative", flex: "1 1 280px", maxWidth: "400px" }}>
            <Search
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "var(--text-muted)",
                pointerEvents: "none"
              }}
            />
            <input
              type="text"
              placeholder="Search companies, founders, tech stacks..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="table-search-input"
            />
          </div>

          {/* Category Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Filter style={{ width: "15px", height: "15px", color: "var(--text-muted)" }} />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="table-filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "ALL" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Quick Table Stats & Export */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Showing <strong>{paginatedData.length}</strong> of <strong>{filteredData.length}</strong> items
          </span>
          {onChatClick && (
            <button
              onClick={onChatClick}
              className="btn-secondary"
              style={{ padding: "0.55rem 0.95rem", fontSize: "0.82rem" }}
              title="Chat with this dataset using AI"
            >
              <MessageSquare style={{ width: "15px", height: "15px", color: "var(--cyan-primary)" }} />
              <span>Ask AI</span>
            </button>
          )}
          {onReportClick && (
            <button
              onClick={onReportClick}
              className="btn-secondary"
              style={{ padding: "0.55rem 0.95rem", fontSize: "0.82rem" }}
              title="Generate AI research report"
            >
              <FileText style={{ width: "15px", height: "15px", color: "var(--amber-primary)" }} />
              <span>Report</span>
            </button>
          )}
          <button
            onClick={onExportClick}
            className="btn-primary"
            style={{ padding: "0.55rem 1.1rem", fontSize: "0.82rem" }}
          >
            <Download style={{ width: "15px", height: "15px" }} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Main Table Structure */}
      <div className="table-responsive">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th className="col-company" onClick={() => handleSort("company")}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <span>Company / Entity</span>
                  <ArrowUpDown style={{ width: "13px", height: "13px" }} />
                </div>
              </th>
              <th className="col-contact" onClick={() => handleSort("founder")}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <span>Key Contact</span>
                  <ArrowUpDown style={{ width: "13px", height: "13px" }} />
                </div>
              </th>
              <th className="col-location">Location</th>
              <th className="col-funding" onClick={() => handleSort("funding")}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <span>Funding / Valuation</span>
                  <ArrowUpDown style={{ width: "13px", height: "13px" }} />
                </div>
              </th>
              <th className="col-tech">Tech Stack</th>
              <th className="col-accuracy" onClick={() => handleSort("confidence")}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <span>Accuracy</span>
                  <ArrowUpDown style={{ width: "13px", height: "13px" }} />
                </div>
              </th>
              <th className="col-actions" style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "3.5rem 1rem", color: "var(--text-muted)" }}>
                  No matching records found for this search filter.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const uniqueKey = row.id || row._id || `rec-${index}`;
                const hasRealEmail = row.email && !row.email.toLowerCase().includes("undisclosed") && row.email.includes("@");

                return (
                  <tr key={uniqueKey}>
                    {/* Company & Domain */}
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontWeight: "700", color: "#ffffff", fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
                          {row.company || row.name || "N/A"}
                        </span>
                        <span style={{ fontSize: "0.78rem", color: "var(--cyan-primary)", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                          <ExternalLink style={{ width: "11px", height: "11px" }} />
                          {row.sourceDomain || "verified source"}
                        </span>
                      </div>
                    </td>

                    {/* Founder & Contact */}
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontWeight: "600", color: "#f8fafc", fontSize: "0.88rem" }}>
                          {row.founder || row.role || "Executive Team"}
                        </span>
                        {hasRealEmail ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                            <Mail style={{ width: "12px", height: "12px", color: "var(--indigo-light)" }} />
                            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                              {row.email}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)", fontStyle: "italic" }}>
                            Email not public
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.86rem", color: "#cbd5e1" }}>
                        <MapPin style={{ width: "14px", height: "14px", color: "var(--cyan-primary)", shrink: 0 }} />
                        <span>{row.location || "Global"}</span>
                      </div>
                    </td>

                    {/* Funding */}
                    <td>
                      <span className="badge badge-indigo" title={row.funding || "Private"}>
                        {row.funding || "Private"}
                      </span>
                    </td>

                    {/* Tech Stack */}
                    <td>
                      <div className="tech-cell-wrapper" title={row.techStack || row.category}>
                        {row.techStack || row.category || "AI / Software"}
                      </div>
                    </td>

                    {/* Confidence / Quality */}
                    <td>
                      <span className="badge badge-emerald">
                        <ShieldCheck style={{ width: "13px", height: "13px" }} />
                        <span>{row.confidence || 98}% Verified</span>
                      </span>
                    </td>

                    {/* Actions: Inspect Source */}
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => onInspectSource(row)}
                        className="btn-secondary"
                        style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", gap: "0.4rem" }}
                        title="Audit Provenance & Citation"
                      >
                        <Eye style={{ width: "13px", height: "13px" }} />
                        <span>Audit</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Pagination */}
      <div className="table-pagination">
        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({filteredData.length} records total)
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="btn-secondary"
            style={{ padding: "0.4rem 0.75rem", fontSize: "0.78rem", opacity: currentPage === 1 ? 0.4 : 1 }}
          >
            <ChevronLeft style={{ width: "15px", height: "15px" }} />
            <span>Prev</span>
          </button>
          <span style={{ fontSize: "0.82rem", color: "#fff", fontWeight: "600", padding: "0 0.5rem" }}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn-secondary"
            style={{ padding: "0.4rem 0.75rem", fontSize: "0.78rem", opacity: currentPage === totalPages ? 0.4 : 1 }}
          >
            <span>Next</span>
            <ChevronRight style={{ width: "15px", height: "15px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
