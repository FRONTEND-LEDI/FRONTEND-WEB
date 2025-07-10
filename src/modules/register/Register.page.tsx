import { useState } from "react";
import { useLocation } from "wouter";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import useForm from "../../common/hooks/useForm";

const RegisterPage = () => {
  // Estado de error y éxito
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  // Hook de formulario
  const { values, handleChange } = useForm({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
    birthDate: "", 
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas
    if (!values.name || !values.lastname || !values.username || !values.email || !values.password || !values.birthDate) {
      setError("Por favor completá todos los campos.");
      return;
    }

    if (values.username.length < 5) {
      setError("El nombre de usuario debe tener al menos 5 caracteres.");
      return;
    }

    if (values.password !== values.confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (values.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      setError("El correo electrónico no es válido.");
      return;
    }

    // guardo los datos en localStorage para después continuar con el registro
    const usuarioPendiente = {
      name: values.name,
      lastName: values.lastname,
      userName: values.username,
      birthDate: new Date(values.birthDate).toISOString(),
      email: values.email,
      password: values.password,
    };

    localStorage.setItem("registroPendiente", JSON.stringify(usuarioPendiente));

  //   try {
  //     const res = await registerUser(data);
  //     setSuccess("¡Cuenta creada con éxito!" + res.msg);
  //     resetForm();
  //     // Redirigir al login después de registrarse
  //     navigate("/login");
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (err: any) {
  //     setError(err.message || "Ocurrió un error al registrar.");
  //   }
  
  // redirigir al test
    setLocation("/test");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-fund">
      {/* columna izquierda con la imagen */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:justify-end lg:pr-2">
        <img src="/zorro-login.png" alt="Zorro registro" className="max-h-[90px] lg:max-h-[350px] w-auto object-contain" />
      </div>
      {/* columna derecha con el formulario */}
      <div className="w-full lg:m-6 lg:w-1/2 flex items-center justify-center p-4 lg:justify-start lg:pl-4">
        
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl text-primary font-bold text-center">Registremos tu cuenta</h1>

          {/* Mensaje de error si existe */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Campos del formulario */}
          <Input label="Nombre" name="name" value={values.name} onChange={handleChange} />
          <Input label="Apellido" name="lastname" value={values.lastname} onChange={handleChange} />
          <Input label="Nombre de usuario" name="username" value={values.username} onChange={handleChange} />
          <Input label="Correo electrónico" name="email" type="email" value={values.email} onChange={handleChange} />
          <Input label="Fecha de nacimiento" name="birthDate" type="date" value={values.birthDate} onChange={handleChange} />
          <Input label="Contraseña" name="password" type="password" value={values.password} onChange={handleChange} />
          <Input label="Confirmar contraseña" name="confirm" type="password" value={values.confirm} onChange={handleChange} />
          <Button type="submit">Continuar</Button>
          <p className="text-center text-sm">
            ¿Ya tenés cuenta?{" "}
            <a href="/login" className="text-primary font-bold hover:underline">
              Iniciar sesión
            </a>
          </p>
        </form>
      </div>
    </div>
    
  );
};

export default RegisterPage;
