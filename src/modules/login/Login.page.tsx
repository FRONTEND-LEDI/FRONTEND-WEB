import { Link } from "wouter";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-center">Iniciar sesión</h1>

        {/* Campo de email */}
        <Input label="Correo electrónico" name="email" type="email" />

        {/* Campo de contraseña */}
        <Input label="Contraseña" name="password" type="password" />

        {/* Botón de enviar */}
        <Button type="submit">Ingresar</Button>

        {/* Enlace a registro con Wouter */}
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
