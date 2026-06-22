import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/react-query";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        closeButton={false}
        closeOnClick
        draggable
        theme="colored"
        icon={false}
      />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
