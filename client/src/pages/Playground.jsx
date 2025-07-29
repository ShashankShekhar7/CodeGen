// src/pages/Playground.jsx
import React, { useEffect } from "react";
import { useStore } from "../store/useStore";
import SessionSidebar from "../components/SessionSidebar";
import ChatPanel from "../components/ChatPanel";
import PreviewIframe from "../components/PreviewIframe";
import CodeTabs from "../components/CodeTabs";
import TopBar from "../components/TopBar";

export default function Playground() {
  const fetchUserSessions = useStore((state) => state.fetchUserSessions);
  const activeSession = useStore((state) => state.activeSession);

  useEffect(() => {
    fetchUserSessions();
  }, [fetchUserSessions]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f3f6f9",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 280,
          boxSizing: "border-box",
          borderRight: "1px solid #ddd",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: 20,
          boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
        }}
      >
        <SessionSidebar />
      </div>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 20,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Topbar for controls */}
        <TopBar />

        {!activeSession ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 18,
              color: "#666",
              fontWeight: 500,
            }}
          >
            Please select or create a session.
          </div>
        ) : (
          <>
            {/* Horizontal split: chat + preview */}
            <section
              style={{
                display: "flex",
                flex: "0 0 45%",
                gap: 20,
                marginTop: 16,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <ChatPanel
                style={{
                  flex: 1,
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                  overflow: "hidden",
                }}
              />
              <PreviewIframe
                style={{
                  flex: 1,
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                  overflow: "hidden",
                }}
              />
            </section>

            {/* Code tabs */}
            <section
              style={{
                flex: 1,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                overflow: "hidden",
                padding: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CodeTabs />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
