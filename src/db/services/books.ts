import { type Book } from "../../types/books";
const URL = "http://localhost:3402"; 

export const getAllBooks = async (token: string | null) : Promise<Book[]> => {
  const res = await fetch(`${URL}/books`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "x-client": "web",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error('Error al obtener libros');

  return res.json() as Promise<Book[]>;
};


export async function getBooksByQuery(query: string, token: string | null) : Promise<Book[]> {
  const res = await fetch(`${URL}/books/${encodeURIComponent(query)}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "x-client": "web",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error al buscar libros");
  return res.json() as Promise<Book[]>;
}
