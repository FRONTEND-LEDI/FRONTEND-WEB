import { Link } from "wouter"
export default function Aguaru(){
    return(
        <section className="w-full bg-primary ">
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
        
                
              </div>
        
            </div>
          </div>
        </section>
    )
}