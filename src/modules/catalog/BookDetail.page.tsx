import React, { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";
import { useBook } from "../../common/hooks/useBook";
import { useBookProgress } from "../../common/hooks/useProgress";
import Modal from "../../common/components/books/Modal";
import PDFModalViewer from "../../common/components/books/PDFModalViewer";

const BookDetailPage: React.FC = () => {
  const [, params] = useRoute("/libro/:id");
  const { id } = params || {};

  const { data: book, isLoading } = useBook(id);
  const { data: progress } = useBookProgress(id);
  const [open, setOpen] = useState(false);

  if (isLoading)
    return <span className="loading loading-spinner loading-xl"></span>;
  if (!book)
    return (
      <div role="alert" className="alert alert-error alert-dash">
        <span>Hubo un error. No se pudo cargar el libro.</span>
      </div>
    );

  const pdfUrl = book?.contentBook?.url_secura;
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
  const authorObjs = Array.isArray(book.author)
    ? (book.author as { _id: string; name: string }[])
    : [];

  const maxThemes = 3;
  const shownThemes = (book.theme ?? []).slice(0, maxThemes);
  const extraThemes = Math.max((book.theme?.length ?? 0) - maxThemes, 0);

  //const resumePage =
  progress?.currentPage && progress.currentPage > 1 ? progress.currentPage : 1;

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <Navbar />
      <main className="relative flex-1 max-w-5xl mx-auto px-4 py-23 ">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative w-full max-w-xs md:w-1/3">
            {/* Back button */}
            <Link href="/catalogo">
              <button className="absolute top-2 left-2 z-10 bg-primary/85 hover:bg-primary/95 text-white p-2 rounded-full transition-colors shadow-lg">
                <ArrowLeft size={20} />
              </button>
            </Link>

            {/* Portada */}
            <img
              src={cover || "/placeholder.svg"}
              alt={book?.title}
              className="w-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Contenido */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>

            {/* Autor(es) */}
            <p className="text-lg text-gray-700 mb-2">
              {authorObjs.length
                ? authorObjs.map((a, idx) => (
                    <span key={a._id}>
                      <Link
                        href={`/autor/${a._id}`}
                        className="text-amber-600 hover:underline"
                      >
                        {a.name}
                      </Link>
                      {idx < authorObjs.length - 1 ? ", " : ""}
                    </span>
                  ))
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

            {/* Temas */}
            {(book.theme?.length ?? 0) > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {shownThemes.map((g, i) => (
                  <span
                    key={`${g}-${i}`}
                    className="bg-secondary text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {g}
                  </span>
                ))}
                {extraThemes > 0 && (
                  <span className="text-sm text-gray-600">
                    +{extraThemes} más
                  </span>
                )}
              </div>
            )}

            {/* Sinopsis */}
            <p className="text-gray-600 mb-6">{description}</p>

            {/* Acciones por formato */}
            <div className="flex flex-wrap gap-4">
              {/* Botón para abrir el modal */}
              {book.format === "ebook" && (
                <button
                  onClick={() => setOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
                  disabled={!pdfUrl}
                >
                  {progress?.currentPage && progress.currentPage > 1
                    ? `Reanudar`
                    : "Leer"}
                </button>
              )}

              {book.format === "audiolibro" && (
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

            {/* Modal: solo se monta si hay pdfUrl */}
            {pdfUrl && (
              <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={book.title}
              >
                {/* Lectura vertical */}
                <PDFModalViewer
                  pdfUrl={pdfUrl}
                  onPageChange={(_page) => {
                    // Tguardamos el progreso
                  }}
                />
              </Modal>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetailPage;
