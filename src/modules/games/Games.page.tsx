import Navbar from "../../common/components/navbar";
import { Link } from "wouter";
import Footer from '../../common/components/Footer';
import { IoGameControllerSharp } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa";

export function BiblioGames() {
  const games = [
    { 
      src: "/historiaCrea.png", 
      alt: "Crea tu propia historia", 
      link: "/games/select-book/historia", 
      gameType: "historia",
      title: "Creá tu Historia",
      description: "Escribe tu propia aventura literaria",
      badge: "Popular"
    },
    { 
      src: "/preguntados.png", 
      alt: "Preguntados Biblioteca", 
      link: "/games/select-book/preguntados",
      gameType: "preguntados",
      title: "Preguntados Literario",
      description: "Demuestra tu conocimiento",
      badge: "Muy Pronto"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a] min-h-screen flex flex-col text-white"
        >
      <Navbar />
<div  style={{
   cursor: `url("/game.png"), auto`

  }}>

 

      <main className="flex-1 pt-28 px-4 pb-16"
      style={{ fontFamily: '"Press Start 2P", "Courier New", monospace' }}>
        
        {/* Header Arcade */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative border-4 border-orange-500 rounded-xl p-6 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-3 text-gray-200 tracking-wider">
              ARCADE LITERARIO
            </h1>
            <p className="text-center text-orange-400 text-sm md:text-base tracking-wide">
              &gt; BIBLIOTECA VIRTUAL DE AVENTURAS &lt;
            </p>
          </div>
        </div>
        {/* Instrucciones */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="border-2 border-orange-400 bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-center gap-6 flex-wrap text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="text-orange-400">📚</span>
                <span className="text-gray-300">DESAFIA TU MEMORIA</span>
              </div>
              <span className="text-orange-500">|</span>
              <div className="flex items-center gap-2">
                <span className="text-orange-400">🎮</span>
                <span className="text-gray-300">CREA TU HISTORIA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Título sección juegos */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-orange-400">
          &gt; ELEGÍ TU JUEGO_
        </h2>

        {/* Grid de juegos */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.map((game, index) => (
            <Link 
              key={index} 
              to={game.link}
            >
              <div className="group relative border-4 border-orange-500 rounded-xl overflow-hidden bg-black/40 hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:-translate-y-2">
                
                {/* Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    game.badge === "Muy Pronto" 
                      ? "bg-green-500 text-black" 
                      : "bg-yellow-400 text-black"
                  }`}>
                    {game.badge}
                  </span>
                </div>

                {/* Imagen */}
                <div className="aspect-video overflow-hidden bg-gradient-to-br from-orange-900/20 to-purple-900/20">
                  <img
                    src={game.src}
                    alt={game.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-5 border-t-4 border-orange-500/50">
                  <h3 className="text-lg font-bold text-orange-400 mb-2">
                    {game.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {game.description}
                  </p>
                  
                  {/* Botón hover */}
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 text-sm group-hover:text-yellow-300">
                      PRESIONAR PARA JUGAR &gt;
                    </span>
                    <IoGameControllerSharp className="text-2xl text-orange-500 group-hover:text-yellow-400 transition-colors" />
                  </div>
                </div>

                {/* Efecto glow en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA para ganar puntos */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="border-4 border-yellow-500 rounded-xl p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-center shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <FaTrophy className="text-5xl text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-yellow-400">
              ¡GANÁ PUNTOS Y RECOMPENSAS!
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              Completá juegos y desbloqueá logros
            </p>
          </div>
        </div>

      </main>

      <Footer />
 </div>
    </div>
  )
}