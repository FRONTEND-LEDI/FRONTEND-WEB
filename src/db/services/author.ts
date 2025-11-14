
export const getAuthors = async () => {
  try {
    const response = await fetch("http://localhost:3402/AllAuthores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudieron obtener los Autores");
    }

    return result;
  } catch (error) {
    console.error( error);
    return [];
  }
};
export const getAuthorsbyId = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3402/author/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo obtener el  Autor");
    }

    return result;
  } catch (error) {
    console.error( error);
    return [];
  }
};
export const getBookbyAuthorId = async (id: string, token?: string) => {
  try {
    if (!token) throw new Error("Token de autenticación requerido");

    const response = await fetch(`http://localhost:3402/book/autor/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo obtener el libro del autor");
    }

    return result;
  } catch (error) {
    console.error("Error en getBookbyAuthorId:", error);
    return [];
  }
};

