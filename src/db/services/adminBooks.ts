import type { AdminCreateBookInput } from "../../types/books";

const URL = "http://localhost:3402";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = { "x-client": "web" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

function buildBookFormData(payload: AdminCreateBookInput): FormData {
  const fd = new FormData();

  // archivos (según el backend: "file" y "img")
  fd.append("file", payload.bookFile);
  fd.append("img", payload.imgFile);

  // campos "text"
  fd.append("title", payload.title);
  // arrays como JSON o múltiples append (según parseFormData). Tu back usa parseFormData, así que JSON es seguro.
  fd.append("author", JSON.stringify(payload.author));
  fd.append("summary", payload.summary);
  fd.append("subgenre", JSON.stringify(payload.subgenre));
  fd.append("language", payload.language);
  fd.append("available", String(payload.available));
  fd.append("yearBook", payload.yearBook);
  fd.append("synopsis", payload.synopsis);
  fd.append("theme", JSON.stringify(payload.theme));
  fd.append("genre", payload.genre);
  fd.append("level", payload.level);
  fd.append("format", payload.format);
  fd.append("fileExtension", payload.fileExtension);

  if (typeof payload.totalPages === "number") {
    fd.append("totalPages", String(payload.totalPages));
  }
  if (typeof payload.duration === "number") {
    fd.append("duration", String(payload.duration));
  }

  return fd;
}

export async function adminCreateBook(payload: AdminCreateBookInput, token: string | null) {
  // Validación simple en front:
  if (payload.format === "ebook" && !payload.totalPages) {
    throw new Error("Para 'ebook' es obligatorio totalPages.");
  }
  if ((payload.format === "audiobook" || payload.format === "videobook") && !payload.duration) {
    throw new Error("Para audio/video es obligatorio duration.");
  }

  const res = await fetch(`${URL}/books`, {
    method: "POST",
    headers: authHeaders(token), // NO pongas Content-Type: lo maneja el browser en multipart
    body: buildBookFormData(payload),
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "No se pudo crear el libro");
  }
  return data;
}

export async function adminDeleteBook(id: string, token: string | null) {
  const res = await fetch(`${URL}/book/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "No se pudo eliminar el libro");
  }
  return data;
}

// Dejo preparado para cuando esté el endpoint de edición (PUT /book/:id):
export async function adminUpdateBook(id: string, form: Partial<AdminCreateBookInput>, token: string | null) {
  const fd = new FormData();
  // solo adjuntar lo que venga
  if (form.bookFile) fd.append("file", form.bookFile);
  if (form.imgFile) fd.append("img", form.imgFile);
  for (const [k, v] of Object.entries(form)) {
    if (k === "bookFile" || k === "imgFile") continue;
    if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
    else if (typeof v === "boolean" || typeof v === "number" || typeof v === "string") fd.append(k, String(v));
  }

  const res = await fetch(`${URL}/book/${id}`, {
    method: "PUT", // cuando esté listo en el back
    headers: authHeaders(token),
    body: fd,
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "No se pudo actualizar el libro");
  return data;
}
