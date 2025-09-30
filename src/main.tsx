// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Web3ModalProvider } from "./providers/Web3ModalProvider.tsx";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <Web3ModalProvider>
      <App />
    </Web3ModalProvider>
  </QueryClientProvider>
  // </StrictMode>
);
