"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Hero() {
  const { user } = useAuth();
  const userName = user?.name ?? "Lector/a";

  // Diálogos de la mascota
  const dialogs = [
    `¡Hola! Soy Tinta, tu guía en esta biblio 📚`,
    `Buenas buenas, @${userName} 🎉`,
    `¿Qué te gustaría hacer hoy?`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (currentIndex >= dialogs.length - 1) return; // detener cuando llega al último

    const timeout = setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setShow(true);
      }, 400);
    }, currentIndex === 0 ? 3000 : 2500); // primer mensaje dura más

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between min-h-[70vh] lg:h-[75vh] px-6 md:px-12 lg:px-20 py-12 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      
      {/* Decoración de fondo - puntos sutiles */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" 
           style={{
             backgroundImage: `radial-gradient(circle, #f97316 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Contenido conversacional - PRIMERO EN MOBILE */}
      <div className="relative z-10 lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 mb-8 lg:mb-0 order-2 lg:order-1">
        
        {/* Speech bubble con efecto de escritura */}
        <div className="relative">
          <div
            className={`bg-white shadow-2xl rounded-3xl px-8 py-6 text-xl md:text-2xl font-semibold max-w-lg relative
              border-4 border-orange-200 transition-all duration-500 ease-out
              ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"}`}
          >
            <div className="text-gray-800">
              {dialogs[currentIndex]}
            </div>
            {/* Indicator dots */}
            <div className="flex gap-2 mt-4 justify-center lg:justify-start">
              {dialogs.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? "w-8 bg-orange-500" 
                      : idx < currentIndex 
                      ? "w-2 bg-orange-300"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Pico del speech bubble */}
          <div className="absolute -right-4 top-8 w-0 h-0 
            border-t-[20px] border-t-transparent
            border-l-[25px] border-l-orange-200
            border-b-[20px] border-b-transparent
            hidden lg:block">
          </div>
          <div className="absolute -right-3 top-8 w-0 h-0 
            border-t-[18px] border-t-transparent
            border-l-[22px] border-l-white
            border-b-[18px] border-b-transparent
            hidden lg:block">
          </div>
        </div>

        {/* Botones de acción - aparecen cuando termina la animación */}
        <div className={`flex flex-wrap justify-center lg:justify-start gap-3 transition-all duration-700 ${
          currentIndex >= dialogs.length - 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 
            transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-sm md:text-base
            active:scale-95">
            <span className="text-lg">📚</span> Explorar catálogo
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 
            transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-sm md:text-base
            active:scale-95">
            <span className="text-lg">📖</span> Seguir leyendo
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 
            transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-sm md:text-base
            active:scale-95">
            <span className="text-lg">🎮</span> BiblioGames
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 
            transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-sm md:text-base
            active:scale-95">
            <span className="text-lg">⭐</span> Recomendados
          </button>
        </div>
      </div>

      {/* Mascota - MÁS GRANDE */}
      <div className="relative z-10 lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
        <div className="relative">
          <img
            src="/hostImage/LOGO-COLOR.svg"
            alt="Mascota Tinta"
            className="w-72 md:w-96 lg:w-[450px] xl:w-[500px] 
              drop-shadow-2xl
              animate-float"
          />
          {/* Sombra decorativa */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-orange-300/30 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* CSS para animación flotante */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}