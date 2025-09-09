const API_URL = "http://localhost:3402";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = { "x-client": "web" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

export type CreateAuthorInput = {
  name: string;
  biography: string;
  avatarFile: File; // field name esperado por el back: "avatar"
};

export type UpdateAuthorInput = {
  name?: string;
  biography?: string;
  avatarFile?: File; // opcional
};

function buildAuthorFormData(data: CreateAuthorInput | UpdateAuthorInput): FormData {
  const fd = new FormData();
  if ("name" in data && typeof data.name !== "undefined") fd.append("name", String(data.name));
  if ("biography" in data && typeof data.biography !== "undefined") fd.append("biography", String(data.biography));
  if ("avatarFile" in data && data.avatarFile) fd.append("avatar", (data as any).avatarFile);
  return fd;
}

// Crear autor (POST /author/create)
export async function adminCreateAuthor(data: CreateAuthorInput, token: string | null) {
  const res = await fetch(`${API_URL}/author/create`, {
    method: "POST",
    headers: authHeaders(token),
    body: buildAuthorFormData(data),
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || "No se pudo crear el autor");
  return json; // debería incluir el autor creado
}

// Actualizar autor (PUT /author/:id)
export async function adminUpdateAuthor(id: string, data: UpdateAuthorInput, token: string | null) {
  const res = await fetch(`${API_URL}/author/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: buildAuthorFormData(data),
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || "No se pudo actualizar el autor");
  return json;
}

// Eliminar autor (DELETE /author/:id)
export async function adminDeleteAuthor(id: string, token: string | null) {
  const res = await fetch(`${API_URL}/author/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || "No se pudo eliminar el autor");
  return json;
}

// Obtener autor por id (GET /author/:id)
export async function getAuthorById(id: string, token: string | null) {
  const res = await fetch(`${API_URL}/author/${id}`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || "No se pudo obtener el autor");
  return json;
}

// Buscar autores por nombre (GET /author?name=...)
// Si el backend permite llamar sin query para traer todos, genial.
// Si NO, entonces usaremos siempre con nombre/parcial.
export async function searchAuthors(name: string, token: string | null) {
  const qs = name ? `?name=${encodeURIComponent(name)}` : "";
  const res = await fetch(`${API_URL}/author${qs}`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || "No se pudo buscar autores");
  return json; // asumimos array
}
