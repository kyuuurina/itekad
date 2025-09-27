import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import JourneyApp from "./JourneyApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JourneyApp />
  </StrictMode>
);
