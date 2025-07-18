// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Web3ModalProvider } from "./providers/Web3ModalProvider.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <Web3ModalProvider>
      <App />
    </Web3ModalProvider>
  // </StrictMode>
);
