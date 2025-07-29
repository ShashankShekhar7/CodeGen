import React from "react";
import LogoutButton from "./LogoutButton";

export default function TopBar() {
  return (
    <header
      style={{
        height: 56,
        borderBottom: "1px solid #e1e4e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        fontSize: 20,
        fontWeight: "600",
        color: "#0366d6",
        boxShadow: "0 1px 3px rgba(27,31,35,.1)",
        backgroundColor: "#fff",
        userSelect: "none",
      }}
    >
      <div>CodeGen Playground</div>
      <LogoutButton />
    </header>
  );
}
