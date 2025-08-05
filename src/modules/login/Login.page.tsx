import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import useForm from "../../common/hooks/useForm";
import { loginUser, getUserData } from "../../db/services/auth";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [location , navigate] = useLocation(); // Para redirigir si login es exitoso
  const { login: saveSession } = useAuth();
  const { user } = useAuth();

  // si ya hay usuario redirigir a la página de inicio
  useEffect(() => {
    if (user && (location ==="/login" || location === "/register")) {
      navigate("/home");
    }
  }, [user, location])

  // Hook para manejar campos de login
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  // Al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!values.email || !values.password) {
      setError("Por favor completá todos los campos.");
      return;
    }

    try {
      const response = await loginUser({
        email: values.email,
        password: values.password,
      });

      const token = response.token;
      console.log("Token recibido:", token);

      // obtener los datos del usuario con el token
      const userData = await getUserData(token);
      console.log("Datos del usuario:", userData);
      
      // guardar en el contexto
      saveSession(userData, token);
      
      setSuccess("Inicio de sesión exitoso");

      // Redireccionar si todo salió bien
      navigate("/home");
      resetForm();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      setError(err.message || "Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-fund">
      {/* columna izquierda con la imagen */ }
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:justify-end lg:pr-2">
        <img src="/zorro-login.png" alt="Zorro login" className="max-h-[90px] lg:max-h-[350px] w-auto object-contain" />
      </div>

      { /* columna derecha con el formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:justify-start lg:pl-4">
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl text-primary font-bold text-center">Iniciar sesión</h1>

          {/* Mensajes de feedback */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          {/* Campos */}
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

          <Button type="submit">Ingresar</Button>

          <p className="text-center text-sm">
            ¿No tenés cuenta?{" "}
            <Link href="/register" className="text-primary cursor-pointer font-bold hover:underline">
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
