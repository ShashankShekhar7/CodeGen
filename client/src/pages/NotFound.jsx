// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#666",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <Link to="/login" style={{ marginTop: 16, color: "#09c", textDecoration: "underline" }}>
        Go to Login
      </Link>
    </div>
  );
}
