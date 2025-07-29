import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AuthNav from "../components/AuthNav";
import { useStore } from "../store/useStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setToken = useStore((state) => state.setToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      setToken(response.data.token);
      navigate("/playground");
    } catch (error) {
      setMessage(error.response?.data?.msg || "Login failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        Login
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 16,
            border: "1px solid #bbb",
            borderRadius: 6,
            fontSize: 16,
            color: "#333",
            boxSizing: "border-box",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#bbb")}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete="current-password"
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 16,
            border: "1px solid #bbb",
            borderRadius: 6,
            fontSize: 16,
            color: "#333",
            boxSizing: "border-box",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#bbb")}
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
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: 10,
            color: "#e55353",
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
