// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import * as Sentry from "@sentry/react";
const SENTRY_RELEASE = import.meta.env.SENTRY_RELEASE || "dev";
Sentry.init({
  dsn: "https://acc39a75de892b4c2b3184af88521558@o4509611045879808.ingest.us.sentry.io/4509611047321600",
  release: SENTRY_RELEASE,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
