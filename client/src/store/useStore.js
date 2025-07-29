import { create } from "zustand";
import api from "../api";

export const useStore = create((set, get) => ({
  token: localStorage.getItem("token") || null,
  user: null,
  sessions: [],
  activeSession: null,
  chat: [],
  jsx: "",
  css: "",
  loading: false,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      user: null,
      sessions: [],
      activeSession: null,
      chat: [],
      jsx: "",
      css: "",
    });
  },

  fetchUserSessions: async () => {
    if (!get().token) return;
    try {
      const res = await api.get("/session/all");
      set({ sessions: res.data });
      if (res.data.length > 0) {
        get().selectSession(res.data[0]);
      }
    } catch (e) {
      set({ sessions: [] });
      console.error("Failed fetching sessions:", e);
    }
  },

  selectSession: (session) => {
    set({
      activeSession: session,
      chat: session.chatLog || [],
      jsx: session.jsxCode || "",
      css: session.cssCode || "",
    });
  },

  createSession: async () => {
    try {
      const res = await api.post("/session/new");
      set((state) => ({
        sessions: [res.data, ...state.sessions],
        activeSession: res.data,
        chat: [],
        jsx: "",
        css: "",
      }));
    } catch (e) {
      console.error("Create session failed:", e);
    }
  },

  sendPrompt: async (prompt) => {
    if (!prompt.trim()) return;
    set({ loading: true });
    set({ chat: [...get().chat, { role: "user", content: prompt }] });

    try {
      const res = await api.post("/v1/gemini/generate", { prompt });

      set((state) => ({
        chat: [...state.chat, { role: "ai", content: res.data.jsx }],
        jsx: res.data.jsx,
        css: res.data.css,
      }));

      // Save session updates to backend
      const sessionId = get().activeSession?._id;
      if (sessionId) {
        await api.put(`/session/${sessionId}`, {
          chatLog: get().chat,
          jsxCode: res.data.jsx,
          cssCode: res.data.css,
        });
      }
    } catch (e) {
      console.error("Prompt sending failed:", e);
    } finally {
      set({ loading: false });
    }
  },
}));
