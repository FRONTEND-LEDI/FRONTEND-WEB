import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations } from "../services/home.api";
import type { Book } from "../../../types/books";

export function useRecommendations(token: string | null) {
  return useQuery<Book[], Error>({
    queryKey: ["recommendations"],
    queryFn: () => fetchRecommendations(token),
    staleTime: 1000 * 60 * 5,
  });
}
