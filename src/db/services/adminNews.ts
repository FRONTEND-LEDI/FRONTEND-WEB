import type {
  AdminCreateNewsInput,
  AdminUpdateNewsInput,
  News,
} from "../../types/news";
import { API_BASE_URL } from "../config";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = { "x-client": "web" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

function buildNewsFormData(payload: AdminCreateNewsInput): FormData {
  const fd = new FormData();

  // imagen
  if (payload.imgFile) {
    fd.append("img", payload.imgFile);
  }

  // campos simples
  fd.append("title", payload.title);
  fd.append("description", payload.description);
  fd.append("date", payload.date);

  return fd;
}

export async function getAllNews(token: string | null): Promise<News[]> {
  const res = await fetch(`${API_BASE_URL}/getAllNews`, {
    method: "GET",
    headers: authHeaders(token),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("No se pudieron cargar las noticias");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function getNewsByIdForEdit(
  token: string | null,
  id: string
): Promise<News | null> {
  const allNews = await getAllNews(token);
  return allNews.find((n) => n._id === id) || null;
}

export async function adminCreateNews(
  payload: AdminCreateNewsInput,
  token: string | null
) {
  // Validación simple en front
  if (!payload.title.trim()) {
    throw new Error("El título es obligatorio");
  }
  if (!payload.description.trim()) {
    throw new Error("La descripción es obligatoria");
  }
  if (!payload.date) {
    throw new Error("La fecha es obligatoria");
  }

  const res = await fetch(`${API_BASE_URL}/createNews`, {
    method: "POST",
    headers: authHeaders(token),
    body: buildNewsFormData(payload),
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "No se pudo crear la noticia");
  }
  return data;
}

export async function adminUpdateNews(
  id: string,
  form: AdminUpdateNewsInput,
  token: string | null
) {
  const fd = new FormData();

  // imagen
  if (form.imgFile) {
    fd.append("img", form.imgFile);
  }

  // campos simples
  if (form.title !== undefined) {
    fd.append("title", form.title);
  }
  if (form.description !== undefined) {
    fd.append("description", form.description);
  }
  if (form.date !== undefined) {
    fd.append("date", form.date);
  }

  const res = await fetch(`${API_BASE_URL}/updateNews/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: fd,
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "No se pudo actualizar la noticia");
  }
  return data;
}

export async function adminDeleteNews(id: string, token: string | null) {
  const res = await fetch(`${API_BASE_URL}/deleteNews/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "No se pudo eliminar la noticia");
  }
  return data;
}
