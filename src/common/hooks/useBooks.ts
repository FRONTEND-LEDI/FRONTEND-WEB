import { type Book } from "../../types/books";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks, getBooksByQuery } from "../../db/services/books";

export function useBooks(query: string, token: string | null) {

  return useQuery<Book[]>({
    queryKey: ["books", { query, token }],
    queryFn: () =>
      query.trim()
        ? getBooksByQuery(query.trim(), token)
        : getAllBooks(token),
    enabled: !!token,
    placeholderData: (prev) => prev,
  });
}
