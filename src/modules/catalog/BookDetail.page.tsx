import React, { useState, useRef } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";
import { useBook } from "../../common/hooks/useBook";
import {
  useBookProgress,
  useSetBookStatus,
  useUpdateProgressById,
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

  const [open, setOpen] = useState(false);

  // Guards anti-bucle (viven mientras esté montada la página)
  const startedOnceRef = useRef(false);
  const finishedOnceRef = useRef(false);

  // hooks para cambiar estado (crea si no existe) y para actualizar por _id
  const { mutate: setStatus, isPending: savingStatus } = useSetBookStatus(id);
  const { mutate: updateById } = useUpdateProgressById();

  if (isLoading) return <LoadingGate message="Cargando detalles del libro…" />;
  if (!book)
    return (
      <div className="flex justify-center items-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <span>Error! No se pudo cargar el libro.</span>
        </div>
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

  // guardar progreso
  const resumePage = 1;
  const resumeSeconds = 0;
  // const { mutate: persistProgress } = useMutation({
  //   mutationFn: (payload: {
  //     bookId: string;
  //     kind: "time"; // "page" para PDF
  //     currentTimeSec: number;
  //     durationSec?: number;
  //     format?: string; // "audiobook" | "videobook"
  //   }) => saveProgress(payload),
  // });

  const mediaUrl = book?.contentBook?.url_secura || "";
  console.log(` link del video ${mediaUrl}`);

  const isMedia =
    book.format?.toLowerCase?.() === "audiobook" ||
    book.format?.toLowerCase?.() === "videobook";

  // al abrir lector/reproductor, si no hay progreso o está "pending", pasamos a "reading"
  const openReader = () => {
    if (!startedOnceRef.current) {
      startedOnceRef.current = true;

      if (!progress || !progress.status || progress.status === "pending") {
        setStatus("reading");
      }
    }
    setOpen(true);
  };

  // marcar finalizado: si ya existe doc -> PUT por _id; si no, crea con finished
  const markFinished = () => {
    if (finishedOnceRef.current) return; // evitar múltiples envíos
    finishedOnceRef.current = true;

    if (progress?._id) updateById({ id: progress._id, status: "finished" });
    else setStatus("finished"); // crea un registro con finished si no existía
  };

  // helper para mostrar duración humana si la tenés en book.duration (seg)
  const fmtTime = (sec?: number) => {
    if (!sec && sec !== 0) return "";
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((sec / 60) % 60)
      .toString()
      .padStart(2, "0");
    const h = Math.floor(sec / 3600);
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <Navbar />
      <main className="relative flex-1 max-w-5xl mx-auto px-4 py-23 ">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative w-full max-w-xs md:w-1/3">
            {/* Back button */}
            <Link href="/catalogo">
              <button className="absolute top-2 left-2 z-10 bg-primary/85 hover:bg-primary/95 text-white p-2 rounded-full transition-colors shadow-lg cursor-pointer">
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
                  onClick={openReader}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow cursor-pointer"
                  disabled={!pdfUrl}
                >
                  {progress?.status === "reading" ? "Reanudar" : "Leer"}
                </button>
              )}

              {book.format === "audiobook" && (
                <button
                  onClick={openReader}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow cursor-pointer"
                  disabled={!mediaUrl || savingStatus}
                  title={
                    book.duration
                      ? `Duración: ${fmtTime(book.duration)}`
                      : undefined
                  }
                >
                  {progress?.status === "reading" ? "Reanudar" : "Escuchar"}
                </button>
              )}

              {book.format === "videobook" && (
                <button
                  onClick={openReader}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow cursor-pointer"
                  disabled={!mediaUrl || savingStatus}
                  title={
                    book.duration
                      ? `Duración: ${fmtTime(book.duration)}`
                      : undefined
                  }
                >
                  {progress?.status === "reading" ? "Reanudar" : "Ver video"}
                </button>
              )}

              {/* Selector de estado */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Estado:</label>
                <select
                  className="border rounded-md px-2 py-1 text-sm"
                  value={progress?.status ?? "pending"}
                  onChange={(e) => setStatus(e.target.value as any)}
                  disabled={savingStatus}
                >
                  <option value="pending">Pendiente</option>
                  <option value="reading">Leyendo</option>
                  <option value="finished">Terminado</option>
                  <option value="abandoned">Abandonado</option>
                </select>
              </div>
            </div>

            {/* Modal: solo se monta si hay pdfUrl */}
            {pdfUrl && book.format === "ebook" && (
              <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={book.title}
              >
                {/* se abre el pdf  */}
                <PDFModalViewer
                  pdfUrl={pdfUrl}
                  initialPage={resumePage}
                  onPageChange={(page) => {
                    // si llega a la última página, marcamos “finished”
                    if (
                      typeof (book as any).totalPages === "number" &&
                      page >= (book as any).totalPages
                    ) {
                      markFinished();
                    }
                  }}
                />
              </Modal>
            )}
            {isMedia && mediaUrl && (
              <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={book.title}
              >
                <VideoPlayer
                  src={mediaUrl}
                  poster={book.bookCoverImage?.url_secura}
                  title={book.title}
                  initialTime={resumeSeconds}
                  onEnded={() => {
                    // Al terminar el video/audio, marcamos terminado
                    markFinished();
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
