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

  // Evitar re-salto al progreso mientras está abierto
  const didInitialJump = useRef(false);
  useEffect(() => {
    // Si cambia el pdf o la initialPage (p.ej. abrís otro libro),
    // permitimos 1 salto inicial de nuevo.
    didInitialJump.current = false;
  }, [pdfUrl, initialPage]);

  // Página visible aprox
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

  // ⬅️ SALTO INICIAL: solo una vez cuando ya sabemos cuántas páginas hay
  useEffect(() => {
    const c = containerRef.current;
    if (!c || !numPages || didInitialJump.current) return;
    const el = c.querySelector<HTMLElement>(`[data-page="${initialPage}"]`);
    if (el) {
      c.scrollTo({ top: el.offsetTop, behavior: "auto" });
      didInitialJump.current = true;
    }
  }, [numPages]); // importante: NO depende de initialPage

  // ---- RENDER LAZY CON CANCELACIÓN SEGURA ----
  // Guardamos el renderTask por canvas para poder cancelarlo si se repite
  const renderMap = useRef(
    new WeakMap<HTMLCanvasElement, { task?: any; rendered?: boolean }>()
  );

  useEffect(() => {
    if (!pdf || !containerRef.current) return;

    const container = containerRef.current;
    const outputScale = Math.min(window.devicePixelRatio || 1, 2); // límite 2x

    const renderPage = async (pageNum: number, canvas: HTMLCanvasElement) => {
      const page = await pdf.getPage(pageNum);

      // Adaptar escala al ancho disponible
      const containerWidth = container.clientWidth;
      const maxWidth = Math.min(containerWidth - 42, 900);
      const viewportBase = page.getViewport({ scale: 1 });
      const scale = maxWidth / viewportBase.width;
      const viewport = page.getViewport({ scale });

      const ctx = canvas.getContext("2d", { alpha: false })!;

      // Si había un render en curso para este canvas, cancelarlo
      const prev = renderMap.current.get(canvas);
      if (prev?.task && typeof prev.task.cancel === "function") {
        try {
          prev.task.cancel();
        } catch {}
      }

      // Configurar tamaño físico y CSS
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      // 🚫 No usar ctx.setTransform aquí.
      const transform =
        outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

      const task = page.render({ canvasContext: ctx, viewport, transform });
      renderMap.current.set(canvas, { task, rendered: false });

      await task.promise; // si se cancela, lanza excepción: la ignoramos arriba
      renderMap.current.set(canvas, { rendered: true });
      page.cleanup();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLDivElement;
          const pageNum = Number(el.dataset.page);
          const canvas = el.querySelector("canvas") as HTMLCanvasElement | null;
          if (!canvas) continue;

          if (entry.isIntersecting) {
            const state = renderMap.current.get(canvas);
            // Evitar solapar renders: si ya está renderizado o en curso, skip
            if (state?.rendered || state?.task) continue;

            renderPage(pageNum, canvas).catch((err) => {
              // Evitar ruido si fue cancelado
              if (String(err)?.toLowerCase().includes("cancelled")) return;
              console.error(err);
            });
          }
        }
      },
      { root: container, rootMargin: "200px 0px", threshold: 0.1 }
    );

    const items = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-page]")
    );
    items.forEach((it) => io.observe(it));

    return () => {
      io.disconnect();
      // Cancelar cualquier render que siga vivo
      items.forEach((it) => {
        const canvas = it.querySelector("canvas") as HTMLCanvasElement | null;
        const state = canvas ? renderMap.current.get(canvas) : null;
        if (state?.task && typeof state.task.cancel === "function") {
          try {
            state.task.cancel();
          } catch {}
        }
      });
    };
  }, [pdf]);

  // Notificar cambios de página (aprox superior visible)
  useEffect(() => {
    if (onPageChange) onPageChange(visiblePage);
  }, [visiblePage, onPageChange]);

  const pages = useMemo(
    () => Array.from({ length: numPages }, (_, i) => i + 1),
    [numPages]
  );

  // Calcular la página visible en base al scroll del contenedor
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
      const top = container.scrollTop;

      for (const el of items) {
        const pageNum = Number(el.dataset.page);
        const delta = Math.abs(el.offsetTop - top);
        if (delta < bestDelta) {
          bestDelta = delta;
          bestPage = pageNum;
        }
      }
      setVisiblePage(bestPage);
    };

    const onScroll = () => requestAnimationFrame(updateVisible);
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateVisible();

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [numPages]);

  return (
    <div
      ref={containerRef}
      className="px-6 py-4 overflow-auto h-full bg-transparent"
    >
      <div className="mb-4 text-sm text-center text-white/80">
        Página {visiblePage} de {numPages || "…"}
      </div>

      <div className="flex flex-col gap-6 items-center">
        {pages.map((p) => (
          <div key={p} data-page={p} className="w-full max-w-[900px] mx-auto">
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-300">
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
