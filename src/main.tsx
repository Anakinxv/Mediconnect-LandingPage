import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@/i18n/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-black h-screen w-screen  text-white">
      <App />
    </div>
  </StrictMode>
);
