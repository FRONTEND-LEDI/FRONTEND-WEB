import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProgressStrict,
  getAllProgress,
  getProgressByBook,
  updateProgressById,
} from "../../db/services/progress";
import type { BookProgress, ProgressStatus } from "../../types/progress";
import { useAuth } from "../../context/AuthContext";

/** Lista global del usuario (si viene vacía, devolvemos []) */
export function useAllProgress() {
  const { token } = useAuth();
  return useQuery<BookProgress[]>({
    queryKey: ["allProgress", token],
    queryFn: () => getAllProgress(token),
    enabled: !!token,
    staleTime: 30_000,
  });
}

/** Progreso de un libro (derivado o fallback a fetch) */
export function useBookProgress(bookId: string | undefined) {
  const { token } = useAuth();
  const { data, isLoading } = useAllProgress();

  const fromList = useMemo(
    () =>
      bookId && data ? data.find((p) => p.idBook === bookId) ?? null : null,
    [data, bookId]
  );

  const direct = useQuery<BookProgress | null>({
    queryKey: ["bookProgress", bookId, token],
    queryFn: () => getProgressByBook(bookId!, token),
    enabled: !!bookId && !!token && !fromList,
    staleTime: 30_000,
  });

  return {
    data: fromList ?? direct.data ?? null,
    isLoading: isLoading || direct.isLoading,
  };
}

/** Cambiar estado de un libro (crea si no existe; actualiza si existe) */
export function useSetBookStatus(bookId: string | undefined) {
  const { token, user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (status: ProgressStatus) => {
      if (!bookId) throw new Error("bookId requerido");
      // buscamos si existe
      const existing = await getProgressByBook(bookId, token);
      if (existing?._id) {
        // update por id
        return updateProgressById({ id: existing._id, status }, token);
      }
      // create con todos los campos que pide el back
      if (!user?.id) throw new Error("idUser no disponible");
      return createProgressStrict(
        {
          idUser: user.id,
          idBook: bookId,
          status,
          progress: 0,
          startDate: new Date().toISOString(),
        },
        token
      );
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["allProgress"] });
      await qc.invalidateQueries({ queryKey: ["bookProgress"] });
    },
  });
}

/** Update directo por id (por ejemplo, marcar finished si tenemos el doc) */
export function useUpdateProgressById() {
  const { token } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: {
      id: string;
      status?: ProgressStatus;
      progress?: number;
    }) => updateProgressById(input, token),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["allProgress"] });
      await qc.invalidateQueries({ queryKey: ["bookProgress"] });
    },
  });
}
