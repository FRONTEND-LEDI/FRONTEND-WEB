import { API_BASE_URL } from "../config";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = { "x-client": "web" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

export type CreateAuthorInput = {
  fullName: string;
  biography: string;
  profession: string;
  birthplace: string;
  birthdate: string;
  nationality: string;
  writingGenre: string[];
  avatarFile: File;
};

export type UpdateAuthorInput = {
  fullName?: string;
  biography?: string;
  profession?: string;
  birthplace?: string;
  birthdate?: string;
  nationality?: string;
  writingGenre?: string[];
  avatarFile?: File;
};

function buildAuthorFormData(
  data: CreateAuthorInput | UpdateAuthorInput
): FormData {
  const fd = new FormData();

  const fields: (keyof CreateAuthorInput)[] = [
    "fullName",
    "biography",
    "profession",
    "birthplace",
    "birthdate",
    "nationality",
  ];

  for (const field of fields) {
    if (field in data && typeof data[field] === "string") {
      fd.append(field, data[field] as string);
    }
  }

  if ("writingGenre" in data && Array.isArray(data.writingGenre)) {
    for (const genre of data.writingGenre) {
      fd.append("writingGenre", genre);
    }
  }

  if ("avatarFile" in data && data.avatarFile) {
    fd.append("avatar", (data as any).avatarFile);
  }

  return fd;
}

// Crear autor (POST /author/create)
export async function adminCreateAuthor(
  data: CreateAuthorInput,
  token: string | null
) {
  const res = await fetch(`${API_BASE_URL}/author/create`, {
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
export async function adminUpdateAuthor(
  id: string,
  data: UpdateAuthorInput,
  token: string | null
) {
  const hasFile = !!data.avatarFile;
  let body: BodyInit;
  let headers = authHeaders(token);

  if (hasFile) {
    // multipart sólo si hay archivo
    body = buildAuthorFormData(data);
    // no seteamos Content-Type, el browser lo hace
  } else {
    // JSON cuando no hay archivo
    headers = { ...headers, "Content-Type": "application/json" };
    body = JSON.stringify({
      name: data.fullName,
      biography: data.biography,
    });
  }
  const res = await fetch(`${API_BASE_URL}/author/${id}`, {
    method: "PUT",
    headers,
    body,
    credentials: "include",
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || "No se pudo actualizar el autor");
  return json;
}

// Eliminar autor (DELETE /author/:id)
export async function adminDeleteAuthor(id: string, token: string | null) {
  const res = await fetch(`${API_BASE_URL}/author/${id}`, {
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
  const res = await fetch(`${API_BASE_URL}/author/${id}`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || "No se pudo obtener el autor");
  return json?.result ?? json;
}

// trae todos los autores
export async function searchAuthors(token: string | null) {
  const res = await fetch(`${API_BASE_URL}/AllAuthores`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || "No se pudo buscar autores");

  // ADAPTAR a la forma { msg, result: [...] }
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.result)) return json.result;
  if (Array.isArray(json?.authors)) return json.authors;
  return [];
}
