import { useParams } from "wouter";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import { getAllBooks } from "../../../db/services/books";
import type { Book } from "../../../types/books";

export function BookSelector() {
  const { gameType } = useParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const token = null;
      const data = await getAllBooks(token);

      // Normalizo lo que venga de la API para que cumpla el tipo Book
      const normalized: Book[] = data.map((b: any) => ({
        ...b,
        author: Array.isArray(b.author)
          ? b.author.map((a: any) =>
              typeof a === "string" ? { _id: "", name: a } : a
            )
          : [],
        bookCoverImage:
          typeof b.bookCoverImage === "string"
            ? { url_secura: b.bookCoverImage }
            : b.bookCoverImage,
      }));

      setBooks(normalized);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar libros");
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, []);

function getAuthorName(authors: any[]) {
  if (!authors || authors.length === 0) return "Autor desconocido";
  return authors.map((a) => (typeof a === "string" ? a : a.name)).join(", ");
}

  return (
    <div className="p-8 min-h-screen bg-[#0a0e27] text-white">
      <Navbar />
      <div style={{ cursor: `url("/game.png"), auto` }}>
        <main className="max-w-5xl mx-auto font-mono mt-20">
          <h2 className="text-3xl text-orange-400 mb-6 text-center">
            Elegí un libro para {gameType === "historia" ? "Crear tu Historia" : "Preguntados"}
          </h2>

          {loading && (
            <p className="text-center text-gray-400">Cargando libros...</p>
          )}

          {error && (
            <p className="text-center text-red-400">{error}</p>
          )}

          {!loading && !error && books.length === 0 && (
            <p className="text-center text-gray-400">No hay libros disponibles</p>
          )}

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {books.map((book) => (
              <Link
                key={book._id}
                to={`/games/${gameType}/${book._id}`}
                className="border-4 border-orange-500 rounded-xl overflow-hidden hover:bg-orange-500/20 transition-all group"
              >
               {book.bookCoverImage && (
  <div className="w-full h-48 overflow-hidden bg-gray-800">
    <img
      src={typeof book.bookCoverImage === "string" 
             ? book.bookCoverImage 
             : book.bookCoverImage.url_secura || "/default-cover.png"}
      alt={book.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
    />
  </div>
)}

                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-orange-400">{book.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{getAuthorName(book.author)}</p>
                  {book.format && (
                    <span className="inline-block mt-2 px-3 py-1 text-xs bg-orange-500/30 rounded-full text-orange-300">
                      {book.format}
                    </span>
                  )}
                  <p className="text-gray-300 mt-3">Seleccionar para jugar</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}