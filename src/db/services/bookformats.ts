export const getFormat = async () => {
  try {
    const response = await fetch("http://localhost:3402/booksFormats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudieron obtener los formatos");
    }

    return result;
  } catch (error) {
    console.error("Error en getFormat:", error);
    return []; // avita que se rompa todo si falla
  }
};