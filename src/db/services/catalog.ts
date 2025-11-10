import type { Book } from "../../types/books";
import type { FilterState } from "../../types/filters";

import { API_BASE_URL } from "../config";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = {
    "Content-Type": "application/json",
    "x-client": "web",
  };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

export async function getAllYears(
  token: string | null
): Promise<(number | string)[]> {
  const res = await fetch(`${API_BASE_URL}/booksYears`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener años");
  return res.json();
}

export async function getAllGenres(token: string | null): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/booksGenres`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener géneros");
  return res.json();
}

export async function getAllSubgenres(token: string | null): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/booksSubgenres`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener subgéneros");
  return res.json();
}

export async function getAllFormats(token: string | null): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/booksFormats`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener formatos");
  return res.json();
}

export async function getBooksByFiltering(
  filters: FilterState,
  token: string | null
): Promise<Book[]> {
  const payload = {
    theme: [],
    subgenre: filters.subgenres ?? [],
    yearBook: filters.years ?? [],
    genre: filters.genres ?? [],
    format: filters.formats ?? [],
  };

  const res = await fetch(`${API_BASE_URL}/booksByFiltering`, {
    method: "POST",
    headers: authHeaders(token),
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al filtrar libros");

  const books = (await res.json()) as Book[];

  // if (filters.formats && filters.formats.length > 0) {
  //   return books.filter((b) => b.format && filters.formats.includes(b.format));
  // }
  return books;
}
