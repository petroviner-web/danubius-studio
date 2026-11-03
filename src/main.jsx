import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/manrope";
import "@fontsource/dm-mono/400.css";
import "./styles.css";
import { App } from "./App.jsx";
const root = document.getElementById("root");
const app = <App path={location.pathname} />;
createRoot(root).render(app);
