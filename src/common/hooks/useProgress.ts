import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProgress, upsertProgress } from "../../db/services/progress";
import type { BookProgress, ProgressStatus } from "../../types/books";
import { useAuth } from "../../context/AuthContext";

export function useBookProgress(bookId: string | undefined) {
  const { token } = useAuth();
  return useQuery<BookProgress | null>({
    queryKey: ["bookProgress", bookId, token],
    queryFn: () => getProgress(bookId!, token),
    enabled: !!bookId && !!token,
  });
}

export function useUpsertBookProgress(bookId: string | undefined) {
  const { token } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { currentPage: number; status: ProgressStatus }) =>
      upsertProgress({ idBook: bookId!, ...input }, token),
    onSuccess: (data) => {
      qc.setQueryData(["bookProgress", bookId, token], data);
    },
  });
}
