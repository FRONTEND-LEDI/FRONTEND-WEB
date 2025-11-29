import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import useForm from "../../common/hooks/useForm";
import { loginUser } from "../../db/services/auth";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import LoadingGate from "../../common/components/LoadingGate";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [location, navigate] = useLocation();

  const { login: saveSession, user, loading } = useAuth();

  // si ya hay usuario y NO estamos cargando, mandá a /home
  useEffect(() => {
    if (
      !loading &&
      user &&
      (location === "/login" || location === "/register")
    ) {
      // si venía de una ruta protegida específica, respetar eso (salvo admin area)
      const returnTo = localStorage.getItem("returnTo");

      if (user.rol === "admin") {
        // si había returnTo pero NO es del admin, ignoralo para no chocar mundos
        if (returnTo && returnTo.startsWith("/admin")) {
          localStorage.removeItem("returnTo");
          navigate(returnTo);
        } else {
          // Limpiar returnTo para próximos logouts
          localStorage.removeItem("returnTo");
          navigate("/admin");
        }
      } else {
        if (returnTo && !returnTo.startsWith("/admin")) {
          localStorage.removeItem("returnTo");
          navigate(returnTo);
        } else {
          // Limpiar returnTo para próximos logouts
          localStorage.removeItem("returnTo");
          navigate("/home");
        }
      }
    }
  }, [user, loading, location, navigate]);

  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!values.email || !values.password) {
      setError("Por favor completá todos los campos.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await loginUser({
        email: values.email,
        password: values.password,
      });

      const token = response.token as string;

      await saveSession(token);

      setSuccess("Inicio de sesión exitoso");
      toast.success("¡Bienvenido de nuevo a Tinta Nativa!");
      resetForm();

      // Limpiar returnTo después de usar lo (evita que se reutilice en próximos logouts)
      localStorage.removeItem("returnTo");

      // si venía de una ruta protegida, volver ahí
      const returnTo = localStorage.getItem("returnTo");
      if (returnTo) {
        navigate(returnTo);
      } else {
        navigate("/home");
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al iniciar sesión.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-fund relative">
      {submitting && <LoadingGate message="Ingresando…" />}

      {/* columna izquierda con la imagen */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:justify-end lg:pr-20">
        <img
          src="/hostImage/avatarLanding.png"
          alt="Zorro login"
          className="max-h-[90px] lg:max-h-[350px] w-auto object-contain"
        />
      </div>

      {/* columna derecha con el formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:justify-start lg:pl-4">
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl text-primary font-bold text-center">
            Iniciar sesión
          </h1>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />

          <Button type="submit" disabled={submitting}>
            {submitting ? "Ingresando..." : "Ingresar"}
          </Button>

          <p className="text-center text-sm">
            ¿No tenés cuenta?{" "}
            <Link
              href="/register"
              className="text-primary cursor-pointer font-bold hover:underline"
            >
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
