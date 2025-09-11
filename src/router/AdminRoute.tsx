import { type ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";
import LoadingGate from "../common/components/LoadingGate";

export default function AdminRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      localStorage.setItem("returnTo", window.location.pathname);
      navigate("/login");
      return;
    }
    if (user.rol !== "Admin") {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  if (loading) return <LoadingGate message="Cargando…" />;
  if (!user || user.rol !== "Admin") return null;

  return <>{children}</>;
}
