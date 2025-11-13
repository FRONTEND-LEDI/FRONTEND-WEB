
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
    const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTAwYmFmN2E0Zjk3OWY0NzA5ZDMxNCIsInJvbCI6IkFkbWluIiwiaWF0IjoxNzYyNTM3MjcyLCJleHAiOjE3NjI2MjM2NzJ9.85WUCnQQk4MCXe8qrF3vEGVIpbdXsv2CExkaEsCVduk"
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
