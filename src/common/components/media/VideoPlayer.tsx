import { useEffect, useRef, useState } from "react";

type SubtitleTrack = {
  src: string;
  srclang: string;
  label: string;
  default?: boolean;
};

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  initialTime?: number;
  subtitles?: SubtitleTrack[];
  onProgress?: (current: number, duration: number) => void;
  onEnded?: () => void;
}

const PROGRESS_INTERVAL = 5000;

export default function VideoPlayer({
  src,
  poster,
  title = "Reproductor",
  initialTime = 0,
  subtitles = [],
  onProgress,
  onEnded,
}: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number>(0);
  const endedRef = useRef(false); // evita múltiples onEnded

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onLoadedMeta = () => {
      setDuration(v.duration || 0);
      if (initialTime > 0 && initialTime < (v.duration || Infinity)) {
        v.currentTime = initialTime;
      }
    };
    v.addEventListener("loadedmetadata", onLoadedMeta);
    return () => v.removeEventListener("loadedmetadata", onLoadedMeta);
  }, [initialTime]);

  // Reportar progreso + fallback de fin
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tick = () => {
      const cur = v.currentTime || 0;
      const dur = v.duration || duration || 0;
      if (onProgress) onProgress(cur, dur);

      // fallback: algunos navegadores no disparan 'ended'
      if (!endedRef.current && onEnded && dur > 0 && cur >= dur - 0.5) {
        endedRef.current = true;
        onEnded();
      }
    };
    const timer = setInterval(tick, PROGRESS_INTERVAL);
    return () => clearInterval(timer);
  }, [onProgress, onEnded, duration]);

  // Atajos teclado
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      )
        return;
      if (e.key === " " || e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (v.paused) v.play().catch(() => {});
        else v.pause();
      }
      if (e.key.toLowerCase() === "j")
        v.currentTime = Math.max(0, v.currentTime - 10);
      if (e.key.toLowerCase() === "l")
        v.currentTime = Math.min(
          duration || v.duration || Infinity,
          v.currentTime + 10
        );
      if (e.key === ",") v.playbackRate = Math.max(0.25, v.playbackRate - 0.25);
      if (e.key === ".") v.playbackRate = Math.min(4, v.playbackRate + 0.25);
      if (e.key.toLowerCase() === "m") v.muted = !v.muted;
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [duration]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/10">
      <div className="w-full max-w-5xl mx-auto p-4">
        <video
          ref={ref}
          src={src}
          poster={poster}
          controls
          playsInline
          className="w-full max-h-[70vh] rounded-lg shadow-lg bg-black"
          aria-label={title}
          onEnded={() => {
            if (!endedRef.current) {
              endedRef.current = true;
              onEnded?.();
            }
          }}
        >
          {subtitles.map((t, i) => (
            <track
              key={`${t.srclang}-${i}`}
              src={t.src}
              kind="subtitles"
              srcLang={t.srclang}
              label={t.label}
              default={t.default}
            />
          ))}
        </video>

        {/*<div className="mt-3 flex items-center gap-3 text-white/90">
          <span className="text-sm opacity-75">{title}</span>
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="rate" className="text-xs opacity-75">
              Velocidad
            </label>
            <select
              id="rate"
              className="select select-sm bg-white/20 text-white"
              onChange={(e) => {
                const v = ref.current;
                if (!v) return;
                v.playbackRate = Number(e.target.value);
              }}
              defaultValue="1"
            >
              {[0.75, 1, 1.25, 1.5, 1.75, 2].map((r) => (
                <option key={r} value={r}>
                  {r}x
                </option>
              ))}
            </select>
          </div>
        </div>*/}
      </div>
    </div>
  );
}
