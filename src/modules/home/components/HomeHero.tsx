"use client";
import { useState, useEffect } from "react";
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'wouter';
type Props = {
  userName?: string;
  onContinue?: () => void;
  illustrationUrl?: string;
};

export default function HomeHero({  illustrationUrl }: Props) {
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
    <section className="relative   isolate overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 p-8 md:p-12 shadow-lg border border-orange-100">
      {/* fondo  */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ea580c' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "89px 60px",
        }}
      />

      <div className="relative flex flex-col gap-6 max-w-3xl">
       <div className="flex  flex-col gap-1">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Bienvenido a <span className="text-primary">Tintas Formoseñas</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
          Descubrí nuevas lecturas o retomá donde te quedaste.
        </p>
        </div>
       <div className="relative flex flex-col gap-4">

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
        <div className={`flex flex-wrap m-2 justify-center lg:justify-start gap-3 transition-all duration-700 ${
          currentIndex >= dialogs.length - 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <Link to="/Catalogo" className="bg-orange-400 hover:bg-orange-500 text-white px-5 py-3 rounded-xl flex items-center gap-2 
            transition-all cursor-pointer duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-sm md:text-base
            active:scale-95">
            <span className="text-lg">📚</span> Explorar catálogo
          </Link>
          <Link to="/Perfil" className="bg-orange-600 hover:bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 
            transition-all cursor-pointer duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-sm md:text-base
            active:scale-95">
            <span className="text-lg">📖</span> Seguir leyendo
          </Link>
          <Link
          to="/Bibliogames" className="bg-yellow-400 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 
            transition-all cursor-pointer duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-sm md:text-base
            active:scale-95">
            <span className="text-lg">🎮</span> BiblioGames
          </Link>
          <Link
          to="/Chat"
          className="bg-orange-700 hover:bg-purple-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 
            transition-all cursor-pointer duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-sm md:text-base
            active:scale-95">
            <span className="text-lg">⭐</span> Recomendados
          </Link>
        </div>
      </div>





        {/* decoracion */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-1 w-12 bg-primary rounded-full" />
          <div className="h-1 w-6 bg-primary/60 rounded-full" />
          <div className="h-1 w-3 bg-primary/30 rounded-full" />
        </div>
      

      {illustrationUrl && (
        <img
          src={illustrationUrl || "/placeholder.svg"}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-10 bottom-0 top-0 w-88 md:w-92 h-125 opacity-90 drop-shadow-lg"
        />
      )}
  
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
