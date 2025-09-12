import { useEffect, useRef, useState } from "react";
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
} from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface PDFViewerProps {
  pdfUrl: string;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const loadPDF = async () => {
      const loadingTask = getDocument(pdfUrl);
      const loadedPdf = await loadingTask.promise;
      setPdf(loadedPdf);
      setNumPages(loadedPdf.numPages);
    };

    loadPDF().catch(console.error);
  }, [pdfUrl]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdf) return;

      const page = await pdf.getPage(pageNumber);

      const containerWidth = Math.min(window.innerWidth * 0.9, 900);
      const rotation = page.rotate || 0;
      const viewport = page.getViewport({ scale: 1, rotation });
      const scale = containerWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale, rotation });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      canvas.width = Math.ceil(scaledViewport.width);
      canvas.height = Math.ceil(scaledViewport.height);

      await page.render({
        canvasContext: context!,
        viewport: scaledViewport,
      }).promise;
    };

    renderPage().catch(console.error);
  }, [pdf, pageNumber]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#f8f8f8] px-4 py-6">
      {/* Encabezado  */}
      <div className="mb-4 text-center text-sm text-gray-500 uppercase tracking-wider">
        Página {pageNumber} de {numPages}
      </div>

      {/* Botón ← */}
      <button
        onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
        disabled={pageNumber === 1}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-gray-500 rounded-full p-2 shadow hover:bg-gray-100 disabled:opacity-30"
      >
        ←
      </button>

      {/* Botón → */}
      <button
        onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
        disabled={pageNumber === numPages}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-500 rounded-full p-2 shadow hover:bg-gray-100 disabled:opacity-30"
      >
        →
      </button>

      {/* Botón volver */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-gray-300 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-400 text-sm"
      >
        ← Volver
      </button>

      {/* Canvas del PDF */}
      <div className="w-full max-w-[900px] bg-white p-4 shadow-md rounded overflow-auto">
        <canvas ref={canvasRef} className="max-w-full h-auto mx-auto" />
      </div>
    </div>
  );
};

export default PDFViewer;
