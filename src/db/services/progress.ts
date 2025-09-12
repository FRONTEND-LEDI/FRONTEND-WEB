import type { BookProgress, ProgressStatus } from "../../types/books";
const URL = "http://localhost:3402";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = {
    "Content-Type": "application/json",
    "x-client": "web",
  };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

// GET /progress/:bookId → devuelve 404 porque por ahora no hay progreso
export async function getProgress(bookId: string, token: string | null): Promise<BookProgress | null> {
  const res = await fetch(`${URL}/progress/${bookId}`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("No se pudo obtener el progreso");
  return res.json() as Promise<BookProgress>;
}

// crea el registro inicial
export async function createProgress(
  input: { idBook: string; currentPage: number; status: ProgressStatus },
  token: string | null
): Promise<BookProgress> {
  const res = await fetch(`${URL}/progress`, {
    method: "POST",
    headers: authHeaders(token),
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo crear el progreso");
  return res.json() as Promise<BookProgress>;
}

// actualiza el registro existente
export async function updateProgress(
  input: { idBook: string; currentPage: number; status: ProgressStatus },
  token: string | null
): Promise<BookProgress> {
  const res = await fetch(`${URL}/progress`, {
    method: "PUT",
    headers: authHeaders(token),
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo actualizar el progreso");
  return res.json() as Promise<BookProgress>;
}

// hace GET y decide POST/PUT
export async function upsertProgress(
  input: { idBook: string; currentPage: number; status: ProgressStatus },
  token: string | null
): Promise<BookProgress> {
  const existing = await getProgress(input.idBook, token);
  if (existing) {
    return updateProgress(input, token);
  }
  return createProgress(input, token);
}
