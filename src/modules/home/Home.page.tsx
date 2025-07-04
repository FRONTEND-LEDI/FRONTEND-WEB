import { useAuth } from "../../context/AuthContext";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-fund text-center">
        <h1 className="text-3xl font-bold mb-4">¡Bienvenido a LeDi!</h1>
        <p>Hola Mundo, ¡Bienvenido a LeDi!</p>
        <p className="text-lg mb-6">ID de usuario: {user?.id}</p>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
