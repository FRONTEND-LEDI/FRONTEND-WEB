import { useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Book } from "../../types/books";
import type { BookProgress } from "../../types/progress";
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
  const initialPosition = fmt === "ebook" ? 1 : 0;

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
            startDate: new Date().toISOString(),
            unit,
          },
          token
        );
        // refresca cache de este libro
        qc.setQueryData(["progress", book._id], created);
      }
    } finally {
      creatingRef.current = false;
    }
  }, [book, token, initialPosition, unit, qc]);

  return { ensure, initialPosition };
}

/** Actualiza la posición con throttle (para scroll/pdf o tiempo de video) */
export function useUpdatePosition(progress?: BookProgress | null) {
  const { token } = useAuth();
  const qc = useQueryClient();
  const lastSentRef = useRef<number>(0);

  const { mutate } = useMutation({
    mutationFn: (position: number) =>
      updateProgressPosition({ id: progress!._id, position }, token),
    onSuccess: (data) => {
      // refresca cache del progreso de este libro
      qc.setQueryData(["progress", data.idBook], data);
    },
  });

  const sendThrottled = useCallback(
    (position: number, nowMs: number = Date.now(), everyMs: number = 3000) => {
      if (!progress?._id) return;
      if (nowMs - lastSentRef.current >= everyMs) {
        lastSentRef.current = nowMs;
        mutate(position);
      }
    },
    [mutate, progress?._id]
  );

  return { sendThrottled };
}
