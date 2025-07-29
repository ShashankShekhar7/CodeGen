import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

export default function RequireAuth({ children }) {
  const token = useStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return children;
}
