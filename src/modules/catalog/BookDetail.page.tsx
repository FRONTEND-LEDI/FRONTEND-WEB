import React, { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";
import { useBook } from "../../common/hooks/useBook";
import {
  useBookProgress,
  useEnsureProgressOnOpen,
  useUpdatePosition,
} from "../../common/hooks/useProgress";

import Modal from "../../common/components/books/Modal";
import PDFModalViewer from "../../common/components/books/PDFModalViewer";
import VideoPlayer from "../../common/components/media/VideoPlayer";
import LoadingGate from "../../common/components/LoadingGate";

const BookDetailPage: React.FC = () => {
  const [, params] = useRoute("/libro/:id");
  const { id } = params || {};

  const { data: book, isLoading } = useBook(id);
  const { data: progress } = useBookProgress(id);
  const { ensure, initialPosition, unit, total } = useEnsureProgressOnOpen(
    book || null
  );
  const { sendThrottled, finishOnce } = useUpdatePosition(
    progress?._id,
    unit,
    total
  );

  const [open, setOpen] = useState(false);

  // mantener actualizado el progreso al cerrar el modal
  const qc = useQueryClient();

  const lastPageRef = useRef(1);
  const lastSecondRef = useRef(0);

  const openedAtRef = useRef<number>(0);

  // estados solo para la sesión actual del modal
  const [startPage, setStartPage] = useState<number | null>(null);
  const [startSecond, setStartSecond] = useState<number | null>(null);

  const format = book?.format?.toLowerCase();
  const isEbook = format === "ebook";
  const isMedia = format === "audiobook" || format === "videobook";

  const pdfUrl = book?.contentBook?.url_secura;
  const mediaUrl = pdfUrl;

  if (isLoading) return <LoadingGate message="Cargando detalles del libro…" />;
  if (!book)
    return (
      <div className="flex justify-center items-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <span>Error! No se pudo cargar el libro.</span>
        </div>
      </div>
    );

  const cover =
    book.bookCoverImage?.url_secura || "https://via.placeholder.com/400x600";
  const anthologyYear = book.yearBook
    ? new Date(book.yearBook).getFullYear()
    : null;

  const pagesLabel =
    typeof book.totalPages === "number"
      ? `${book.totalPages} páginas`
      : `${book.duration} segundos`;

  const description = book.synopsis || book.summary || "—";
  const authorObjs = Array.isArray(book.author)
    ? (book.author as { _id: string; name: string }[])
    : [];

  const maxThemes = 3;
  const shownThemes = (book.theme ?? []).slice(0, maxThemes);
  const extraThemes = Math.max((book.theme?.length ?? 0) - maxThemes, 0);

  // Calculá reanudaciones, pero solo para capturarlas al ABRIR
  const resumePageCalc = isEbook
    ? Math.max(
        1,
        Number(
          progress?.unit === "page" ? progress?.position : initialPosition || 1
        )
      )
    : 1;

  const resumeSecondsCalc = isMedia
    ? (progress?.unit === "second" && Number(progress?.position)) || 0
    : 0;

  const openReader = async () => {
    await ensure(); // crea si no existía
    openedAtRef.current = Date.now();
    if (isEbook) setStartPage(resumePageCalc);
    if (isMedia) setStartSecond(resumeSecondsCalc);
    setOpen(true);
  };

  // cerrar modal
  const closeReader = async () => {
    if (isEbook) {
      const t = Number(book?.totalPages ?? total ?? 0);
      // flush inmediato sin throttle
      sendThrottled(lastPageRef.current, t, Date.now(), 0);
      qc.setQueryData(["progress", id], (prev: any) => {
        if (!prev) return prev;
        const position = lastPageRef.current;
        const percent = t > 0 ? Math.round((position / t) * 10000) / 100 : 0;
        return { ...prev, position, percent, total: t, unit: "page" };
      });

      const dwellMs = Date.now() - openedAtRef.current;
      // sólo si realmente estuvo un ratito y llegó a la última página
      if (t > 0 && lastPageRef.current >= t && dwellMs > 1500) {
        finishOnce();
      }
    } else if (isMedia) {
      const t = Number(total ?? 0);
      // flush inmediato de ultimo segundo visto y obligar a refrescar
      sendThrottled(lastSecondRef.current, t, Date.now(), 0);
      qc.setQueryData(["progress", id], (prev: any) => {
        if (!prev) return prev;
        const position = lastSecondRef.current;
        const percent = t > 0 ? Math.round((position / t) * 10000) / 100 : 0;
        return { ...prev, position, percent, total: t, unit: "second" };
      });
    }
    // en media ya marca en onEnded acá no es necesario
    setOpen(false);

    // invalidar y refetchar el progreso del libro
    await qc.invalidateQueries({ queryKey: ["progress", id] });
    qc.invalidateQueries({ queryKey: ["continueReading"] });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <Navbar />
      <main className="relative flex-1 max-w-5xl mx-auto px-4 py-30">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative w-full max-w-xs md:w-1/3">
            {/* Back button */}
            {/*<Link href="/catalogo">*/}
            <button
              onClick={goBack}
              className="absolute top-2 left-2 z-10 bg-primary/85 hover:bg-primary/95 text-white p-2 rounded-full transition-colors shadow-lg cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            {/* </Link> */}

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
              {isEbook && (
                <button
                  onClick={openReader}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow cursor-pointer"
                  disabled={!pdfUrl}
                >
                  {progress ? "Seguir Leyendo" : "Leer"}
                </button>
              )}

              {isMedia && (
                <button
                  onClick={openReader}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow cursor-pointer"
                  disabled={!isMedia}
                >
                  {progress
                    ? "Reanudar"
                    : book.format === "audiobook"
                    ? "Escuchar"
                    : "Ver video"}
                </button>
              )}
            </div>

            {/* Modal lector PDF */}
            {isEbook && pdfUrl && (
              <Modal isOpen={open} onClose={closeReader} title={book.title}>
                {/* se abre el pdf  */}
                <PDFModalViewer
                  pdfUrl={pdfUrl}
                  initialPage={startPage ?? 1}
                  onPageChange={(page) => {
                    lastPageRef.current = page; // <-- guarda última página alcanzada
                    const t = Number(book?.totalPages ?? total ?? 0);
                    sendThrottled(page, t); // <-- solo posición/percent
                  }}
                />
              </Modal>
            )}
            {isMedia && mediaUrl && (
              <Modal isOpen={open} onClose={closeReader} title={book.title}>
                <VideoPlayer
                  src={mediaUrl}
                  poster={book.bookCoverImage?.url_secura}
                  title={book.title}
                  initialTime={startSecond ?? 0}
                  onProgress={(cur, dur) => {
                    lastSecondRef.current = Math.floor(cur);
                    sendThrottled(Math.floor(cur), Math.floor(dur || 0));
                  }}
                  onEnded={() => {
                    // terminamos
                    finishOnce();
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
