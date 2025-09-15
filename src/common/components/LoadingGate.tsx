import type React from "react";
import { Loader2, BookOpen, Sparkles } from "lucide-react";

type Props = {
  message?: string;
  fullscreen?: boolean; // para usarlo embebido en un contenedor
};

const LoadingGate: React.FC<Props> = ({
  message = "Cargando…",
  fullscreen = true,
}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    fullscreen ? (
      <div className="fixed inset-0 z-50 grid place-items-center bg-gradient-to-br from-orange-50/90 via-white/80 to-amber-50/90 dark:from-black/60 dark:via-neutral-900/80 dark:to-black/60 backdrop-blur-md animate-in fade-in-0 duration-300">
        {children}
      </div>
    ) : (
      <div className="w-full min-h-[160px] grid place-items-center">
        {children}
      </div>
    );

  return (
    <Wrapper>
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-orange-200/40 dark:border-orange-400/20 bg-gradient-to-br from-white/95 via-orange-50/80 to-amber-50/90 dark:from-neutral-800/90 dark:via-neutral-900/80 dark:to-black/90 px-8 py-6 shadow-xl shadow-orange-500/10 dark:shadow-orange-400/5 backdrop-blur-sm">
        {/* contenedor de la animación */}
        <div className="relative">
          {/* cosito de carga principal */}
          <div className="relative">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500 dark:text-orange-400" />

            {/* icono de libro flotante */}
            <div className="absolute -top-1 -right-1 animate-bounce">
              <BookOpen className="h-4 w-4 text-orange-600 dark:text-orange-300" />
            </div>

            {/* efecto Sparkle */}
            <div className="absolute -top-2 -left-2 animate-pulse delay-75">
              <Sparkles className="h-3 w-3 text-amber-400 dark:text-amber-300" />
            </div>
            <div className="absolute -bottom-2 -right-2 animate-pulse delay-150">
              <Sparkles className="h-2 w-2 text-orange-400 dark:text-orange-300" />
            </div>
          </div>

          {/* efecto de  */}
          <div className="absolute inset-0 rounded-full border-2 border-orange-300/30 dark:border-orange-400/20 animate-ping" />
        </div>

        {/* mensaje de carga */}
        <div className="text-center space-y-1">
          <span className="text-base font-semibold text-orange-900 dark:text-orange-100 tracking-wide">
            {message}
          </span>
          <div className="flex items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-75" />
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-150" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoadingGate;
