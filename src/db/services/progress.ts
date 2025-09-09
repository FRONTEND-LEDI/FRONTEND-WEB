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

/** GET /Progress → puede venir {result:{}}; lo normalizamos a [] */
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
  if (Array.isArray(result)) return result as BookProgress[];
  return []; // si viene {}, null o undefined, devolvemos lista vacía
}

/** Ayuda: buscar por libro en la lista global */
export async function getProgressByBook(bookId: string, token: string | null) {
  const all = await getAllProgress(token);
  return all.find((p) => p.idBook === bookId) ?? null;
}

/** POST /SaveProgress → el back exige TODOS los campos */
export async function createProgressStrict(
  input: {
    idUser: string;
    idBook: string;
    status: ProgressStatus;
    progress: number;
    startDate: string;
  },
  token: string | null
): Promise<void> {
  const res = await fetch(`${URL}/SaveProgress`, {
    method: "POST",
    headers: authHeaders(token),
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo crear el progreso");
}

/** PUT /progress → requiere { id, ... } */
export async function updateProgressById(
  input: { id: string; status?: ProgressStatus; progress?: number },
  token: string | null
): Promise<void> {
  const res = await fetch(`${URL}/progress`, {
    method: "PUT",
    headers: authHeaders(token),
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo actualizar el progreso");
}

/** DELETE /progress → body { id } */
export async function deleteProgressById(
  id: string,
  token: string | null
): Promise<void> {
  const res = await fetch(`${URL}/progress`, {
    method: "DELETE",
    headers: authHeaders(token),
    credentials: "include",
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("No se pudo eliminar el progreso");
}
