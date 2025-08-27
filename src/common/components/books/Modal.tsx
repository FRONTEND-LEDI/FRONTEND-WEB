import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ensureModalRoot = () => {
  let root = document.getElementById("modal-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "modal-root";
    document.body.appendChild(root);
  }
  return root;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const modalRoot = ensureModalRoot();
  const contentRef = useRef<HTMLDivElement>(null);
  const lastActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // guardar foco y bloquear scroll de fondo
    lastActive.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus inicial
    contentRef.current?.focus();

    // cerrar con ESC
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // devolver foco al disparador
      lastActive.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dialog = (
    <div
      className="fixed inset-0 z-[1000] flex items-stretch justify-center bg-black/70"
      aria-hidden={!isOpen}
      onMouseDown={(e) => {
        // cerrar con click en backdrop (evita cerrar si se hace mousedown dentro del contenido)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={contentRef}
        className="relative m-0 w-full md:w-[min(1000px,95vw)] h-full md:h-[95vh] bg-white rounded-none md:rounded-2xl shadow-xl focus:outline-none"
      >
        {/* Barra superior */}
        <div className="sticky top-0 flex items-center gap-3 px-4 py-3 border-b bg-white/95 backdrop-blur">
          <h2 className="text-sm md:text-base font-semibold truncate">
            {title || "Visor"}
          </h2>
          <div className="ml-auto">
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-md text-sm border hover:bg-gray-50"
            >
              Cerrar
            </button>
          </div>
        </div>
        {/* Contenido modal */}
        <div className="h-[calc(100%-56px)] overflow-auto">{children}</div>
      </div>
    </div>
  );

  return createPortal(dialog, modalRoot);
}
