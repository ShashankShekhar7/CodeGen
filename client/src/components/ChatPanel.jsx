import React, { useState, useRef, useEffect } from "react";
import { useStore } from "../store/useStore";

export default function ChatPanel(props) {
  const chat = useStore((state) => state.chat);
  const sendPrompt = useStore((state) => state.sendPrompt);
  const loading = useStore((state) => state.loading);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef();

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat.length]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    await sendPrompt(input.trim());
    setInput("");
  };

  return (
    <section
      style={{
        ...props.style,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: 6,
        boxSizing: "border-box"
      }}
    >
      {/* Messages area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 8,
          border: "1px solid #eee",
          borderRadius: 6,
          padding: 12,
          backgroundColor: "#fafbfc",
          minHeight: 0 // for flexbox scroll fix
        }}
      >
        {chat.length === 0 && (
          <div style={{ color: "#888", fontStyle: "italic" }}>
            Type your prompt below to start...
          </div>
        )}
        {chat.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "7px 0",
              wordBreak: "break-word",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                color: msg.role === "user" ? "#1c6" : "#09c",
                userSelect: "none",
              }}
            >
              {msg.role === "user" ? "You" : "AI"}:
            </span>{" "}
            <span>{msg.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      {/* Input area */}
      <form
        onSubmit={handleSend}
        style={{ display: "flex", gap: 8, alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Send a prompt to create a component..."
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 5,
            border: "1px solid #ccc",
            fontSize: 15,
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: "10px 20px",
            borderRadius: 5,
            border: "none",
            backgroundColor: loading || !input.trim() ? "#ccc" : "#007bff",
            color: loading || !input.trim() ? "#666" : "#fff",
            cursor: loading || !input.trim() ? "default" : "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
    </section>
  );
}
