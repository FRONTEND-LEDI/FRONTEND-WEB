import Navbar from '../../common/components/navbar';
import Herolanding from '../../common/components/Herolanding';
import Footer from '../../common/components/Footer';
import { FaBookOpen, FaMobileAlt, FaUsers, FaStar, FaRobot } from 'react-icons/fa';
import { FaFaceSmile } from 'react-icons/fa6';

export default function LandingPage() {
  return (
    <div className="w-full overflow-hidden flex justify-center flex-col">     
    <div>
      <Navbar />
    </div>
    <div>
      <Herolanding />
    </div>
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
                Accedé a obras locales y recopilaciones de concursos provinciales.
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
              <h3 className="font-semibold text-lg">Lecturas personalizadas con IA</h3>
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
      <div className="bg-white flex flex-col md:flex-row items-center justify-center p-8 gap-8 max-w-6xl mx-auto rounded-xl">
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="/zorro-login.png" className="w-72 h-auto drop-shadow-lg" alt="Ledi el zorro" />
        </div>
        <div className="md:w-1/2 text-center md:text-left self-center max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Tu biblioteca virtual Formoseña
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Tintas Formoseñas te presenta una biblioteca digital interactiva que conecta a lectores de todas las edades con antologías y contenidos locales. Aquí vas a encontrar obras literarias de autores y autoras formoseños/as, incluyendo las recopilaciones de los concursos "Letras del Viento Norte". Descubrí nuevas voces, leé en cualquier momento y formá parte de esta comunidad lectora.
          </p>
        </div>
      </div>
      <div className="bg-white flex flex-col md:flex-row-reverse items-center justify-center p-8 gap-8 max-w-6xl mx-auto rounded-xl mt-16">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/moviltest.png"
            alt="LeDi en móvil"
            className="w-72 h-auto drop-shadow-lg"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left self-center max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Tu biblioteca virtual de bolsillo
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Accedé a Tintas desde cualquier lugar con tu celular. Leé cómodamente desde la app o el navegador, guardá tus libros favoritos y seguí tu progreso en tiempo real. ¡La lectura ahora te acompaña a donde vayas!
          </p>
        </div>
      </div>
      <div className="relative bg-primary w-full overflow-hidden flex justify-center items-center flex-col py-20 mt-24">
        <h1 className="text-secondary text-2xl md:text-4xl font-bold text-center z-10">
          Unite a este mundo de Tintas Formoseñas
        </h1>
        <button className="mt-6 bg-white hover:shadow-2xl cursor-pointer text-primary font-semibold rounded-2xl px-6 py-3 hover:bg-secondary hover:text-white hover:shadow-black transition duration-300 ease-in-out z-10">
          Empezar
        </button>
      </div>

      <Footer />
    </div>
  );
}
