import type { BookProgress, ProgressStatus } from "../../types/progress";

const URL = "http://localhost:3402";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = {
    "Content-Type": "application/json",
    "x-client": "web",
  };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

//! GET  -> normaliza a [] si no hay result */
export async function getAllProgress(
  token: string | null
): Promise<BookProgress[]> {
  const res = await fetch(`${URL}/Progress`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error("No se pudo obtener el progreso del usuario");
  const payload = await res.json();
  const result = payload?.result;
  return Array.isArray(result) ? (result as BookProgress[]) : [];
}

//! -----
// ? obtener el progreso del libro específico */
export async function getProgressByBook(bookId: string, token: string | null) {
  const all = await getAllProgress(token);
  return all.find((p) => p.idBook === bookId) ?? null;
}

//! POST -> crea progreso inicial */
export async function createProgress(
  input: {
    idBook: string;
    status: ProgressStatus;
    position: number;
    percent: number;
    total: number;
    startDate: string;
    unit: "page" | "second";
  },
  token: string | null
): Promise<BookProgress> {
  const res = await fetch(`${URL}/SaveProgress`, {
    method: "POST",
    headers: authHeaders(token),
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo crear el progreso");
  const payload = await res.json();
  return (payload?.data ?? payload?.result) as BookProgress;
}

// ! PUT - actualiza la posición y estado */
export async function updateProgressPosition(
  input: {
    id: string;
    position: number;
    percent: number;
    total: number;
    unit: "page" | "second";
    status?: ProgressStatus;
  },
  token: string | null
): Promise<BookProgress> {
  const res = await fetch(`${URL}/progress`, {
    method: "PUT",
    headers: authHeaders(token),
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo actualizar la posición");
  const payload = await res.json();
  return (payload?.result ?? payload?.data) as BookProgress;
}
