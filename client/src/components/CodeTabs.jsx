import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useStore } from "../store/useStore";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export default function CodeTabs() {
  const jsx = useStore((state) => state.jsx);
  const css = useStore((state) => state.css);
  const [activeTab, setActiveTab] = useState("jsx");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    zip.file("Component.jsx", jsx);
    zip.file("styles.css", css);
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "component.zip");
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: 6,
        boxSizing: "border-box",
        padding: 0,
        minHeight: 0,
      }}
    >
      <div style={{ display: "flex", borderBottom: "1px solid #eee", background: "#f9fafb" }}>
        <button
          onClick={() => setActiveTab("jsx")}
          style={{
            border: "none",
            borderBottom: activeTab === "jsx" ? "3px solid #007bff" : "none",
            background: "none",
            color: activeTab === "jsx" ? "#007bff" : "#333",
            fontWeight: "bold",
            padding: "12px 18px",
            cursor: "pointer",
          }}
        >
          JSX
        </button>
        <button
          onClick={() => setActiveTab("css")}
          style={{
            border: "none",
            borderBottom: activeTab === "css" ? "3px solid #007bff" : "none",
            background: "none",
            color: activeTab === "css" ? "#007bff" : "#333",
            fontWeight: "bold",
            padding: "12px 18px",
            cursor: "pointer",
          }}
        >
          CSS
        </button>
        <button
          onClick={downloadZip}
          style={{
            padding: "8px 15px",
            marginLeft: "auto",
            background: "#3d88f3",
            border: "none",
            color: "white",
            borderRadius: 5,
            marginRight: 10,
            fontWeight: 500,
            cursor: "pointer",
          }}
          title="Download your component as ZIP"
        >
          Download ZIP
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, minHeight: 0 }}>
        <SyntaxHighlighter
          language={activeTab === "jsx" ? "jsx" : "css"}
          style={coy}
          customStyle={{ background: "#f5f5f7", borderRadius: 5, fontSize: 15, padding: 16, minHeight: 0 }}
        >
          {activeTab === "jsx" ? jsx : css}
        </SyntaxHighlighter>
        <button
          onClick={() => copyToClipboard(activeTab === "jsx" ? jsx : css)}
          style={{
            marginTop: 10,
            padding: "8px 18px",
            borderRadius: 5,
            background: "#f2f2f6",
            border: "1px solid #ddd",
            color: "#333",
            cursor: "pointer",
          }}
        >
          Copy {activeTab.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
