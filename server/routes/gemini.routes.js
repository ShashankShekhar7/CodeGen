import express from "express";
import  verifyToken  from "../middlewares/auth.middleware.js";
import { generateGeminiCode } from "../controllers/gemini.controller.js";

const router = express.Router();

router.post("/generate", verifyToken, generateGeminiCode);

export default router;
