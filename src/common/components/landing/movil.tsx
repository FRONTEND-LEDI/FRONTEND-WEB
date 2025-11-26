
export default function Movil(){
   
  return (
    <>
      {/* Sección Móvil */}
      <div
        id="Movil"
        className="py-10 px-12 flex flex-col md:flex-col lg:flex-row"
      >
        <div className="w-full justify-center max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Contenido */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Tu biblioteca virtual de bolsillo
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Accedé a Tintas desde cualquier lugar con tu celular. Leé
                cómodamente desde la app o el navegador, guardá tus libros
                favoritos y seguí tu progreso en tiempo real.
                <br />
                ¡La lectura ahora te acompaña a donde vayas!
              </p>

              {/* Features */}
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
                  <span className="text-gray-700">
                    Pantalla adaptable a tu dispositivo
                  </span>
                </li>
              </ul>
            </div>

            {/* Screenshots */}
            <div className="order-1 md:order-2 flex justify-center gap-3">
              <img
                alt="App screenshot 1"
                className="w-40 md:w-52 lg:w-64 rounded-xl "
                src="/landingImages/2.jpg"
              />
              <img
                alt="App screenshot 2"
                className="w-40 md:w-52 lg:w-64 rounded-xl "
                src="/landingImages/1.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección Descarga */}
      <div
        id="Downland"
        className="flex flex-col md:flex-row items-center justify-center p-8 gap-8 max-w-6xl mx-auto rounded-xl"
      >
        {/* QR */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/landingImages/QR_code_for_mobile_English_Wikipedia.svg.png"
            className="w-72 h-auto drop-shadow-lg"
            alt="Visítanos en PlayStore"
          />
        </div>

        {/* Botones */}
        <div className="w-full md:w-1/2 flex flex-col max-w-xl text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-8">
            ¡Descargá la aplicación móvil!
          </h1>

          <div className="flex justify-center md:justify-start items-center gap-4">
            <img
              src="/landingImages/get-it-on-googleplay.png"
              className="cursor-pointer h-12"
              alt="Google Play"
            />

            <img
              src="/landingImages/applepay.png"
              className="cursor-pointer h-11"
              alt="App Store"
            />
          </div>
        </div>
      </div>
    </>
  );
}

