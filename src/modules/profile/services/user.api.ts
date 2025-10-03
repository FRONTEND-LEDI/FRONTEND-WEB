const API_URL = "http://localhost:3402";

export type UpdateUserPayload = Partial<{
  name: string;
  lastName: string;
  userName: string;
  birthDate: string; // ISO
  email: string;
  password: string;
}>;

/** Quita undefined, null, "", NaN */
export function prune<T extends Record<string, any>>(obj: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    (out as any)[k] = v;
  }
  return out;
}

export function diffUserUpdate(
  initial: {
    name?: string;
    lastName?: string;
    userName?: string;
    birthDate?: string; // ISO full
    email?: string;
  },
  form: {
    name: string;
    lastName: string;
    userName: string;
    birthDate: string; // yyyy-mm-dd
    email: string;
    newPassword?: string;
  }
): UpdateUserPayload {
  const payload: UpdateUserPayload = {};

  const norm = (s?: string) => (s ?? "").trim();
  const same = (a?: string, b?: string) => norm(a) === norm(b);

  if (!same(initial.name, form.name)) payload.name = norm(form.name);
  if (!same(initial.lastName, form.lastName))
    payload.lastName = norm(form.lastName);
  if (!same(initial.userName, form.userName))
    payload.userName = norm(form.userName);
  if (!same(initial.email, form.email)) payload.email = norm(form.email);

  // birthDate: el initial viene ISO completo; el form viene yyyy-mm-dd
  const initialDate = initial.birthDate ? initial.birthDate.slice(0, 10) : "";
  if (!same(initialDate, form.birthDate) && form.birthDate) {
    payload.birthDate = new Date(form.birthDate).toISOString();
  }

  if (form.newPassword) payload.password = form.newPassword;

  return prune(payload);
}

export async function updateUser(token: string, data: UpdateUserPayload) {
  const body = prune<UpdateUserPayload>({
    name: data.name,
    lastName: data.lastName,
    userName: data.userName,
    birthDate: data.birthDate, // si no hay, se omite
    email: data.email,
    password: data.password, // si no hay, se omite
  });

  const res = await fetch(`${API_URL}/updateUser`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-client": "web",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok)
    throw new Error(json?.error || "No se pudo actualizar el usuario");
  return json;
}

export async function deleteUserAccount(token: string) {
  const res = await fetch(`${API_URL}/delete`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}`, "x-client": "web" },
    credentials: "include",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "No se pudo eliminar la cuenta");
  return json;
}
