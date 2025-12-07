import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./pages/landingpage/LandingPage";
import "@/i18n/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-black h-dvh w-full text-white">
      <LandingPage />
    </div>
  </StrictMode>
);
