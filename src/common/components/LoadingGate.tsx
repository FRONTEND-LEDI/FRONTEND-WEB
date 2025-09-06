// src/common/components/LoadingGate.tsx
import React from "react";
import { Loader2, Brain } from "lucide-react";

type Props = {
  message?: string;
  fullscreen?: boolean; // si querés usarlo embebido en un contenedor
};

const LoadingGate: React.FC<Props> = ({
  message = "Cargando…",
  fullscreen = true,
}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    fullscreen ? (
      <div className="fixed inset-0 z-50 grid place-items-center bg-white/70 dark:bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200">
        {children}
      </div>
    ) : (
      <div className="w-full min-h-[160px] grid place-items-center">
        {children}
      </div>
    );

  return (
    <Wrapper>
      <div className="flex items-center gap-3 rounded-2xl border border-neutral-200/60 dark:border-white/10 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 shadow-sm">
        <div className="relative">
          <Loader2 className="h-6 w-6 animate-spin" />
          <Brain className="h-3 w-3 absolute -bottom-1 -right-1 opacity-80" />
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </Wrapper>
  );
};

export default LoadingGate;
