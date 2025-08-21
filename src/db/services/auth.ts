import { type FullUser } from "../../types/user";

const API_URL = "http://localhost:3402";
// Función para registrar un nuevo usuario
export const registerUser = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
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
    const response = await fetch(`${API_URL}/login`, {
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

export const getUserId = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/getUser`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-client": "web",
      },
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo obtener el del usuario");
    }

    console.log(" resultado de getUserId", result.user_data);
    return result.user_data;
  } catch (error) {
    console.error("Error en getUserId:", error);
    throw error;
  }
};

export const getOneUser = async(token: string): Promise<FullUser> => {
  try {
    const response = await fetch(`${API_URL}/oneUser`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-client": "web",
      },
      credentials: "include",
    }); 

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo obtener datos del usuario");
    }

    console.log(" resultado de getOneUser", result.result);
    return result.result as FullUser;
  } catch (error) {
    console.error("Error en getOneUser:", error);
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
