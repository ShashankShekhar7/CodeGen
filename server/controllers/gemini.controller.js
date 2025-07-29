import { generateComponent } from "../utils/gemini.js"; // Assuming your Gemini logic file is here

// controllers/gemini.controller.js - CORRECTED
export const generateGeminiCode = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt?.trim()) {
      return res.status(400).json({ msg: "Prompt is required" });
    }

    const generatedCode = await generateComponent(prompt);

    // ✅ Fix: Destructure the object to flatten the response
    res.status(200).json({
      msg: "Component generated successfully",
      jsx: generatedCode.jsx,  // Direct property
      css: generatedCode.css,  // Direct property
    });
  } catch (err) {
    console.error("AI Controller Error:", err.message);
    res.status(500).json({ msg: "Failed to generate component" });
  }
};

