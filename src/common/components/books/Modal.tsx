import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

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
      className="fixed inset-0 z-[1000] flex items-stretch justify-center bg-black/80"
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
        className="relative m-0 w-full h-full bg-transparent shadow-xl focus:outline-none"
      >
        {/* Barra superior */}
        <div className="sticky top-0 flex items-center justify-center px-4 py-3 border-b border-white/20 bg-primary/40 backdrop-blur">
          <h2 className="text-sm md:text-base font-semibold text-white/80">
            {title || "Visor"}
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 p-2 rounded-full text-white hover:bg-white/20 transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>
        {/* Contenido modal */}
        <div className="h-[calc(100%-56px)] overflow-auto">{children}</div>
      </div>
    </div>
  );

  return createPortal(dialog, modalRoot);
}
