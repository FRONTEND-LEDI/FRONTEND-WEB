import type { News } from "../../types/news";

const API_URL = "http://localhost:3402"

export async function getAllNews(token: string | null): Promise<News[]> {
  try {
    const res = await fetch(`${API_URL}/getAllNews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener las noticias");
    }

    const data = await res.json();
    return data as News[];

  } catch (error) {
    console.error(" Error en getAllNews:", error);
    throw error;
  }
}
