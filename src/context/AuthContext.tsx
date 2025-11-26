import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getUserId, getOneUser, logoutUser } from "../db/services/auth";
import type { FullUser } from "../types/user";

type User = {
  id: string;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  rol?: string;
  avatar?: string | null;
  birthDate?: string;
  nivel?: string;
  level?: null | {
    _id?: string;
    level?: number;
    maxPoint?: number;
    level_string?: string;
    img?: {
      url_secura?: string;
    };
  };
  imgLevel?: string;
  point?: number;
  preference?: {
    category?: string[];
    format?: string[];
  };
};
type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (authToken: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

// Normalizador para que el front tenga un shape estable y cómodo
function normalizeUser(u: FullUser): User {
  const birth = typeof u.birthDate === "string" ? u.birthDate : undefined;

  // Maneja ambos casos: string directo o estructura anidada
  let avatarUrl: string | null = null;

  if (typeof u.avatar === "string") {
    avatarUrl = u.avatar;
  } else if (u.avatar && typeof u.avatar === "object") {
    // Caso antiguo: avatar es un objeto con avatars.url_secura
    avatarUrl =
      u.avatar.avatars?.url_secura &&
      typeof u.avatar.avatars.url_secura === "string"
        ? u.avatar.avatars.url_secura
        : null;
  }

  return {
    id: u._id,
    name: u.name,
    lastName: u.lastName,
    userName: u.userName,
    email: u.email,
    rol: u.rol,
    avatar: avatarUrl,
    birthDate: birth,
    nivel: u.nivel,
    level: u.level,
    point: u.point,
    preference: {
      category: u.preference?.category ?? [],
      format: u.preference?.format ?? [],
    },
  } as const;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Hidrata el usuario completo desde /oneUser usando el token
  const hydrateUser = async (authToken: string) => {
    setLoading(true);
    try {
      try {
        await getUserId(authToken);
      } catch {}
      const full = await getOneUser(authToken);
      const normalized = normalizeUser(full);
      setUser(normalized);
      setToken(authToken);
      localStorage.setItem("token", authToken);
    } finally {
      setLoading(false);
    }
  };

  // Login solo el token
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
      localStorage.removeItem("returnTo");
    }
  };

  // Restaurar sesión al cargar la app
  useEffect(() => {
    const tokenInStorage = localStorage.getItem("token");
    if (!tokenInStorage) {
      setLoading(false);
      return;
    }

    hydrateUser(tokenInStorage).catch((error) => {
      console.error("Error al restaurar la sesión:", error);
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, loading, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
