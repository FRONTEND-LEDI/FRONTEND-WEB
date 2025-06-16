import { useAuth } from "../../context/AuthContext";
import Button from "../../common/components/Button";

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-4">¡Bienvenido a LeDi!</h1>
      <p className="text-lg mb-6">ID de usuario: {user?.id}</p>
      <Button onClick={logout}>Cerrar sesión</Button>
    </div>
  );
};

export default HomePage;
