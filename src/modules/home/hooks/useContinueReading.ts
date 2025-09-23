import { useQuery } from "@tanstack/react-query";
import { fetchContinueReading } from "../services/home.api";
import type { BookWithProgress } from "../../../types/books";

export function useContinueReading(token: string | null) {
  return useQuery<BookWithProgress[], Error>({
    queryKey: ["continueReading"],
    queryFn: () => fetchContinueReading(token),
    staleTime: 1000 * 60 * 5,
  });
}
