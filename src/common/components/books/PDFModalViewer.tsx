import { useEffect, useMemo, useRef, useState } from "react";
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
} from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface PDFModalViewerProps {
  pdfUrl: string;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

export default function PDFModalViewer({
  pdfUrl,
  initialPage = 1,
  onPageChange,
}: PDFModalViewerProps) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // track página visible aprox para onPageChange
  const [visiblePage, setVisiblePage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const task = getDocument(pdfUrl);
      const _pdf = await task.promise;
      if (cancelled) return;
      setPdf(_pdf);
      setNumPages(_pdf.numPages);
    };
    load().catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  // Observa canvases hijos y renderiza cuando entran al viewport
  useEffect(() => {
    if (!pdf || !containerRef.current) return;

    const container = containerRef.current;
    const ratio = Math.min(window.devicePixelRatio || 1, 2); // limitar DPR para móviles

    const renderPage = async (pageNum: number, canvas: HTMLCanvasElement) => {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1 });

      // ancho disponible: padding de 16px del contenedor
      const containerWidth = container.clientWidth;
      const maxWidth = Math.min(containerWidth - 42, 900); // máximo 900px
      const scale = maxWidth / viewport.width;
      const scaled = page.getViewport({ scale });

      const ctx = canvas.getContext("2d");
      canvas.width = Math.floor(scaled.width * ratio);
      canvas.height = Math.floor(scaled.height * ratio);
      canvas.style.width = `${Math.floor(scaled.width)}px`;
      canvas.style.height = `${Math.floor(scaled.height)}px`;

      ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
      await page.render({ canvasContext: ctx!, viewport: scaled }).promise;
      page.cleanup();
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLDivElement;
          const pageNum = Number(el.dataset.page);
          const canvas = el.querySelector("canvas");
          if (!canvas) return;

          if (entry.isIntersecting) {
            // marcar página visible (para progreso aproximado)
            //setVisiblePage((prev) => (pageNum < prev ? prev : pageNum));
            // si aún no está pintado, renderizar
            if (!canvas.dataset.rendered) {
              renderPage(pageNum, canvas as HTMLCanvasElement)
                .then(() => {
                  (canvas as HTMLCanvasElement).dataset.rendered = "1";
                })
                .catch(console.error);
            }
          }
        });
      },
      { root: container, rootMargin: "200px 0px", threshold: 0.1 }
    );

    const items = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-page]")
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, [pdf]);

  // Notificar cambios de página (aprox superior visible)
  useEffect(() => {
    if (onPageChange) onPageChange(visiblePage);
  }, [visiblePage, onPageChange]);

  const pages = useMemo(
    () => Array.from({ length: numPages }, (_, i) => i + 1),
    [numPages]
  );

  // calcular la página visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateVisible = () => {
      const items = Array.from(
        container.querySelectorAll<HTMLDivElement>("[data-page]")
      );
      if (!items.length) return;

      let bestPage = 1;
      let bestDelta = Number.POSITIVE_INFINITY;

      // medimos contra el scrollTop del contenedor (no contra el viewport)
      items.forEach((el) => {
        const pageNum = Number(el.dataset.page);
        const delta = Math.abs(el.offsetTop - container.scrollTop);
        if (delta < bestDelta) {
          bestDelta = delta;
          bestPage = pageNum;
        }
      });

      setVisiblePage(bestPage);
    };

    // escuchar scroll y resize
    const onScroll = () => requestAnimationFrame(updateVisible);
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // primer cálculo
    updateVisible();

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [numPages]); // cuando ya sabemos cuántas páginas hay

  // scrollear a la página inicial cuando ya se conoce numPages
  useEffect(() => {
    const c = containerRef.current;
    if (!c || !numPages) return;
    const el = c.querySelector<HTMLElement>(`[data-page="${initialPage}"]`);
    if (el) {
      c.scrollTo({ top: el.offsetTop, behavior: "auto" });
    }
  }, [numPages, initialPage]);

  return (
    <div
      ref={containerRef}
      className="px-6 py-4 overflow-auto h-full bg-transparent"
    >
      {/* Toolbar simple opcional */}
      <div className="mb-4 text-sm text-center text-white/80">
        Página {visiblePage} de {numPages || "…"}
      </div>

      {/* Lista vertical de páginas */}
      <div className="flex flex-col gap-6 items-center">
        {pages.map((p) => (
          <div key={p} data-page={p} className="w-full max-w-[900px] mx-auto">
            <div className="bg-white shadow-2x1 rounded-lg overflow-hidden border border-gray-300">
              <canvas className="block w-full h-auto" />
            </div>
          </div>
        ))}
        {numPages === 0 && (
          <div className="text-center text-white/60 py-10">
            Cargando documento…
          </div>
        )}
      </div>
    </div>
  );
}
