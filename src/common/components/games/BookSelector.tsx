import { useParams } from "wouter";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import { getAllBooks, getNarrativeBooks } from "../../../db/services/books";
import type { Book } from "../../../types/books";
import { useAuth } from "../../../context/AuthContext"; // Importar el contexto de autenticación

export function BookSelector() {
  const { gameType } = useParams();
  const { token } = useAuth(); // Obtener el token del contexto
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        
        // Verificar si hay token
        if (!token) {
          setError("Debes iniciar sesión para ver los libros");
          setLoading(false);
          return;
        }
        
        let data: Book[];
        
    
        if (gameType === "quiz" || gameType === "historia") {
          data = await getNarrativeBooks(token);
        } else {
          data = await getAllBooks(token);
        }

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
        console.error("Error al cargar libros:", err);
        setError(err instanceof Error ? err.message : "Error al cargar libros");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [gameType, token]); // Agregar token como dependencia

  function getAuthorName(authors: any[]) {
    if (!authors || authors.length === 0) return "Autor desconocido";
    return authors.map((a) => (typeof a === "string" ? a : a.name)).join(", ");
  }

  function getGameTitle() {
    switch (gameType) {
      case "historia":
        return "Crear tu Historia";
      case "quiz":
        return "Preguntados";
      default:
        return "Juego";
    }
  }

  function getGameDescription() {
    switch (gameType) {
      case "historia":
        return "Elige cualquier libro para crear tu propia historia";
      case "quiz":
        return "Elige un libro narrativo para jugar al quiz";
      default:
        return "Selecciona un libro para jugar";
    }
  }

  return (
    <div className="min-h-screen bg-fund text-primary">
      <Navbar />
      <div style={{ cursor: `url("/game.png"), auto` }}>
        <main className="flex-1 max-w-7xl mx-auto p-4 pt-30 mb-10">
          <h2 className="text-3xl text-orange-400 mb-2 text-center">
            Elegí un libro para {getGameTitle()}
          </h2>
          
          <p className="text-gray-400 text-center mb-6">
            {getGameDescription()}
          </p>

          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando libros...</p>
            </div>
          )}

          {error && (
            <div className="text-center">
              <p className="text-red-400 mb-4">{error}</p>
              {!token && (
                <Link 
                  href="/login" 
                  className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          )}

          {!loading && !error && books.length === 0 && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {gameType === "quiz" 
                  ? "No hay libros narrativos disponibles" 
                  : "No hay libros disponibles"}
              </p>
              <Link 
                href="/games" 
                className="text-orange-400 hover:text-orange-300"
              >
                ← Volver a juegos
              </Link>
            </div>
          )}

          {!loading && !error && books.length > 0 && (
            <>
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {books.map((book) => (
                  <Link
                    key={book._id}
                    to={`/games/${gameType}/${book._id}`}
                    className="border-4 border-orange-500 rounded-xl overflow-hidden hover:bg-orange-500/20 transition-all group hover:scale-105 transform duration-300"
                  >
                    {book.bookCoverImage && (
                      <div className="w-full h-48 overflow-hidden bg-gray-800">
                        <img
                          src={typeof book.bookCoverImage === "string" 
                                ? book.bookCoverImage 
                                : book.bookCoverImage.url_secura || "/default-cover.png"}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-orange-400">{book.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{getAuthorName(book.author)}</p>
                      
                      {/* Mostrar género del libro */}
                      {book.genre && (
                        <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full border-2 border-blue-300 text-blue-300">
                          {book.genre}
                        </span>
                      )}
                      
                      {book.format && (
                        <span className="inline-block mt-2 ml-2 px-3 py-1 text-xs border-2 border-orange-300 rounded-full text-orange-300">
                          {book.format}
                        </span>
                      )}
                      
                      <p className="text-gray-600 mt-3 group-hover:text-white transition-colors">
                        Seleccionar para jugar
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Información adicional para quiz */}
              {gameType === "quiz" && (
                <div className="mt-8 text-center text-sm text-gray-400">
                  <p>💡 Solo se muestran libros del género Narrativo para el quiz</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}