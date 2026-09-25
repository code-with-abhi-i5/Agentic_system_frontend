import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Lightbulb,
  ArrowRight,
  Database,
  Loader2,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AIChatPanel({ isOpen, onClose, datasetId, datasetTitle, totalRecords }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedFollowups, setSuggestedFollowups] = useState([
    "How many companies are in this dataset?",
    "What are the top locations?",
    "Which companies have the highest confidence scores?",
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Reset conversation when dataset changes
  useEffect(() => {
    setMessages([]);
    setSuggestedFollowups([
      "How many companies are in this dataset?",
      "What are the top locations?",
      "Which companies have the highest confidence scores?",
    ]);
  }, [datasetId]);

  const sendMessage = async (question) => {
    if (!question.trim() || !datasetId || isLoading) return;

    const userMessage = {
      role: "user",
      content: question,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setSuggestedFollowups([]);

    try {
      const conversationHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch(`${API_BASE}/datasets/${datasetId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, conversationHistory }),
      });

      if (!res.ok) throw new Error(`Server returned status: ${res.status}`);
      const data = await res.json();

      const aiMessage = {
        role: "assistant",
        content: data.data?.answer || "I couldn't generate a response.",
        timestamp: new Date().toLocaleTimeString(),
        dataInsight: data.data?.dataInsight,
        relevantRecords: data.data?.relevantRecords || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
      setSuggestedFollowups(data.data?.suggestedFollowups || []);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${err.message}. Please try again.`,
          timestamp: new Date().toLocaleTimeString(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-chat-overlay" onClick={onClose}>
      <div className="ai-chat-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-chat-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(99, 102, 241, 0.2))",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <MessageSquare style={{ width: "20px", height: "20px", color: "var(--cyan-primary)" }} />
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: "800", color: "#fff", margin: 0 }}>
                Chat with Dataset
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                <Database style={{ width: "11px", height: "11px" }} />
                <span>{datasetTitle || "Current Dataset"} • {totalRecords || 0} records</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="ai-chat-close-btn">
            <X style={{ width: "18px", height: "18px" }} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="ai-chat-messages">
          {messages.length === 0 && (
            <div className="ai-chat-welcome">
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}>
                <Bot style={{ width: "28px", height: "28px", color: "var(--cyan-primary)" }} />
              </div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", marginBottom: "0.4rem" }}>
                Ask anything about your data
              </h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", maxWidth: "320px", lineHeight: "1.6" }}>
                I can analyze records, find patterns, compute stats, and answer questions about your extracted dataset.
              </p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`ai-chat-bubble ${msg.role}`}>
              <div className="bubble-avatar">
                {msg.role === "user" ? (
                  <User style={{ width: "14px", height: "14px" }} />
                ) : (
                  <Bot style={{ width: "14px", height: "14px" }} />
                )}
              </div>
              <div className="bubble-content">
                <div className={`bubble-text ${msg.isError ? "error" : ""}`}>
                  {msg.content}
                </div>
                {msg.dataInsight && (
                  <div className="bubble-insight">
                    <Lightbulb style={{ width: "13px", height: "13px", color: "var(--amber-primary)", flexShrink: 0 }} />
                    <span>{msg.dataInsight}</span>
                  </div>
                )}
                {msg.relevantRecords && msg.relevantRecords.length > 0 && (
                  <div className="bubble-records-badge">
                    <Database style={{ width: "12px", height: "12px" }} />
                    <span>{msg.relevantRecords.length} relevant records found</span>
                  </div>
                )}
                <span className="bubble-time">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="ai-chat-bubble assistant">
              <div className="bubble-avatar">
                <Bot style={{ width: "14px", height: "14px" }} />
              </div>
              <div className="bubble-content">
                <div className="ai-typing-indicator">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Follow-ups */}
        {suggestedFollowups.length > 0 && !isLoading && (
          <div className="ai-chat-suggestions">
            {suggestedFollowups.slice(0, 3).map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(suggestion)}
                className="suggestion-chip"
              >
                <Sparkles style={{ width: "12px", height: "12px", color: "#fff", flexShrink: 0 }} />
                <span>{suggestion}</span>
                <ArrowRight style={{ width: "11px", height: "11px", color: "var(--text-subtle)", flexShrink: 0 }} />
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <form className="ai-chat-input-area" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about your dataset..."
            disabled={isLoading || !datasetId}
            className="ai-chat-input"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim() || !datasetId}
            className="ai-chat-send-btn"
          >
            {isLoading ? (
              <Loader2 style={{ width: "18px", height: "18px", animation: "spin 1s linear infinite" }} />
            ) : (
              <Send style={{ width: "18px", height: "18px" }} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
