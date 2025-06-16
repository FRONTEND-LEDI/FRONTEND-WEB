// Función para registrar un nuevo usuario
export const registerUser = async (data: any) => {
  try {
    const response = await fetch("http://localhost:3402/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Error al registrar usuario");
    }

    return result;
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
};

// Función para logearse
export const loginUser = async (data: any) => {
  try {
    const response = await fetch("http://localhost:3402/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client": "web",
      },
      body: JSON.stringify(data),
      credentials: "include", //para que el token venga como cookie
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Error al iniciar sesión");
    }

    return result;
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  }
};
