import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "wouter";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
