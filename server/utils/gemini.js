// utils/gemini.js
import dotenv from "dotenv";
dotenv.config();

// ✅ Validate OpenRouter API key
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is required in environment variables");
}

const API_BASE = "https://openrouter.ai/api/v1";

/**
 * Retry function with exponential backoff
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status >= 500 && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`🔄 OpenRouter API error. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

/**
 * Generates a React component with CSS using OpenRouter
 * @param {string} prompt The prompt to generate a code component
 * @returns {Promise<Object>} Object containing jsx and css code
 * @throws {Error} If the generation fails
 */
export async function generateComponent(prompt) {
  try {
    // ✅ Enhanced prompt with stricter format requirements
    const structuredPrompt = `
Generate a React component based on this request: "${prompt}"

CRITICAL: Return EXACTLY in this format with correct markers:

JSX_START
function ComponentName() {
  return (
    <div className="component-wrapper">
      {/* Your JSX content here */}
    </div>
  );
}
JSX_END

CSS_START
.component-wrapper {
  /* Your CSS styles here */
}
CSS_END

RULES:
- Use JSX_START and JSX_END markers for React component
- Use CSS_START and CSS_END markers for CSS styles  
- Functional React component only
- Use className (not class)
- No export statements
- No additional explanations or text outside markers
- Modern, responsive CSS
- Professional styling
`;

    // ✅ Use retry logic for API calls
    const result = await retryWithBackoff(async () => {
      const response = await fetch(`${API_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:8000",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-distill-llama-70b", // Free unlimited model
          messages: [{ role: "user", content: structuredPrompt }],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        const error = new Error(`OpenRouter API error: ${response.statusText}`);
        error.status = response.status;
        throw error;
      }

      return response;
    });

    const data = await result.json();
    
    if (!data.choices || !data.choices[0]) {
      throw new Error("Invalid response from OpenRouter API");
    }

    const text = data.choices[0].message.content;

    // ✅ Enhanced parsing logic to handle malformed responses
    let jsx = '';
    let css = '';

    console.log("Raw AI Response:", text); // Debug log

    // Primary parsing: Look for proper JSX_START/JSX_END and CSS_START/CSS_END
    const jsxMatch = text.match(/JSX_START\s*([\s\S]*?)\s*JSX_END/);
    const cssMatch = text.match(/CSS_START\s*([\s\S]*?)\s*CSS_END/);

    if (jsxMatch) {
      jsx = jsxMatch[1].trim();
    }

    if (cssMatch) {
      css = cssMatch[1].trim();
    }

    // ✅ Fallback parsing for malformed responses
    if (!jsx || !css) {
      console.log("Primary parsing failed, trying fallback methods...");
      
      // Fallback 1: Look for JSX_START to any END marker
      if (!jsx) {
        const jsxFallback = text.match(/JSX_START\s*([\s\S]*?)(?:JSX_END|CSS_END|CSS_START)/);
        if (jsxFallback) {
          jsx = jsxFallback[1].trim();
        }
      }

      // Fallback 2: Look for CSS content after JSX
      if (!css) {
        // Try to find CSS after JSX_END or CSS_END
        const cssFallback1 = text.match(/(?:JSX_END|CSS_END)\s*([\s\S]*?)(?:CSS_END|This component|$)/);
        if (cssFallback1) {
          let cssContent = cssFallback1[1].trim();
          // Clean up common patterns
          cssContent = cssContent.replace(/^CSS_START\s*/, '');
          cssContent = cssContent.replace(/\s*CSS_END\s*/, '');
          cssContent = cssContent.replace(/This component[\s\S]*$/, '');
          if (cssContent && cssContent.includes('{')) {
            css = cssContent.trim();
          }
        }
      }

      // Fallback 3: Split by common delimiters
      if (!jsx && !css) {
        const sections = text.split(/(?:JSX_START|JSX_END|CSS_START|CSS_END)/);
        sections.forEach(section => {
          const trimmed = section.trim();
          if (trimmed.includes('function') && trimmed.includes('return')) {
            jsx = trimmed;
          } else if (trimmed.includes('{') && trimmed.includes('}') && trimmed.includes('.')) {
            css = trimmed;
          }
        });
      }
    }

    // ✅ Final cleanup
    jsx = jsx.replace(/^export\s+default\s+\w+;\s*$/gm, '').trim();
    css = css.replace(/^<style>\s*/, '').replace(/\s*<\/style>$/, '').trim();

    // ✅ Validation
    if (!jsx) {
      jsx = text; // Ultimate fallback
    }

    return {
      jsx: jsx,
      css: css,
      raw: text // Keep raw response for debugging
    };

  } catch (error) {
    console.error("OpenRouter Error:", error);
    
    // ✅ Better error handling for different status codes
    if (error.status === 503 || error.status === 502) {
      throw new Error("OpenRouter service is temporarily unavailable. Please try again in a few minutes.");
    } else if (error.status === 429) {
      throw new Error("Rate limit exceeded. Please wait before making more requests.");
    } else if (error.status === 401) {
      throw new Error("Invalid OpenRouter API key. Please check your configuration.");
    } else {
      throw new Error(`Failed to generate content using OpenRouter: ${error.message}`);
    }
  }
}
