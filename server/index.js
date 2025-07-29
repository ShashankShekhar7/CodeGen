// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import geminiRoutes from "./routes/gemini.routes.js";
import sessionRoutes from "./routes/session.routes.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// --- CORS CONFIG: Allow Vercel frontend only ---
app.use(cors({
  origin: "https://your-frontend.vercel.app", // <-- use your real frontend URL here
  credentials: true // if you use cookies/sessions; otherwise can omit
}));

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("🎉 Backend is working, Shashank!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/gemini", geminiRoutes);
app.use("/api/session", sessionRoutes);

// Database connection and server start
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected to:", mongoose.connection.name);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
