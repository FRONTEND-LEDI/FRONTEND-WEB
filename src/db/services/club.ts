const API_URL = "http://localhost:3402/"; // base de tu backend

// Obtener todos los foros
export async function getForos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener foros");
  return res.json();
}

// Obtener posts de un foro
export async function getPostsByForo(id: string) {
  const res = await fetch(`${API_URL}/${id}/posts`);
  if (!res.ok) throw new Error("Error al obtener posts");
  return res.json();
}

// Crear un nuevo post
export async function createPost(id: string, contenido: string) {
  const res = await fetch(`${API_URL}/${id}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contenido }),
  });
  if (!res.ok) throw new Error("Error al crear post");
  return res.json();
}
