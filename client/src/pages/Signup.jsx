import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AuthNav from "../components/AuthNav";

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);
    setLoading(true);
    try {
      await api.post("/auth/register", { fullname, email, password });
      setMessage("Registration successful! Redirecting to login...");
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: 12,
    marginBottom: 16,
    border: "1px solid #bbb",
    borderRadius: 6,
    fontSize: 16,
    color: "#333",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
  };

  const handleFocus = (e) => (e.target.style.borderColor = "#007bff");
  const handleBlur = (e) => (e.target.style.borderColor = "#bbb");

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "80px auto",
        padding: 32,
        border: "1px solid #ddd",
        borderRadius: 8,
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 24,
          fontWeight: 600,
          color: "#222",
          fontSize: "1.8rem",
        }}
      >
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          disabled={loading}
          autoComplete="name"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          disabled={loading}
          autoComplete="new-password"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 14,
            backgroundColor: loading ? "#8ab8ff" : "#007bff",
            border: "none",
            borderRadius: 6,
            color: "#fff",
            fontSize: 17,
            fontWeight: 600,
            cursor: loading ? "default" : "pointer",
            transition: "background-color 0.25s ease",
          }}
          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#007bff")}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: 10,
            color: isSuccess ? "#2c993e" : "#e55353",
            fontSize: 14,
            textAlign: "center",
            userSelect: "none",
          }}
        >
          {message}
        </p>
      )}

      <div
        style={{
          marginTop: 18,
          textAlign: "center",
          fontSize: 14,
          color: "#555",
          userSelect: "none",
        }}
      >
        <AuthNav />
      </div>
    </div>
  );
}
