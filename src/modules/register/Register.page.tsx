import { useState } from "react";
import { Link } from "wouter";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import useForm from "../../common/hooks/useForm";
import { registerUser } from "../../db/services/auth";

const RegisterPage = () => {
  // Estado de error y éxito
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Hook de formulario
  const { values, handleChange, resetForm } = useForm({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
    birthDate: "", 
  });

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones básicas
    if (!values.name || !values.lastname || !values.username || !values.email || !values.password || !values.birthDate) {
      setError("Por favor completá todos los campos.");
      return;
    }

    if (values.password !== values.confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Datos que espera el backend
    const data = {
      name: values.name,
      lastName: values.lastname,
      userName: values.username,
      birthDate: new Date(values.birthDate).toISOString(),
      email: values.email,
      password: values.password,
    };


    try {
      const res = await registerUser(data);
      setSuccess("¡Cuenta creada con éxito!" + res.msg);
      resetForm();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al registrar.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-fund">
      {/* columna izquierda con la imagen */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <img src="/public/zorro-login.png" alt="Zorro registro" className="max-h-[90px] lg:max-h-[350px] w-auto object-contain" />
      </div>
      {/* columna derecha con el formulario */}
      <div className="w-full m-6 lg:w-1/2 flex items-center justify-center px-4">
        
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl text-primary font-bold text-center">Registrarse</h1>

          {/* Mensajes */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          {/* Campos del formulario */}
          <Input label="Nombre" name="name" value={values.name} onChange={handleChange} />
          <Input label="Apellido" name="lastname" value={values.lastname} onChange={handleChange} />
          <Input label="Nombre de usuario" name="username" value={values.username} onChange={handleChange} />
          <Input label="Correo electrónico" name="email" type="email" value={values.email} onChange={handleChange} />
          <Input label="Fecha de nacimiento" name="birthDate" type="date" value={values.birthDate} onChange={handleChange} />
          <Input label="Contraseña" name="password" type="password" value={values.password} onChange={handleChange} />
          <Input label="Confirmar contraseña" name="confirm" type="password" value={values.confirm} onChange={handleChange} />

          <Button type="submit">Crear cuenta</Button>

          <p className="text-center text-sm">
            ¿Ya tenés cuenta?{" "}
            <Link href="/" className="text-primary font-bold hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </form>
        
      </div>
    </div>
    
  );
};

export default RegisterPage;
