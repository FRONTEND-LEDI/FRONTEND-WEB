import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";

// Configurar worker
GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const loadPDF = async () => {
      const loadingTask = getDocument(pdfUrl);
      const loaderPdf = await loadingTask.promise;
      setPdf(loaderPdf);
      setNumPages(loaderPdf.numPages);
    };

    loadPDF().catch(console.error);
  }, [pdfUrl]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdf) return;

      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context!,
        viewport,
      }).promise;
    };

    renderPage().catch(console.error);
  }, [pdf, pageNumber]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 px-2">
      <button
        onClick={() => window.history.back()}
        className="my-1 mx-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-4xl hover:bg-gray-400 self-start"
      >
        ←
      </button>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="text-lg font-medium">
          Página {pageNumber} de {numPages}
        </span>

        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
          disabled={pageNumber === numPages}
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      <div className="w-full max-w-[1024px] border shadow-md p-4 rounded bg-white overflow-auto">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default PDFViewer;
