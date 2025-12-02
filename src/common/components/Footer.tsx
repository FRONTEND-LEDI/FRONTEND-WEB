export default function Footer() {
  return (
    <footer className="bg-primary text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* LOGO + DESCRIPCIÓN */}
          <div className="lg:col-span-5 space-y-4  justify-center items-center">
            <div className="flex  gap-3">
             
              <span className="text-3xl  p-2 justify-center items-center font-bold text-white drop-">
                Tintas Formoseñas
              </span>
            </div>

            <p className="text-lg text-orange-50  max-w-md leading-relaxed p-2 ">
              Descubrí la riqueza de la literatura local y conectá con historias que trascienden fronteras.
            </p>

            {/* LOGOS INSTITUCIONALES */}
            <div className=" space-y-2">
              <div className=" rounded-2xl  ">
                {/* Logo Gobierno */}
                <div className="flex">
                  <div className="  ">
                    <div className="h-22 flex  ">
                       <img src="/footer/gobierno.png" alt="" />
                    </div>
                  </div>
                </div>

                {/* Logos secundarios */}
                <div className="flex p-3  gap-28 flex-wrap">
                  <div className=" ">
                    <div className="h-14 w-14 flex  ">
                      <img src="/footer/ipf.png" alt="" />
                    </div>
                  </div>
                  <div className=" ">
                    <div className="h-14 w-14 flex  ">
                      <img src="/footer/alver.png" alt="" />
                    </div>
                  </div>
                  <div className=" ">
                    <div className="h-14 w-14 flex  ">
                       <img src="/footer/ispaf.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EXPLORAR */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="font-bold text-white text-xl mb-6 pb-2 ">
              Explorar
            </h3>
            <ul className="space-y-3 ">
              <li>
                <a 
                  href="/catalogo" 
                  className="text-orange-50 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  → Catálogo
                </a>
              </li>
              <li>
                <a 
                  href="/autores" 
                  className="text-orange-50 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  → Autores
                </a>
              </li>
              <li>
                <a 
                  href="/club-lectura" 
                  className="text-orange-50 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  → Club de Lectura
                </a>
              </li>
              <li>
                <a 
                  href="/BiblioGames" 
                  className="text-orange-50 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  → BiblioGames
                </a>
              </li>
              <li>
                <a 
                  href="/profile" 
                  className="text-orange-50 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  → Perfil
                </a>
              </li>
            </ul>
          </div>

          {/* SOPORTE */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-white text-xl mb-6 pb-2 ">
              Soporte
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <a 
                  href="/ayuda" 
                  className="text-orange-50 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  → Ayuda
                </a>
              </li>
              <li>
                <a 
                  href="/contacto" 
                  className="text-orange-50 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  → Contacto
                </a>
              </li>
              <li>
                <a 
                  href="/privacidad" 
                  className="text-orange-50 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  → Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-orange-300/30 mt-14 pt-8 text-center">
          <p className="text-sm text-orange-100 tracking-wide font-light">
            © 2025 Tintas Formoseñas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}