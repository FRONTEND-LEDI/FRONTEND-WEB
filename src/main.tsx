import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TourProvider } from "@reactour/tour";
import ButtonIA from './common/components/chat/Button';


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
  { selector: "#Inicio", content: "Aquí puedes volver al inicio." },
  { selector: "#Catalogo", content: "Explora todo el catálogo de libros." },
  { selector: "#ClubDeLectura", content: "Únete al Club de Lectura." },
  { selector: "#Bibliogames", content: "Juega en la sección BiblioGames." },
  { selector: "#Autores", content: "Descubre tus autores favoritos." },
  { selector: "#Recomendaciones", content: "Libros recomendados para ti." },
  {
    selector: "#SeguirLeyendo",
    content: "Aquí puedes continuar tus lecturas.",
  },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TourProvider steps={steps}>
          <ButtonIA/>
          <App />
        </TourProvider>
      </AuthProvider>
      {/* Solo aparece en modo desarrollo, cuando se despliege ya no aparece el devtools debajo */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>
);
