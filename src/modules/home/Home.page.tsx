import { useAuth } from "../../context/AuthContext";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto p-4 pt-23">
        <h1 className="text-3xl font-bold mb-4">¡Bienvenido a LeDi!</h1>
        <p>Hola Mundo, ¡Bienvenido a LeDi!</p>
        <p className="text-lg mb-6">ID de usuario: {user?.id}</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
