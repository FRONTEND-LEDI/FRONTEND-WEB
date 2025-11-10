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
<section id="Propuesta" className="py-20 px-4  ">
  <div className="max-w-6xl mx-auto">
    
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
        Tu próxima biblioteca favorita
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Todo lo que necesitás para disfrutar de la literatura formoseña
      </p>
    </div>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <li className="group  p-6  transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <FaBookOpen className="text-primary group-hover:text-white text-xl transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Antologías literarias
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Accedé a obras locales y recopilaciones de concursos provinciales
            </p>
          </div>
        </div>
      </li>
      <li className="group  p-6  transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <FaMobileAlt className="text-primary group-hover:text-white text-xl transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Acceso multiplataforma
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Leé desde tu compu o tu celular, sin límites
            </p>
          </div>
        </div>
      </li>
      <li className="group  p-6   transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <FaRobot className="text-primary group-hover:text-white text-xl transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Asistente con IA
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Recomendaciones inteligentes basadas en tus gustos
            </p>
          </div>
        </div>
      </li>
      <li className="group  p-6   transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <FaFaceSmile className="text-primary group-hover:text-white text-xl transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Para todas las edades
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Contenido organizado para cada etapa lectora
            </p>
          </div>
        </div>
      </li>
      <li className="group   p-6   transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <FaStar className="text-primary group-hover:text-white text-xl transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Logros y recompensas
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Desbloqueá insignias mientras avanzás en tus lecturas
            </p>
          </div>
        </div>
      </li>
      <li className="group  p-6  transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <FaUsers className="text-primary group-hover:text-white text-xl transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Comunidad lectora
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Conectá con personas que comparten tus intereses
            </p>
          </div>
        </div>
      </li>

    </ul>
  </div>
</section>
{/* Seccion Presentacion */}
     {/* Sección Nosotros - MEJORADO */}
<section id="Nosotros" className=" px-4 ">
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-2  items-center">
      <div className="flex justify-center md:justify-start">
        <img
          src="/hostImage/LOGO-VERTICAL.svg"
          className="w-80 h-auto drop-shadow-lg hover:scale-100 transition-transform duration-300"
          alt="Tintas Formoseñas - Logo"
        />
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
          Tu biblioteca virtual formoseña
        </h2>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
          Tintas Formoseñas te presenta una biblioteca digital interactiva que
          conecta a lectores de todas las edades con antologías y contenidos
          locales.
        </p>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
          Aquí vas a encontrar obras literarias de autores y autoras
          formoseños/as, incluyendo las recopilaciones de los concursos
          <span className="font-semibold text-primary"> "Letras del Viento Norte"</span>.
        </p> 
      </div>
    </div>
  </div>
</section>
      {/* Nivel por edad  */}
<div id="Niveles" className="py-20 px-4 bg-gradient-to-b">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-primary font-bold text-3xl md:text-4xl text-center mb-4">
      Encontrá lecturas para cada etapa
    </h2>
    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
      Contenido organizado por edad para que encuentres lo más adecuado
    </p>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="group flex flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="bg-orange-400 h-32 flex items-center justify-center p-4">
          <img
            src="/landingImages/cartoon-child-girl-svgrepo-com.svg"
            alt="Inicial"
            className="h-24 w-24 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">Inicial</h3>
          <p className="text-sm text-gray-500">3 a 10 años</p>
          <p className="text-xs text-gray-400 mt-2">Primeros lectores</p>
        </div>
      </div>
      <div className="group flex flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="bg-orange-400 h-32 flex items-center justify-center p-4">
          <img
            src="/landingImages/aunt-cartoon-family-svgrepo-com.svg"
            alt="Secundaria"
            className="h-24 w-24 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">Secundaria</h3>
          <p className="text-sm text-gray-500">11 a 17 años</p>
          <p className="text-xs text-gray-400 mt-2">Adolescentes</p>
        </div>
      </div>
      <div className="group flex flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="bg-orange-400 h-32 flex items-center justify-center p-4">
          <img
            src="/landingImages/family-female-mom-svgrepo-com.svg"
            alt="Adulto Joven"
            className="h-24 w-24 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">Adulto Joven</h3>
          <p className="text-sm text-gray-500">18 a 59 años</p>
          <p className="text-xs text-gray-400 mt-2">Adultos</p>
        </div>
      </div>
      <div className="group flex flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="bg-orange-400 h-32 flex items-center justify-center p-4">
          <img
            src="/landingImages/family-grandfather-grandpa-svgrepo-com.svg"
            alt="Adulto Mayor"
            className="h-24 w-24 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">Adulto Mayor</h3>
          <p className="text-sm text-gray-500">60+ años</p>
          <p className="text-xs text-gray-400 mt-2">Mayores</p>
        </div>
      </div>

    </div>
  </div>
