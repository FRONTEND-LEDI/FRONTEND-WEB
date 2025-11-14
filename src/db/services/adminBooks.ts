import type { AdminCreateBookInput } from "../../types/books";

import { API_BASE_URL } from "../config";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = { "x-client": "web" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

function buildBookFormData(payload: AdminCreateBookInput): FormData {
  const fd = new FormData();

  // archivos
  fd.append("file", payload.bookFile);
  fd.append("img", payload.imgFile);

  // simples
  fd.append("title", payload.title);
  fd.append("summary", payload.summary);
  fd.append("language", payload.language);
  fd.append("available", "true");
  fd.append("yearBook", payload.yearBook);
  fd.append("synopsis", payload.synopsis);
  fd.append("genre", payload.genre);
  fd.append("level", payload.level);
  fd.append("format", payload.format);
  fd.append("fileExtension", payload.fileExtension);
  // anthology (boolean)
  if (typeof payload.anthology === "boolean") {
    fd.append("anthology", String(payload.anthology));
  }

  //  ENVIAR CADA ELEMENTO POR SEPARADO
  for (const id of payload.author) {
    fd.append("author", id);
  }
  for (const s of payload.subgenre) {
    fd.append("subgenre", s);
  }
  for (const t of payload.theme) {
    fd.append("theme", t);
  }

  if (typeof payload.totalPages === "number") {
    fd.append("totalPages", String(payload.totalPages));
  }
  if (typeof payload.duration === "number") {
    fd.append("duration", String(payload.duration));
  }

  return fd;
}

export async function adminCreateBook(
  payload: AdminCreateBookInput,
  token: string | null
) {
  // Validación simple en front:
  if (payload.format === "ebook" && !payload.totalPages) {
    throw new Error("Para 'ebook' es obligatorio totalPages.");
  }
  if (
    (payload.format === "audiobook" || payload.format === "videobook") &&
    !payload.duration
  ) {
    throw new Error("Para audio/video es obligatorio duration.");
  }

  const res = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: authHeaders(token),
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
  const res = await fetch(`${API_BASE_URL}/book/${id}`, {
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

// ! edicion de libro
function buildUpdateBookFormData(
  form: Partial<AdminCreateBookInput>
): FormData {
  const fd = new FormData();

  // Archivos
  if (form.imgFile) fd.append("img", form.imgFile);
  if (form.bookFile) fd.append("file", form.bookFile);

  // Campos simples
  const simpleFields = [
    "title",
    "summary",
    "language",
    "yearBook",
    "synopsis",
    "genre",
    "level",
    "format",
    "fileExtension",
  ] as const;

  for (const field of simpleFields) {
    if (field in form && typeof form[field] !== "undefined") {
      let value = form[field];
      if (field === "fileExtension" && typeof value === "string") {
        value = value.trim().toUpperCase(); // Normalizar a mayúsculas
      }
      fd.append(field, String(value));
    }
  }

  // anthology puede venir como booleano
  if ("anthology" in form && typeof form.anthology !== "undefined") {
    fd.append("anthology", String(form.anthology));
  }

  // Arrays: enviar cada elemento como un append separado
  if (Array.isArray(form.author)) {
    for (const id of form.author) {
      fd.append("author", id);
    }
  }
  if (Array.isArray(form.subgenre)) {
    for (const s of form.subgenre) {
      fd.append("subgenre", s);
    }
  }
  if (Array.isArray(form.theme)) {
    for (const t of form.theme) {
      fd.append("theme", t);
    }
  }

  // Campos numéricos condicionales
  if (typeof form.totalPages === "number") {
    fd.append("totalPages", String(form.totalPages));
  }
  if (typeof form.duration === "number") {
    fd.append("duration", String(form.duration));
  }

  fd.append("available", "true");

  return fd;
}

export async function adminUpdateBook(
  id: string,
  form: Partial<AdminCreateBookInput>,
  token: string | null
) {
  const res = await fetch(`${API_BASE_URL}/book/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: buildUpdateBookFormData(form),
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "No se pudo actualizar el libro");
  return data;
}
