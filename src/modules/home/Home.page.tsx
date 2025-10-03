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

export default function HomePage() {
  const { user, token } = useAuth();
  const [, navigate] = useLocation();

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

  return (
    <div className="flex flex-col min-h-screen bg-fund overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 overflow-x-hidden">
        <div className="space-y-12">
          <HomeHero
            userName={user?.name ?? "Lector/a"}
            illustrationUrl="/hostImage/avatarLanding.png"
          />

          {/* Recomendaciones */}
          <section className="bg-card rounded-2xl p-4 sm:p-8 shadow-sm">
            <SectionHeader
              title="Recomendado para ti"
              subtitle="Selección basada en tus preferencias"
            />
            {recsLoading && <SkeletonRow />}
            {recsError && <ErrorRow msg="No pudimos cargar recomendaciones" />}
            {!recsLoading && !recsError && recs && recs.length > 0 && (
              <Carousel ariaLabel="Libros recomendados">
                {recs.map((b: Book) => (
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
          </section>

          {/* Seguir leyendo */}
          <section className="bg-card rounded-2xl p-4 sm:p-8 shadow-sm">
            <SectionHeader
              title="Seguir leyendo"
              subtitle="Retoma donde lo dejaste"
            />
            {contLoading && <SkeletonRow />}
            {contError && <ErrorRow msg="No pudimos cargar tu progreso" />}
            {!contLoading &&
              !contError &&
              Array.isArray(cont) &&
              cont.length > 0 && (
                <Carousel ariaLabel="Libros que estás leyendo">
                  {cont.map((it: BookWithProgress) => (
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

function ErrorRow({ msg }: { msg: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
        {msg}
      </p>
    </div>
  );
}