</div>
<section className="w-full bg-primary py-20">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      
      {/* Columna Izquierda: Imagen */}
      <div className="relative">
        <img 
          src="/hostImage/avatarLanding.png" 
          alt="Aguaru, el bibliotecario virtual"
          className="w-full max-w-md mx-auto drop-shadow-2xl"
        />
        {/* Opcional: Elementos decorativos */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Columna Derecha: Contenido */}
      <div className="text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Interactuá con <span className="text-orange-100">Aguaru</span>,
          nuestro Bibliotecario Virtual
        </h2>
        
        <p className="text-xl text-orange-50 mb-8 leading-relaxed">
         Te da la bienvenida con un recorrido interactivo, responde tus dudas 
  en cualquier momento y aprende de tus gustos para recomendarte 
  lo que realmente te va a gustar. </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/register"
          className="
            bg-white text-orange-500 font-semibold
            px-8 py-3 rounded-full
            hover:bg-orange-50
            transition-colors duration-300
          ">
            Conocer a Aguaru
          </Link>
          
        </div>

        {/* Features opcionales */}
        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-sm text-orange-100">Disponible</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">IA</div>
            <div className="text-sm text-orange-100">Potenciado</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">∞</div>
            <div className="text-sm text-orange-100">Paciencia</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
{/* Seccion FInal - Seccion movil */}
<div className=" flex flex-col md:flex-row   p-2 gap-8 w-full mx-auto  mt-16">
{/* Seccion Móvil - MEJORADO */}
<div id="Movil" className="py-10 px-12 lg:flex-row  md:flex:col sm:flex-col">
  <div className="">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      
      {/* Contenido */}
      <div className="order-2 md:order-1">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Tu biblioteca virtual de bolsillo
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Accedé a Tintas desde cualquier lugar con tu celular. Leé
          cómodamente desde la app o el navegador, guardá tus libros favoritos
          y seguí tu progreso en tiempo real. ¡La lectura ahora te acompaña a
          donde vayas!
        </p>
        
        {/* Features móvil */}
        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-3">
            <span className="text-primary text-xl">✓</span>
            <span className="text-gray-700">Accede a todo el contenido</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-primary text-xl">✓</span>
            <span className="text-gray-700">Sincronización automática</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-primary text-xl">✓</span>
            <span className="text-gray-700">Pantalla adaptable a tu dispositivo</span>
          </li>
        </ul>
      </div>

      {/* Screenshots */}
      <div className="order-1 md:order-2 flex justify-center gap-2">
        <img 
          alt="App screenshot 1" 
          className="w-74 h-100" 
          src="/landingImages/2.jpg"
        /> 
        <img 
          alt="App screenshot 2" 
          className="w-70 h-100 " 
          src="/landingImages/1.jpg"
        />
      </div>

    </div>
  </div>
</div>
</div>

      <div id="Downland" className=" flex flex-col md:flex-row items-center justify-center p-8 gap-8 max-w-6xl mx-auto rounded-xl">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/landingImages/QR_code_for_mobile_English_Wikipedia.svg.png"
            className="w-72 h-auto drop-shadow-lg"
            alt="visitanos en PlayStore"
          />
        </div>
        <div className="md:w-1/2   flex flex-col  md:text-left  max-w-xl">
          <h1 className="text-3xl mb-8 md:text-4xl font-semibold text-primary  ">
            ¡Descarga la aplicacion Movil!
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

    
      {/* Last Call  */}

    <div  className="min-h-screen w-full bg-cover bg-center flex flex-col justify-start items-center p-14 gap-12 mb-0 mt-8"
  style={{ backgroundImage: `url('/ilustracion.png')` }}
>
      <h1 className="text-primary text-4xl md:text-4xl font-bold text-center z-10 ">
        Unite a este mundo de Tintas Formoseñas
      </h1>
<img src="./hostImage/LOGO-COLOR.svg" alt="" className="h-40 m-0 
bounce-hover" />
     <Link
      to="/register"
      className="
         relative flex items-center justify-center h-[50px] w-[200px] cursor-pointer overflow-hidden 
          rounded-[30px] border-2 border-primary bg-transparent
          text-primary transition-all duration-700 ease-in-out 
           hover:text-white hover:border-none
          after:content-[''] after:absolute after:left-0 after:top-0 
          after:h-full after:w-0 after:bg-primary
          after:transition-all after:duration-1500 after:ease-in-out
          hover:after:w-full
      "
    >
      <span className="z-[1] font-extrabold tracking-[1px]">Empezar</span>
    </Link>
    
    </div>
      <Footer />
    </div>
  );

}