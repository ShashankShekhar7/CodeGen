// src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://codegen-osxc.onrender.com/api", // change base URL if different
// baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
