import { useParams } from "wouter";
import { Link } from "wouter";
import Navbar from "../navbar";

export function BookSelector() {
  const { gameType } = useParams();

  const books = [
    { id: "libro1", title: "El Principito" },
    { id: "libro2", title: "Cien Años de Soledad" },
    { id: "libro3", title: "Harry Potter" },
  ];

  return (
    <div className="p-8 min-h-screen bg-[#0a0e27] text-white "  >
      <Navbar/>
      <div  style={{
   cursor: `url("/game.png"), auto`

  }}>
      <main className="max-w-5xl mx-auto font-mono mt-20">
      <h2 className="text-3xl text-orange-400 mb-6 text-center">
        Elegí un libro para {gameType === "historia" ? "Creár tu Historia" : "Preguntados"}
      </h2>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/games/${gameType}/${book.id}`}
            className="border-4 border-orange-500 rounded-xl p-6 text-center hover:bg-orange-500/20 transition-all"
          >
            <h3 className="text-xl font-bold text-orange-400">{book.title}</h3>
            <p className="text-gray-300 mt-2">Seleccionar para jugar</p>
          </Link>
        ))}
      </div>

      </main>
       </div>
    </div>
  );
}
