import type { Book } from "../../types/books";
import { API_BASE_URL } from "../config";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = {
    "Content-Type": "application/json",
    "x-client": "web",
  };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

export const getAllBooks = async (token: string | null): Promise<Book[]> => {
  const res = await fetch(`${API_BASE_URL}/books`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener libros");
  return res.json() as Promise<Book[]>;
};

export async function getBooksByQuery(
  query: string,
  token: string | null
): Promise<Book[]> {
  const res = await fetch(
    `${API_BASE_URL}/books/${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: authHeaders(token),
      credentials: "include",
    }
  );
  if (!res.ok) throw new Error("Error al buscar libros");
  return res.json() as Promise<Book[]>;
}

// obtener un libro por id
export async function getBookById(
  id: string,
  token: string | null
): Promise<Book> {
  const res = await fetch(`${API_BASE_URL}/book/${id}`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw new Error("No se pudo obtener el libro");
  return res.json() as Promise<Book>;
}
