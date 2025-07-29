import React from "react";
import { useStore } from "../store/useStore";

export default function SessionSidebar() {
  const sessions = useStore((state) => state.sessions);
  const activeSession = useStore((state) => state.activeSession);
  const selectSession = useStore((state) => state.selectSession);
  const createSession = useStore((state) => state.createSession);

  return (
    <aside style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <button
        onClick={createSession}
        style={{
          padding: "12px",
          marginBottom: 18,
          backgroundColor: "#0366d6",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: "700",
          fontSize: 16,
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(3,102,214,.3)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={e => (e.target.style.backgroundColor = "#0356b6")}
        onMouseLeave={e => (e.target.style.backgroundColor = "#0366d6")}
      >
        + New Session
      </button>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          overflowY: "auto",
          flex: 1,
        }}
      >
        {sessions.length === 0 && (
          <li style={{ color: "#888", fontStyle: "italic", padding: 8, userSelect: "none" }}>
            No sessions found.
          </li>
        )}
        {sessions.map((session) => {
          const isActive = activeSession?._id === session._id;
          return (
            <li
              key={session._id}
              onClick={() => selectSession(session)}
              style={{
                padding: "12px",
                marginBottom: 10,
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: isActive ? "700" : "normal",
                fontSize: 16,
                backgroundColor: isActive ? "#cae0ff" : "transparent",
                color: isActive ? "#0366d6" : "#222",
                userSelect: "none",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.target.style.backgroundColor = "#e7f0ff";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.target.style.backgroundColor = "transparent";
              }}
              title={`Last updated: ${new Date(session.updatedAt).toLocaleString()}`}
            >
              {session.name || `Session ${new Date(session.createdAt).toLocaleString()}`}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
