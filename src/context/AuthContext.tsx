import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getUserId, getOneUser, logoutUser } from "../db/services/auth";
import type { FullUser } from "../types/user";

type User = {
  id: string; // mapeado desde _id
  name: string;
  lastName: string;
  userName: string;
  email: string;
  rol?: string;
  avatar?: string | null;
  birthDate?: string; // normalizado a ISO string
  nivel?: string;
  preference?: {
    category?: string[];
    format?: string[];
  };
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (authToken: string) => Promise<void>; // <- ahora solo recibe token
  logout: () => void;
  refreshUser: () => Promise<void>; // <- por si querés refrescar datos
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

// Normalizador para que el front tenga un shape estable y cómodo
function normalizeUser(u: FullUser): User {
  // birthDate puede venir como {$date: "..."} o string
  const birth =
    typeof u.birthDate === "object" &&
    u.birthDate &&
    " $date" in (u.birthDate as any)
      ? (u.birthDate as any).$date
      : (u.birthDate as string | undefined);

  // avatar puede ser string (url), null o {$oid: "..."} (id)
  let avatar: string | null | undefined = null;
  if (typeof u.avatar === "string") avatar = u.avatar;
  else if (u.avatar && typeof u.avatar === "object" && "$oid" in u.avatar) {
    // si tenés una ruta para resolver la imagen por id, podés mapearla acá
    // p.ej: avatar = `https://res.cloudinary.com/.../${u.avatar.$oid}.jpg`
    avatar = null; // por ahora lo dejamos en null si es solo ObjectId
  }

  return {
    id: u._id,
    name: u.name,
    lastName: u.lastName,
    userName: u.userName,
    email: u.email,
    rol: u.rol,
    avatar,
    birthDate: birth ?? undefined,
    nivel: u.nivel,
    preference: {
      category: u.preference?.category,
      format: u.preference?.format,
    },
  };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Hidrata el usuario completo desde /oneUser usando el token
  const hydrateUser = async (authToken: string) => {
    // opcional: primero pegarle a /getUser para obtener/validar id
    try {
      await getUserId(authToken); // si no lo necesitás, podés omitir esta línea
    } catch {
      // si falla /getUser igual intentamos /oneUser; o podés cortar acá
    }

    const full = await getOneUser(authToken);
    const normalized = normalizeUser(full);
    setUser(normalized);
    setToken(authToken);
    localStorage.setItem("token", authToken);
  };

  // Login ahora recibe solo el token (del response de /login)
  const login = async (authToken: string) => {
    await hydrateUser(authToken);
  };

  const refreshUser = async () => {
    if (!token) return;
    const full = await getOneUser(token);
    setUser(normalizeUser(full));
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Error al cerrar sesión en backend:", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  // Restaurar sesión al cargar la app
  useEffect(() => {
    const tokenInStorage = localStorage.getItem("token");
    if (tokenInStorage && !user) {
      hydrateUser(tokenInStorage).catch((error) => {
        console.error("Error al restaurar la sesión:", error);
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
