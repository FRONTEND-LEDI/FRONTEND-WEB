import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getUserData } from "../db/services/auth";

// Tipo del usuario que vamos a guardar
type User = {
  id: string;
  name: null;
  iat?: number;
  exp?: number;
  rol?: string; // por si después se recibe el rol
  avatar?:string
};

// Contexto
type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

// Crear el contexto con valores iniciales
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

// Proveedor de contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    // guardar en localStorage 
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // recuperar los datos del usuario con el token al iniciar la aplicación
  // si ya hay un token guardado en localStorage
  useEffect(() => {
    const tokenInStorage = localStorage.getItem("token");

    if (tokenInStorage && !user) {
      // Intentar recuperar datos del usuario
      console.log("Restaurando sesión con token:");
      
      getUserData(tokenInStorage)
        .then((userData) => {
          setUser(userData);
          setToken(tokenInStorage);
        })
        .catch((error) => {
          console.error("Error al restaurar la sesión:", error);
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
