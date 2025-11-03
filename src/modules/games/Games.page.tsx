import Navbar from "../../common/components/navbar";
import { Link } from "wouter";
import Footer from '../../common/components/Footer';
import { IoGameControllerSharp } from "react-icons/io5";
import { FaTrophy, FaStar, FaCrown } from "react-icons/fa";

import { StarHalfIcon } from "lucide-react";

export function BiblioGames() {
  const featuredGames = [
    { 
      src: "", 
      alt: "Crea tu propia historia", 
      link: "/games/select-book/historia", 
      gameType: "historia",
      title: "Creá tu Historia",
      description: "Escribe tu propia aventura literaria eligiendo diferentes caminos",
      badge: "Popular",
      color: "orange",
      points: "+100 pts"
    },
    { 
      src: "", 
      alt: "Preguntados Biblioteca", 
      link: "/games/select-book/quiz",
      gameType: "preguntados",
      title: "Preguntados Literario",
      description: "Demuestra tu conocimiento sobre libros y autores",
      badge: "Nuevo",
      color: "green",
      points: "+150 pts"
    }
  ];

  const upcomingGames = [
    {
      title: "Memoria Literaria",
      description: "Encuentra las parejas de personajes y citas famosas",
      badge: "Próximamente",
      color: "orange",
      icon: "🧠"
    },
    {
      title: "Crucigrama Libro",
      description: "Completa el crucigrama con términos literarios",
      badge: "Próximamente", 
      color: "blue",
      icon: "📝"
    },
    {
      title: "Trivia Autores",
      description: "Adivina el autor basado en pistas y obras",
      badge: "Próximamente",
      color: "red",
      icon: "✍️"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-fund text-primary">
      <Navbar />
      
      <div style={{ cursor: `url("/game.png"), auto` }}>
       <main className="flex-1 max-w-7xl mx-auto p-4 pt-30 mb-10">
        
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="relative border-4 border-orange-500 rounded-2xl p-8  backdrop-blur-sm">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 px-6 py-1 rounded-full">
                <span className="text-black font-bold text-sm">🎮 ARCADE MODE</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-4  text-primary tracking-wider">
                BIBLIOTECA ARCADE
              </h1>
              
              <p className="text-center text-primary text-lg md:text-xl tracking-wide font-semibold mb-2">
                &gt; DONDE LOS LIBROS COBRAN VIDA &lt;
              </p>
              
              <div className="flex justify-center items-center gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span>JUEGOS GENERADOS CON IA</span>
                </div>
                <span className="text-orange-500">•</span>
                <div className="flex items-center gap-2">
                  <StarHalfIcon className="text-yellow-400" />
                  <span>GANÁ RECOMPENSAS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Games Section */}
          <section className="mb-20">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-500"></div>
              <h2 className="text-2xl font-bold text-orange-400 flex items-center gap-3">
              
                JUEGOS DESTACADOS
               
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-500"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {featuredGames.map((game, index) => (
                <Link key={index} to={game.link}>
                  <div className="group relative border-4 border-orange-500 rounded-2xl overflow-hidden  hover:border-yellow-400 transition-all duration-500 hover:shadow-[0_0_50px_rgba(249,115,22,0.4)] hover:-translate-y-3">
                    
                    {/* Points Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-black flex items-center gap-1">
                        <FaStar className="text-xs" />
                        {game.points}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        game.badge === "Nuevo" 
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/25"
                          : "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25"
                      }`}>
                        {game.badge}
                      </span>
                    </div>

                    {/* Game Image */}
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={game.src}
                        alt={game.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t "></div>
                    </div>

                    {/* Game Info */}
                    <div className="p-6 relative">
                      <div className="absolute -top-6 left-6 bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                        <IoGameControllerSharp className="text-xl text-black" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-orange-400 mb-3 mt-2">
                        {game.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {game.description}
                      </p>
                      
                      {/* Action Button */}
                      <div className="flex items-center justify-between bg-secondary  rounded-lg p-4 border border-primary group-hover:bg-secondary transition-colors">
                        <span className="text-primary font-semibold text-sm group-hover:tex-primary transition-colors">
                          CLICK PARA JUGAR →
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs">ONLINE</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0  via-transparent to-transparent"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/60 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Upcoming Games Section */}
          <section className="mb-20">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-500"></div>
              <h2 className="text-2xl font-bold text-orange-400 flex items-center gap-3">
                 PRÓXIMAMENTE EN TINTAS
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-500"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {upcomingGames.map((game, index) => (
                <div 
                  key={index}
                  className="group relative border-2 border-primary rounded-xl p-6  hover:border-orange-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                >
                  {/* Game Icon */}
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {game.icon}
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 rounded-full text-xs font-bold border-2 border-b-primary">
                      {game.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-3">
                    {game.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {game.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full border-primary border-2 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-orange-200 to-primary h-2 rounded-full transition-all duration-1000 group-hover:w-3/4"
                      style={{ width: '45%' }}
                    ></div>
                  </div>
                  
                  <span className="text-gray-500 text-xs">En desarrollo...</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto">
            <div className="relative border-4 border-yellow-500 rounded-2xl p-8  backdrop-blur-sm text-center overflow-hidden">
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
              </div>

              <FaTrophy className="text-6xl text-yellow-400 mx-auto mb-6 animate-bounce" />
              
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                ¡CONQUISTÁ LA BIBLIOTECA!
              </h3>
              
              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
                Completá desafíos, ganá puntos exclusivos y convertite en el lector legendario de la biblioteca arcade
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400">
                  <FaStar className="text-yellow-400" />
                  <span>GANA PUNTOS</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-400">
                  <FaCrown className="text-orange-400" />
                  <span>DESBLOQUEA LOGROS</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>APRENDE</span>
                </div>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
}