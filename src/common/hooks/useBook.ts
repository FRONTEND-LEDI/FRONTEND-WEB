import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../../db/services/books";
import type { Book } from "../../types/books";
import { useAuth } from "../../context/AuthContext";

export function useBook(bookId: string | undefined) {
  const { token } = useAuth();
  return useQuery<Book>({
    queryKey: ["book", bookId, token],
    queryFn: () => getBookById(bookId!, token),
    enabled: !!bookId && !!token,
  });
}
