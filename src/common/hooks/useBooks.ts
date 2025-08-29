import { type Book } from "../../types/books";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks, getBooksByQuery } from "../../db/services/books";
import { getBooksByFiltering } from "../../db/services/catalog";
import type { FilterState } from "../../types/filters";
import { hasActiveFilters } from "../../types/filters";


interface UseBooksParams {
  query: string;
  filters: FilterState;
  token: string | null;
}

export function useBooks({query, filters, token} : UseBooksParams) {

  return useQuery<Book[]>({
    queryKey: ["books", { query, filters, token }],
    queryFn: () => {
      const q = query.trim();
      if (q) return getBooksByQuery(q, token);
      if (hasActiveFilters(filters)) return getBooksByFiltering(filters, token);
      return getAllBooks(token);
    },
    enabled: !!token,
    placeholderData: (prev) => prev,
  });
}
