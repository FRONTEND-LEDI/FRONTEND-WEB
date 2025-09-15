
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
