import React, { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import { buildSrcDoc } from "../utils/sandbox";

export default function PreviewIframe(props) {
  const jsx = useStore((state) => state.jsx);
  const css = useStore((state) => state.css);
  const iframeRef = useRef();
console.log('Injected JSX:', jsx);
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildSrcDoc(jsx, css);
    }
  }, [jsx, css]);


  return (
    <div
      style={{
        ...props.style,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: 6,
        boxSizing: "border-box",
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      <iframe
        ref={iframeRef}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: 6,
          backgroundColor: "#fff",
          flex: 1,
        }}
        title="Component Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
}
