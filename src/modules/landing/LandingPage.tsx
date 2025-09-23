import { useEffect } from "react";
import Navbar from "../../common/components/navbar";
import Herolanding from "../../common/components/Herolanding";
import Footer from "../../common/components/Footer";
import {
  FaBookOpen,
  FaMobileAlt,
  FaUsers,
  FaStar,
  FaRobot,
} from "react-icons/fa";
import { FaFaceSmile } from "react-icons/fa6";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../context/AuthContext";
import LoadingGate from "../../common/components/LoadingGate";

export default function LandingPage() {
  // cuando hay token, redirigir al /home
  const { user, loading } = useAuth();
  const [location, setLocation] = useLocation();

  // si ya hay usuario redirigir a la página de inicio
  useEffect(() => {
    if (!loading && user && location === "/") {
      setLocation("/home");
    }
  }, [loading, user, location, setLocation]);

  if (loading) return <LoadingGate message="Espere un momento…" />;

  return (
    <div className="w-full overflow-hidden flex justify-center flex-col">
      <div>
        <Navbar />
      </div>
      <div>
        <Herolanding />
      </div>
      {/* Seccion propuestas */}
      <div className="mt-24 px-6 mb-24 flex max-w-6xl mx-auto justify-center flex-col">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-primary mb-12">
          Tu próxima biblioteca favorita
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <li className="flex items-start gap-6">
            <FaBookOpen className="text-primary text-2xl hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="font-semibold text-lg">Antologías literarias</h3>
              <p className="text-gray-600 text-sm">
                Accedé a obras locales y recopilaciones de concursos
                provinciales.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-6">
            <FaMobileAlt className="text-primary text-2xl hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="font-semibold text-lg">Acceso multiplataforma</h3>
              <p className="text-gray-600 text-sm">
                Leé desde tu compu o tu celular, sin límites.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-6">
            <FaRobot className="text-primary text-2xl hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="font-semibold text-lg">
                Lecturas personalizadas con IA
              </h3>
              <p className="text-gray-600 text-sm">
                Disfrutá de recomendaciones inteligentes basadas en tus gustos.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-6">
            <FaFaceSmile className="text-primary text-2xl hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="font-semibold text-lg">Para todas las edades</h3>
              <p className="text-gray-600 text-sm">
                Libros pensados para cada etapa lectora.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-6">
            <FaStar className="text-primary text-2xl hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="font-semibold text-lg">Recompensas y progreso</h3>
              <p className="text-gray-600 text-sm">
                Desbloqueá logros mientras avanzás en tus lecturas.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-6">
            <FaUsers className="text-primary text-2xl hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="font-semibold text-lg">Comunidad lectora</h3>
              <p className="text-gray-600 text-sm">
                Conectá con otras personas que comparten tus intereses.
              </p>
            </div>
          </li>
        </ul>
      </div>
<<<<<<< HEAD
{/* Seccion Presentacion */}
      <div className=" flex flex-col md:flex-row items-center justify-center p-8 gap-8 max-w-6xl mx-auto rounded-xl">
=======

      {/* Seccion Presentacion */}
      <div className="bg-white flex flex-col md:flex-row items-center justify-center p-8 gap-8 max-w-6xl mx-auto rounded-xl">
>>>>>>> 0e84cd5a9065dfb5458b3f6ee88b82650a1f289c
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/hostImage/LOGO-VERTICAL.svg"
            className="w-72 h-auto drop-shadow-lg"
            alt="Ledi el zorro"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left self-center max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Tu biblioteca virtual Formoseña
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Tintas Formoseñas te presenta una biblioteca digital interactiva que
            conecta a lectores de todas las edades con antologías y contenidos
            locales. Aquí vas a encontrar obras literarias de autores y autoras
            formoseños/as, incluyendo las recopilaciones de los concursos
            "Letras del Viento Norte". Descubrí nuevas voces, leé en cualquier
            momento y formá parte de esta comunidad lectora.
          </p>
        </div>
      </div>
      {/* Nivel por edad  */}

      <div className=" flex justify-center align-middle items-center flex-col p-8  ">
        <h1 className="text-primary font-bold text-3xl text-center mb-12">
          ¡No te pierdas nuestras recomendaciones por Nivel!
        </h1>
        <div className="flex justify-center gap-18">
          <div className="card flex-row bg-base-100 shadow-lg w-50 h-20 overflow-hidden">
            <figure className="w-1/3 h-full">
              <img
                src="/landingImages/cartoon-child-girl-svgrepo-com.svg"
                className="bg-orange-400 w-full h-full object-cover"
              />
            </figure>
            <div className="card-body w-2/3 p-2">
              <h2 className="card-title">Inicial</h2>
              <p className="text-xs">0-10</p>
            </div>
          </div>
          <div className="card flex-row bg-base-100 shadow-lg w-50 h-20 overflow-hidden">
            <figure className="w-1/3 h-full">
              <img
                src="/landingImages/aunt-cartoon-family-svgrepo-com.svg"
                className="bg-orange-400 w-full h-full object-cover"
              />
            </figure>
            <div className="card-body w-2/3 p-2">
              <h2 className="card-title text-sm leading-tight">Secundaria</h2>
              <p className="text-xs">10-18</p>
            </div>
          </div>

          <div className="card flex-row bg-base-100 shadow-lg w-50 h-20 overflow-hidden">
            <figure className="w-1/3 h-full">
              <img
                src="/landingImages/family-female-mom-svgrepo-com.svg"
                className="bg-orange-400 w-full h-full object-contain"
              />
            </figure>
            <div className="card-body w-2/3 p-2">
              <h2 className="card-title text-sm leading-tight">Adulto joven</h2>
              <p className="text-xs">18-60</p>
            </div>
          </div>

          <div className="card flex-row bg-base-100 shadow-lg w-50 h-20 overflow-hidden">
            <figure className="w-1/3 h-full">
              <img
                src="/landingImages/family-grandfather-grandpa-svgrepo-com.svg"
                className="bg-orange-400 w-full h-full object-cover"
              />
            </figure>
            <div className="card-body w-2/3 p-2">
              <h2 className="card-title text-sm leading-tight">Adulto Mayor</h2>
              <p className="text-xs">60-100</p>
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
<div className="card flex-row bg-base-100 shadow-lg w-50 h-20 overflow-hidden">
    <figure className="w-1/3 h-full">
      <img src="/landingImages/family-grandfather-grandpa-svgrepo-com.svg" className="bg-orange-400 w-full h-full object-cover" />
    </figure>
    <div className="card-body w-2/3 p-2">
      <h2 className="card-title text-sm leading-tight">Adulto Mayor</h2>
      <p className="text-xs">60-100</p>
    </div>
  </div>
</div>
{/* Seccion FInal - Seccion web */}
<div className=" flex flex-col md:flex-row-reverse items-center justify-center p-8 gap-8 max-w-6xl mx-auto rounded-xl mt-16">
<div className='flex justify-center w-100 gap-4'>
<div>
    <img alt="wallpaper" src="/landingImages/12.png"/> 
</div>
<div >
    <img alt="wallpaper" src="/landingImages/123.png"/>
</div>
</div>
=======
      {/* Seccion FInal - Seccion web */}
      <div className="bg-white flex flex-col md:flex-row-reverse items-center justify-center p-8 gap-8 max-w-6xl mx-auto rounded-xl mt-16">
        <div className="flex justify-center w-100 gap-4">
          <div>
            <img alt="wallpaper" src="/landingImages/12.png" />
          </div>
          <div>
            <img alt="wallpaper" src="/landingImages/123.png" />
          </div>
        </div>
>>>>>>> 0e84cd5a9065dfb5458b3f6ee88b82650a1f289c
        <div className="md:w-1/2 text-center md:text-left justify-center flex  flex-col self-center max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Tu biblioteca virtual de bolsillo
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Accedé a Tintas desde cualquier lugar con tu celular. Leé
            cómodamente desde la app o el navegador, guardá tus libros favoritos
            y seguí tu progreso en tiempo real. ¡La lectura ahora te acompaña a
            donde vayas!
          </p>
        </div>
 </div>
      <div className=" flex flex-col md:flex-row items-center justify-center p-8 gap-8 max-w-6xl mx-auto rounded-xl">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/landingImages/QR_code_for_mobile_English_Wikipedia.svg.png"
            className="w-72 h-auto drop-shadow-lg"
            alt="visitanos en PlayStore"
          />
        </div>
        <div className="md:w-1/2   flex flex-col  md:text-left  max-w-xl">
          <h1 className="text-3xl mb-8 md:text-4xl font-semibold text-primary  ">
            ¡Descarga la aplicacion web!
          </h1>
          <div className="flex justify-center items-center align-middle">
            <img
              src="/landingImages/get-it-on-googleplay.png"
              className="cursor-pointer h-10 w-30"
              alt=""
            />
            <img
              src="/landingImages/applepay.png"
              className="cursor-pointer h-9 w-30"
              alt=""
            />
          </div>
        </div>
      </div>

    </div>
      {/* Last Call  */}
      <div className="relative bg-primary w-full overflow-hidden flex justify-center items-center flex-col py-20 mt-24">
        <h1 className="text-secondary text-2xl md:text-4xl font-bold text-center z-10">
          Unite a este mundo de Tintas Formoseñas
        </h1>
        <Link
          href="/register"
          className="mt-6  hover:shadow-2xl cursor-pointer text-primary font-semibold rounded-2xl px-6 py-3 hover:bg-secondary hover:text-white hover:shadow-black transition duration-300 ease-in-out z-10"
        >
          Empezar
        </Link>
      </div>
      <Footer />
    </div>
  );
}
