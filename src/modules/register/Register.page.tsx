import { Link } from "react-router-dom";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-center">Registrarse</h1>
        <Input label="Correo electrónico" name="email" type="email" />
        <Input label="Contraseña" name="password" type="password" />
        <Input label="Confirmar contraseña" name="confirm" type="password" />
        <Button type="submit">Crear cuenta</Button>
        <p className="text-center text-sm">
          ¿Ya tenés cuenta?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
