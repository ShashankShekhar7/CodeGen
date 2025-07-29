import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

export default function LogoutButton() {
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        backgroundColor: "#e55353",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        fontWeight: "600",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#c84545")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#e55353")}
    >
      Logout
    </button>
  );
}
