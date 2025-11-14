"use client";
import { useState, useEffect } from "react";
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'wouter';

type Props = {
  userName?: string;
  onContinue?: () => void;
  illustrationUrl?: string;
};

export default function HomeHero({ illustrationUrl }: Props) {
  const { user } = useAuth();
  const userName = user?.name ?? "Lector/a";
  
  // Diálogos de la mascota
  const dialogs = [
    `Buenas buenas, ¿Como estas @${userName}? `,
    `¿Qué te gustaría hacer hoy?`,
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    if (currentIndex >= dialogs.length - 1) return;
  
    const timeout = setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setShow(true);
      }, 400);
    }, currentIndex === 0 ? 3000 : 2500);
  
    return () => clearTimeout(timeout);
  }, [currentIndex]);
  
  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 p-4 sm:p-6 md:p-8 lg:p-12 shadow-lg border border-orange-100">
      {/* Fondo con patrón */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ea580c' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
        {/* Contenido principal */}
        <div className="flex flex-col gap-4 sm:gap-6 max-w-3xl w-full lg:w-auto">
          {/* Título y descripción */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Bienvenido a <span className="text-primary">Tintas Formoseñas</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Descubrí nuevas lecturas o retomá donde te quedaste.
            </p>
          </div>

          {/* Bubble de diálogo */}
          <div className="relative flex flex-col gap-4 w-full">
            <div
              className={`bg-white shadow-2xl rounded-2xl sm:rounded-3xl px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 
                text-base sm:text-lg md:text-xl lg:text-2xl font-semibold w-full sm:max-w-lg relative
                border-2 sm:border-4 border-orange-200 transition-all duration-500 ease-out
                ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"}`}
            >
              <div className="text-gray-800 break-words">
                {dialogs[currentIndex]}
              </div>
              
              {/* Indicator dots */}
              <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4 justify-center sm:justify-start">
                {dialogs.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex 
                        ? "w-6 sm:w-8 bg-orange-500" 
                        : idx < currentIndex 
                        ? "w-1.5 sm:w-2 bg-orange-300"
                        : "w-1.5 sm:w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Pico del speech bubble - solo en desktop */}
            <div className="absolute -right-3 sm:-right-4 top-6 sm:top-8 w-0 h-0 
              border-t-[16px] sm:border-t-[20px] border-t-transparent
              border-l-[20px] sm:border-l-[25px] border-l-orange-200
              border-b-[16px] sm:border-b-[20px] border-b-transparent
              hidden lg:block">
            </div>
            <div className="absolute -right-2.5 sm:-right-3 top-6 sm:top-8 w-0 h-0 
              border-t-[14px] sm:border-t-[18px] border-t-transparent
              border-l-[18px] sm:border-l-[22px] border-l-white
              border-b-[14px] sm:border-b-[18px] border-b-transparent
              hidden lg:block">
            </div>
          </div>

          {/* Botones de acción */}
          <div className={`flex flex-wrap gap-2 sm:gap-3 transition-all duration-700 ${
            currentIndex >= dialogs.length - 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <Link 
              to="/Catalogo" 
              className="bg-orange-400 hover:bg-orange-500 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 
                rounded-lg sm:rounded-xl flex items-center justify-center gap-2 
                transition-all cursor-pointer duration-300 transform hover:scale-105 hover:shadow-lg 
                font-medium text-xs sm:text-sm md:text-base active:scale-95 flex-1 sm:flex-none min-w-[140px]"
            >
               Explorar catálogo
            </Link>
            
            <Link 
              to="/Perfil" 
              className="bg-orange-600 hover:bg-green-600 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 
                rounded-lg sm:rounded-xl flex items-center justify-center gap-2 
                transition-all cursor-pointer duration-300 transform hover:scale-105 hover:shadow-lg 
                font-medium text-xs sm:text-sm md:text-base active:scale-95 flex-1 sm:flex-none min-w-[140px]"
            >
               Seguir leyendo
            </Link>
            
            <Link
              to="/Bibliogames" 
              className="bg-yellow-400 hover:bg-yellow-600 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 
                rounded-lg sm:rounded-xl flex items-center justify-center gap-2 
                transition-all cursor-pointer duration-300 transform hover:scale-105 hover:shadow-lg 
                font-medium text-xs sm:text-sm md:text-base active:scale-95 flex-1 sm:flex-none min-w-[140px]"
            >
               BiblioGames
            </Link>
            
            <Link
              to="/Chat"
              className="bg-orange-700 hover:bg-purple-600 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 
                rounded-lg sm:rounded-xl flex items-center justify-center gap-2 
                transition-all cursor-pointer duration-300 transform hover:scale-105 hover:shadow-lg 
                font-medium text-xs sm:text-sm md:text-base active:scale-95 flex-1 sm:flex-none min-w-[140px]"
            >
               Recomendados
            </Link>
          </div>

          {/* Decoración */}
          <div className="mt-2 sm:mt-4 md:mt-6 flex items-center gap-2 sm:gap-3">
            <div className="h-0.5 sm:h-1 w-8 sm:w-12 bg-primary rounded-full" />
            <div className="h-0.5 sm:h-1 w-4 sm:w-6 bg-primary/60 rounded-full" />
            <div className="h-0.5 sm:h-1 w-2 sm:w-3 bg-primary/30 rounded-full" />
          </div>
        </div>
{illustrationUrl && (
  <img
    src={illustrationUrl || "/placeholder.svg"}
    alt="Mascota de la biblioteca"
    className="hidden md:block pointer-events-none 
      w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96
      object-contain opacity-90 drop-shadow-lg 
      mx-auto lg:mx-0
      lg:absolute lg:right-4 xl:right-10 lg:bottom-0 lg:top-0 lg:my-auto"
  />
)}
</div>

      {/* CSS para animación flotante */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @media (max-width: 1024px) {
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        }
      `}</style>
    </section>
  );
}