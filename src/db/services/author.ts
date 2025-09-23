
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
export const getBookbyAuthorId = async (id: string) => {
  try {
    // Tu token (puedes guardarlo en una variable o constante)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzc1ZTBjMjA1Y2I1NGI1NzdhNWFlNSIsInJvbCI6IlVzZXIiLCJpYXQiOjE3NTgzMTAzMTksImV4cCI6MTc1ODMxMzkxOX0.wOV8wv-FMJCDccumGb2jhZOnR_jHXh2uKQCAuZcoQwA";
    
    const response = await fetch(`http://localhost:3402/book/autor/${id}`, {  
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // ← Agregar esta línea
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo obtener el Libro del autor");
    }

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};
