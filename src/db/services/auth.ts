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

export const getUserData = async (token: string) => {
  try {
    const response = await fetch("http://localhost:3402/getUser", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo obtener datos del usuario");
    }

    return result.user_data;
  } catch (error) {
    console.error("Error en getUserData:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch("http://localhost:3402/logout", {
      method: "POST",
      credentials: "include", // necesario para enviar las cookies
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al cerrar sesión");
    }

    return result;
  } catch (error) {
    console.error("Error en logoutUser:", error);
    throw error;
  }
};
