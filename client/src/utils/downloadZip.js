// src/utils/downloadZip.js
import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function downloadZip({ jsx, css, filename = "component.zip" }) {
  const zip = new JSZip();
  zip.file("Component.jsx", jsx);
  zip.file("styles.css", css);

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, filename);
}
