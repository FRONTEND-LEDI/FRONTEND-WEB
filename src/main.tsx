import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TourProvider } from '@reactour/tour'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min: usa cache sin refetch
      refetchOnWindowFocus: false, // no refresca al volver a la pestaña
      retry: 1, // reintento suave
    },
  },
});

const steps = [
  {
    selector: '[data-tour="step-1"]',
    content: "text 1"
  },
  {
    selector: '[data-tour="step-2"]',
    content: "text 2"
  },
  {
    selector: '[data-tour="step-3"]',
    content: "text 3"
  }
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TourProvider steps={[]} padding={10} >
  <App />
</TourProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);