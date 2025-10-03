import type React from "react";
import { useRef } from "react";

type CarouselProps = {
  children: React.ReactNode;
  ariaLabel: string;
  itemWidth?: number;
};

export default function Carousel({
  children,
  ariaLabel,
  itemWidth = 240,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const delta = (itemWidth + 16) * 3;
    el.scrollBy({ left: dir === "left" ? -delta : delta, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      <button
        aria-label="Desplazar a la izquierda"
        onClick={() => scrollBy("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/90 hover:bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-primary z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-4 scrollbar-hide"
        tabIndex={0}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      <button
        aria-label="Desplazar a la derecha"
        onClick={() => scrollBy("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/90 hover:bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-primary z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
