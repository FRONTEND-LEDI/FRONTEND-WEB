import { useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Book } from "../../types/books";
import type { ProgressStatus } from "../../types/progress";
import {
  getProgressByBook,
  createProgress,
  updateProgressPosition,
} from "../../db/services/progress";
import { useAuth } from "../../context/AuthContext";

/** Lee el progreso del libro (o null) */
export function useBookProgress(bookId?: string) {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["progress", bookId],
    queryFn: () =>
      bookId ? getProgressByBook(bookId, token) : Promise.resolve(null),
    enabled: !!bookId,
  });
}

/** Crea el progreso inicial si no existe al abrir */
export function useEnsureProgressOnOpen(book: Book | null | undefined) {
  const { token } = useAuth();
  const qc = useQueryClient();
  const creatingRef = useRef(false);

  const fmt = book?.format?.toLowerCase();
  const unit: "page" | "second" = fmt === "ebook" ? "page" : "second";
  const total =
    fmt === "ebook"
      ? Number(book?.totalPages ?? 0)
      : Number(book?.duration ?? 0);

  const initialPosition = fmt === "ebook" ? 1 : 0;
  const initialPercent =
    total > 0 ? Math.round((initialPosition / total) * 10000) / 100 : 0;

  const ensure = useCallback(async () => {
    if (!book || creatingRef.current) return;
    creatingRef.current = true;
    try {
      const existing = await getProgressByBook(book._id, token);
      if (!existing) {
        const created = await createProgress(
          {
            idBook: book._id,
            status: "reading",
            position: initialPosition,
            percent: initialPercent,
            total,
            startDate: new Date().toISOString(),
            unit,
          },
          token
        );
        // refresca cache de este libro y lista de "seguir leyendo"
        qc.setQueryData(["progress", book._id], created);
        qc.invalidateQueries({ queryKey: ["continueReading"] });
        qc.invalidateQueries({ queryKey: ["progressAll"] });
      }
    } finally {
      creatingRef.current = false;
    }
  }, [book, token, initialPosition, unit, initialPercent, total, qc]);

  return { ensure, initialPosition, unit, total };
}

/** Actualiza la posición con throttle (calculo de percent + finished) */
export function useUpdatePosition(
  progressId?: string,
  unit?: "page" | "second",
  fixedTotal?: number
) {
  const { token } = useAuth();
  const lastSentRef = useRef<number>(0);
  const finishedOnceRef = useRef(false);
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: {
      position: number;
      total: number;
      unit: "page" | "second";
      status?: ProgressStatus;
    }) =>
      updateProgressPosition(
        {
          id: progressId!,
          position: data.position,
          percent:
            data.total > 0
              ? Math.round((data.position / data.total) * 10000) / 100
              : 0,
          total: data.total,
          unit: data.unit,
          status: data.status,
        },
        token
      ),
    // para refrescar cuando cambia
    onSuccess: (_data) => {
      qc.invalidateQueries({ queryKey: ["continueReading"] });
      qc.invalidateQueries({ queryKey: ["progressAll"] });
    },
  });

  // actualiza posició/percent
  const sendThrottled = useCallback(
    (
      position: number,
      overrideTotal?: number,
      nowMs: number = Date.now(),
      everyMs: number = 3000
    ) => {
      if (!progressId || !unit) return;
      if (nowMs - lastSentRef.current < everyMs) return;

      const total = Number(overrideTotal ?? fixedTotal ?? 0);
      const clampedPos =
        unit === "page"
          ? Math.max(1, Math.min(position, total || position))
          : Math.max(0, position);

      lastSentRef.current = nowMs;
      mutate({
        position: clampedPos,
        total,
        unit,
      });
    },
    [mutate, progressId, unit, fixedTotal]
  );

  // Enviar FIN una sola vez (percent=100, position=total)
  const finishOnce = useCallback(() => {
    if (!progressId || !unit) return;
    const total = Number(fixedTotal ?? 0);
    if (total <= 0) return;
    if (finishedOnceRef.current) return; // evita spam
    finishedOnceRef.current = true;

    mutate({ position: total, total, unit, status: "finished" });
  }, [mutate, progressId, unit, fixedTotal]);

  return { sendThrottled, finishOnce };
}
