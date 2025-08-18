import React from "react";
import { useRoute, Link } from "wouter";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";
import { useBook } from "../../common/hooks/useBook";
import { useBookProgress } from "../../common/hooks/useProgress";

const BookDetailPage: React.FC = () => {
  const [, params] = useRoute("/libro/:id");
  const { id } = params || {};

  const { data: book, isLoading } = useBook(id);
  const { data: progress } = useBookProgress(id);

  if (isLoading) return <p className="text-center mt-8">Cargando...</p>;
  if (!book) return <p className="text-center mt-8">Libro no encontrado</p>;

  const cover =
    book.bookCoverImage?.url_secura || "https://via.placeholder.com/400x600";

  const anthologyYear = book.yearBook
    ? new Date(book.yearBook).getFullYear()
    : null;

  const pagesLabel =
    typeof book.totalPages === "number"
      ? `${book.totalPages} páginas`
      : "Páginas no disponibles";

  const description = book.synopsis || book.summary || "—";

  // Si hay progreso y es >1, armo link con ?page=
  const resumePage =
    progress?.currentPage && progress.currentPage > 1
      ? progress.currentPage
      : 1;

  const readerHref =
    progress?.currentPage && progress.currentPage > 1
      ? `/lectura/${book._id}?page=${resumePage}`
      : `/lectura/${book._id}`;

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-23">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Portada */}
          <img
            src={cover}
            alt={book.title}
            className="w-full max-w-xs md:w-1/3 object-cover rounded-lg shadow-md"
          />

          {/* Contenido */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>

            <p className="text-lg text-gray-700 mb-2">
              {book.author?.length
                ? book.author.join(", ")
                : "Autor desconocido"}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mb-4">
              <span className="bg-white/60 px-3 py-1 rounded-full border">
                <strong>Género:</strong> {book.genre || "—"}
              </span>
              <span className="bg-white/60 px-3 py-1 rounded-full border">
                <strong>Antología:</strong>{" "}
                {anthologyYear ? `Antología ${anthologyYear}` : "—"}
              </span>
              <span className="bg-white/60 px-3 py-1 rounded-full border">
                <strong>Nivel:</strong> {book.level || "—"}
              </span>
              <span className="bg-white/60 px-3 py-1 rounded-full border">
                {pagesLabel}
              </span>
            </div>

            {/* Subgéneros */}
            {book.subgenre?.length ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {book.subgenre.map((g, i) => (
                  <span
                    key={`${g}-${i}`}
                    className="bg-secondary text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Sinopsis */}
            <p className="text-gray-600 mb-6">{description}</p>

            {/* Acciones por formato */}
            <div className="flex flex-wrap gap-4">
              {book.format === "ebook" && (
                <Link href={readerHref}>
                  <a className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow">
                    {progress?.currentPage && progress.currentPage > 1
                      ? `Reanudar en pág. ${resumePage}`
                      : "Leer"}
                  </a>
                </Link>
              )}

              {book.format === "audio" && (
                <button
                  disabled
                  className="bg-yellow-100 text-yellow-700 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                  title="Audiolibro próximamente"
                >
                  Escuchar
                </button>
              )}

              {book.format === "video" && (
                <button
                  disabled
                  className="bg-yellow-100 text-yellow-700 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                  title="Video próximamente"
                >
                  Ver video
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetailPage;
