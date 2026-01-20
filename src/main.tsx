import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx"; // DOUBLE CHECK THIS PATH
import "./styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Critical Error: Root element not found. Your index.html might be missing <div id='root'></div>");
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
