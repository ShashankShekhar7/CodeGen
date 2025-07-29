// src/auth/useAuth.js
import { useStore } from "../store/useStore";

export function useAuth() {
  const { token, user, setToken, setUser, logout } = useStore();
  return { token, user, setToken, setUser, logout };
}
