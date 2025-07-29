export function buildSrcDoc(jsx = "", css = "") {
  let safeJsx = jsx;

  // Remove any export default statements to prevent syntax errors
  safeJsx = safeJsx.replace(/export\s+default\s+\w+;/g, "");

  // Rename any function or arrow function to ComponentName for rendering
  if (/function\s+\w+\s*\(/.test(safeJsx)) {
    safeJsx = safeJsx.replace(/function\s+\w+\s*\(/, "function ComponentName(");
  } else if (/const\s+\w+\s*=\s*\([\w\s,{}]*\)\s*=>\s*{/.test(safeJsx)) {
    safeJsx = safeJsx.replace(
      /const\s+\w+\s*=\s*\(([\w\s,{}]*)\)\s*=>\s*{([\s\S]*)}/,
      "function ComponentName($1) {$2}"
    );
  }

  safeJsx = safeJsx.trim();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <style>${css}</style>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/babel">
        // Display any errors in the preview pane
        window.onerror = function(...e) {
          document.body.innerHTML += '<pre style="white-space:pre-wrap;color:red;background:#fff3f3;padding:1em;border-radius:6px;">' + e.join(' ') + '</pre>';
        };

        ${safeJsx}

        const rootElem = document.getElementById('root');
        if (window.ReactDOM.createRoot) {
          window.ReactDOM.createRoot(rootElem).render(window.React.createElement(ComponentName));
        } else {
          window.ReactDOM.render(window.React.createElement(ComponentName), rootElem);
        }
      </script>
    </body>
    </html>
  `;
}
