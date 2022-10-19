import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { FlagleRouter } from "./components";
import "./utils/i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <FlagleRouter />
  </React.StrictMode>
);
