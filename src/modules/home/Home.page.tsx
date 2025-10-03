import { useAuth } from "../../context/AuthContext";
import { useLocation } from "wouter";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";
import HomeHero from "./components/HomeHero";
import SectionHeader from "./components/SectionHeader";
import Carousel from "../../common/components/Carousel";
import BookCard from "./components/BookCard";
import { useRecommendations } from "./hooks/useRecommendations";
import { useContinueReading } from "./hooks/useContinueReading";
import { authorNames, coverUrlOf } from "../../types/books";
import type { Book, BookWithProgress } from "../../types/books";
import { useTour } from "@reactour/tour";
import {useEffect, useState} from "react";

export default function HomePage() {
  const { user, token } = useAuth();
  const [, navigate] = useLocation();
   const { setIsOpen } = useTour();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Mostrar modal solo la primera vez
  useEffect(() => {
    const seenTour = localStorage.getItem("seenTour");
    if (!seenTour) {
      setShowWelcomeModal(true);
    }
  }, []);

  const startTour = () => {
    setIsOpen(true);
    localStorage.setItem("seenTour", "true");
    setShowWelcomeModal(false);
  };

  const skipTour = () => {
    localStorage.setItem("seenTour", "true");
    setShowWelcomeModal(false);
  };
  const {
    data: recs,
    isLoading: recsLoading,
    isError: recsError,
  } = useRecommendations(token);

  const {
    data: cont,
    isLoading: contLoading,
    isError: contError,
  } = useContinueReading(token);

  const openBookDetail = (id: string) => navigate(`/libro/${id}`);

  // validacion para cuando recomendaciones o libros por progreso vengan vacios
  // Helpers de visibilidad
  const showRecs =
    !recsLoading && !recsError && Array.isArray(recs) && recs.length > 0;

  const showContinue =
    !contLoading && !contError && Array.isArray(cont) && cont.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-fund overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 overflow-x-hidden">
          {showWelcomeModal && (
        <div className="fixed inset-0 rounded-4xl border-primary flex items-center justify-center z-50">
          <div className="bg-white flex justify-center flex-col items-center rounded-lg p-8 max-w-md text-center shadow-lg">
            <h2 className="text-xl font-bold text-primary mb-4">¡Bienvenido!</h2>
            <p className="mb-6">
              ¿Querés hacer un recorrido por la plataforma?
            </p>
            <img className="bounce-hover  h-50" src="./hostImage/LOGO-COLOR.svg" alt="" />
            <div className="flex justify-center gap-4">
              <button
                onClick={startTour}
                className="bg-primary font-bold hover:bg-orange cursor-pointer hover:text-white text-white px-4 py-2 rounded-2xl"
              >
                Sí, mostrar tour
              </button>
              <button
                onClick={skipTour}
                className="bg-secondary cursor-pointer text-gray-600 px-4 py-2 rounded-2xl"
              >
                No, gracias
              </button>
            </div>
          </div>
        </div>
      )}
        <div className="space-y-12">
          <HomeHero
            userName={user?.name ?? "Lector/a"}
            illustrationUrl="/hostImage/avatarLanding.png"
          />

          {/* Recomendaciones (sólo si hay) */}
          {(recsLoading || showRecs) && (
            <section id="Recomendaciones" className="bg-card rounded-2xl p-4 sm:p-8 shadow-sm">
              <SectionHeader
                title="Recomendado para ti"
                subtitle="Selección basada en tus preferencias"
              />
              {recsLoading && <SkeletonRow />}
              {showRecs && (
                <Carousel ariaLabel="Libros recomendados">
                  {recs!.map((b: Book) => (
                    <BookCard
                      key={b._id}
                      id={b._id}
                      title={b.title}
                      authorNames={authorNames(b.author)}
                      coverUrl={coverUrlOf(b)}
                      onOpen={() => openBookDetail(b._id)}
                      format={b.format}
                    />
                  ))}
                </Carousel>
              )}
              {/* Si no hay datos y terminó de cargar, la sección no se renderiza */}
            </section>
          )}

          {/* Seguir leyendo (sólo si hay) */}
          {(contLoading || showContinue) && (
            <section id="SeguirLeyendo" className="bg-card rounded-2xl p-4 sm:p-8 shadow-sm">
              <SectionHeader
                title="Seguir leyendo"
                subtitle="Retoma donde lo dejaste"
              />
              {contLoading && <SkeletonRow />}
              {showContinue && (
                <Carousel ariaLabel="Libros que estás leyendo">
                  {cont!.map((it: BookWithProgress) => (
                    <BookCard
                      key={it._id}
                      id={it._id}
                      title={it.title}
                      authorNames={authorNames(it.author)}
                      coverUrl={coverUrlOf(it)}
                      progress={it.progressPct}
                      format={it.format}
                      onOpen={() => openBookDetail(it._id)}
                    />
                  ))}
                </Carousel>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex gap-6 px-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-[220px] shrink-0">
          <div className="aspect-[2/3] rounded-xl bg-muted animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// function ErrorRow({ msg }: { msg: string }) {
//   return (
//     <div className="flex items-center justify-center py-12">
//       <p className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
//         {msg}
//       </p>
//     </div>
//   );
// }
