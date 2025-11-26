import {
  FaBookOpen,
  FaMobileAlt,
  FaUsers,
  FaStar,
  FaRobot,
} from "react-icons/fa";
import { FaFaceSmile } from "react-icons/fa6";

export default function Propuestas(){ 
    return(
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
    )
}