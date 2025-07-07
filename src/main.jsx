import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </BrowserRouter>
);
