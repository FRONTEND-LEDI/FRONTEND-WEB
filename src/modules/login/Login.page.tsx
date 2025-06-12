import { useState } from "react";
import { Link, useLocation } from "wouter";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import useForm from "../../common/hooks/useForm";
import { loginUser } from "../../db/services/auth";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [, navigate] = useLocation(); // Para redirigir si login es exitoso

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

      setSuccess("Inicio de sesión exitoso");

      // 🔐 Por ahora solo mostramos el token en consola (más adelante irá al contexto)
      console.log("Token recibido:", response.token);
      console.log("Usuario:", response.user);

      // Redireccionar si todo salió bien
      navigate("/home");

      resetForm();
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-center">Iniciar sesión</h1>

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
          <Link href="/register" className="text-blue-600 hover:underline">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
