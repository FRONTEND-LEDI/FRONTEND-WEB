import type { Foro } from "../../types/forum";

const API_BASE_URL = "http://localhost:3402";

export const getForosApi = async (): Promise<Foro[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/foros`);

    if (!res.ok) {
      console.error("Error al obtener foros:", res.status, res.statusText);
      throw new Error("Error en el servidor de foros");
    }

    const data: Foro[] = await res.json();
    return data;
  } catch (err) {
    console.error("Error en getForosApi:", err);
    return [];
  }
};
