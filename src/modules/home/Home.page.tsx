import { useAuth } from "../../context/AuthContext";
import Navbar from "../../common/components/navbar";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fund text-center">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">¡Bienvenido a LeDi!</h1>
      <p className="text-lg mb-6">ID de usuario: {user?.id}</p>
    </div>
  );
};

export default HomePage;
