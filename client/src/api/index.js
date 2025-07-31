// src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://codegen-osxc.onrender.com", // change base URL if different
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
