import { API_BASE_URL } from "../config";
import type {
  Avatar,
  CreateAvatarInput,
  UpdateAvatarInput,
} from "../../types/avatars";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = { "x-client": "web" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

// Helper: construir FormData
function buildAvatarFormData(
  data: CreateAvatarInput | UpdateAvatarInput
): FormData {
  const fd = new FormData();
  if ("avatars" in data && data.avatars) {
    fd.append("avatars", data.avatars);
  }
  if ("gender" in data && data.gender) {
    fd.append("gender", data.gender);
  }
  return fd;
}

// GET /getAvatars
export async function getAvatars(token: string | null): Promise<Avatar[]> {
  const res = await fetch(`${API_BASE_URL}/getAvatars`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw new Error("No se pudieron obtener los avatares");
  return await res.json();
}

// POST /saveAvatar
export async function adminCreateAvatar(
  payload: CreateAvatarInput,
  token: string | null
): Promise<{ msg: string }> {
  const res = await fetch(`${API_BASE_URL}/saveAvatar`, {
    method: "POST",
    headers: authHeaders(token),
    body: buildAvatarFormData(payload),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.msg || "Error al crear avatar");
  return data;
}

// PUT /updateAvatar/:id
export async function adminUpdateAvatar(
  id: string,
  payload: UpdateAvatarInput,
  token: string | null
): Promise<{ msg: string; avatar: Avatar }> {
  const res = await fetch(`${API_BASE_URL}/updateAvatar/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: buildAvatarFormData(payload),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.msg || "Error al actualizar avatar");
  return data;
}

// DELETE /deleteAvatar/:id
export async function adminDeleteAvatar(
  id: string,
  token: string | null
): Promise<{ msg: string }> {
  const res = await fetch(`${API_BASE_URL}/deleteAvatar/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.msg || "Error al eliminar avatar");
  return data;
}
