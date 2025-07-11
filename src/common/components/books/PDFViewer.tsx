import { useEffect, useRef, useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.mjs';

// Configuración del worker
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;
    let pdfInstance: any = null;

    const renderPDF = async () => {
      try {
        const loadingTask = getDocument(pdfUrl);
        pdfInstance = await loadingTask.promise;

        if (!isMounted) return;

        setNumPages(pdfInstance.numPages);

        const page = await pdfInstance.getPage(currentPage);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
      } catch (error) {
        console.error('Error al renderizar PDF:', error);
      }
    };

    renderPDF();

    return () => { isMounted = false; };
  }, [pdfUrl, currentPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">
        <button onClick={handlePrev} disabled={currentPage === 1} className="px-4 py-2 bg-yellow-400 text-white rounded mr-2">
          ◀
        </button>
        <span>{currentPage} / {numPages}</span>
        <button onClick={handleNext} disabled={currentPage === numPages} className="px-4 py-2 bg-yellow-400 text-white rounded ml-2">
          ▶
        </button>
      </div>

      <canvas ref={canvasRef} className="shadow-lg rounded bg-white" />
    </div>
  );
};

export default PDFViewer;
