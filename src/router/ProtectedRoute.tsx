import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Redirect, useLocation } from "wouter";
import LoadingGate from "../common/components/LoadingGate";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const [location] = useLocation();

  // mientras valida no redirigir
  if (loading) return <LoadingGate message="Verificando sesión..." />;

  // si no hay usuario, recordar a dónde quería ir y mandarlo al /login
  if (!user) {
    localStorage.setItem("returnTo", location);
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
