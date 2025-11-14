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

export function useBooks({ query, filters, token }: UseBooksParams) {
  return useQuery<Book[]>({
    queryKey: ["books", { query, filters, token }],
    queryFn: () => {
      const q = query.trim();
      if (q) return getBooksByQuery(q, token);

      // If anthology filter is active we filter on the frontend because
      // the backend doesn't support that filter yet.
      const otherFiltersActive =
        (filters.years && filters.years.length > 0) ||
        (filters.genres && filters.genres.length > 0) ||
        (filters.subgenres && filters.subgenres.length > 0) ||
        (filters.formats && filters.formats.length > 0);

      if (hasActiveFilters(filters)) {
        if (filters.anthology === true && !otherFiltersActive) {
          // Only anthology toggle is active: get all books and filter locally
          return getAllBooks(token).then((books) =>
            books.filter((b) => b.anthology === true)
          );
        }

        // Some server-side filters are active. Call server and then, if anthology
        // is requested, filter the results on the client as well.
        return getBooksByFiltering(filters, token).then((books) => {
          if (filters.anthology === true)
            return books.filter((b) => b.anthology === true);
          return books;
        });
      }

      return getAllBooks(token);
    },
    enabled: !!token,
    placeholderData: (prev) => prev,
  });
}
