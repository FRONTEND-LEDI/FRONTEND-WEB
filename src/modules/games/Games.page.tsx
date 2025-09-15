import Navbar from "../../common/components/navbar";
import { Link } from "wouter";
import Footer from '../../common/components/Footer';

export function BiblioGames() {
  const games = [
    { src: "/historiaCrea.png", alt: "Crea tu propia historia", link: "/creatuPropiaHistoria" },
    { src: "/preguntados.png", alt: "Preguntados Biblioteca", link: "/preguntadosBiblioteca" }
  ];

  return (
    <div className="bg-fund min-h-screen flex flex-col">
      <Navbar />
<div  style={{
   cursor: `url("/game.png"), auto`

  }}>
      <div className="flex flex-col items-center mt-28 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">
          Elige tus juegos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
          {games.map((game, index) => (
          <Link key={index} to={game.link} className="w-full flex justify-center">
  <img
    src={game.src}
    style={{ cursor: 'url("/game.png") 16 16, auto' }}
    alt={game.alt}
    className="rounded-2xl w-52 h-full object-cover hover:shadow-2xl hover:shadow-gray-500 transition-shadow duration-500"
  />
</Link>

          ))}
        </div>
      </div>
</div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

