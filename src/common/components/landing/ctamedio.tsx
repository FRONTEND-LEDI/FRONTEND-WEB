import { Link } from "wouter";

export default function MiddleCall() {
  return (
    <section className="w-full py-8 px-6 bg-[#d97706]">
      <div className="w-full  mx-auto">
        <div className="relative ">
          
          {/* Patrón decorativo sutil */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center p-8 md:p-16">
            
            {/* Contenido de texto */}
            <div className="space-y-6">
              {/* Badge superior */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-white text-sm font-medium">Plataforma de lectura digital</span>
              </div>

              {/* Título principal */}
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Transformá tu experiencia de lectura
              </h2>

              {/* Descripción */}
              <p className="text-white/95 text-lg md:text-xl leading-relaxed">
                Descubrí una forma completamente nueva de conectar con la literatura formoseña. 
                Lee, juega y crece junto a una comunidad apasionada por las historias locales.
              </p>

              {/* Features rápidos */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Acceso ilimitado</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">100% gratuito</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Sin publicidad</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  to="/register"
                  className="
                    inline-flex items-center justify-center gap-2
                    px-8 py-4 rounded-xl
                    bg-white text-[#d97706] 
                    font-semibold text-lg
                    shadow-xl hover:shadow-2xl
                    transform hover:scale-105 hover:-translate-y-0.5
                    transition-all duration-300
                    group
                  "
                >
                  <span>Comenzar </span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              
            </div>

            {/* Imagen con efecto */}
            <div className="relative flex justify-center md:justify-end">
              {/* Efecto de brillo detrás */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 rounded-2xl blur-2xl"></div>
              
              {/* Contenedor de imagen */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl "></div>
                <div className="relative">
                  <img 
                    src="hostImage/catalogo.png" 
                    className="relative w-full max-w-[450px] rounded-2xl "
                    alt="Catálogo LeDi"
                  />
                  
                  {/* Badge flotante */}
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-5 py-3 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">📚</div>
                      <div>
                        <div className="text-[#d97706] font-bold text-sm">Catálogo completo</div>
                        <div className="text-gray-600 text-xs">Explorar ahora</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
