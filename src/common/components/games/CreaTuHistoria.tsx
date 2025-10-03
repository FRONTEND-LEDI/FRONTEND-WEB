import Navbar from "../navbar";
import { GameHeader } from "./gameHeader";
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { createYourHistory } from "../../../db/services/games";
import { getBookById } from "../../../db/services/books";
import { useAuth } from "../../../context/AuthContext";
import Footer from "../Footer";

export function CreatuHistoria() {
  const { bookId } = useParams();
  const [book, setBook] = useState<any>(null);
  const [scene, setScene] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  // Función para llamar a tu endpoint de IA
  const fetchScene = async (gamble?: any) => {
    if (!book) return;
    if (!token) {
      setError("Debes iniciar sesión para jugar.");
      return;
    }

    try {
      setLoading(true);
      const result = await createYourHistory(book._id, gamble, token);
      return result;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error desconocido al generar escena.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar el libro seleccionado
  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      if (!token) {
        setError("Debes iniciar sesión para cargar el libro.");
        return;
      }
      try {
        const b = await getBookById(bookId, token);
        setBook(b);
      } catch (err: any) {
        setError(err.message || "Error al cargar el libro.");
      }
    };
    fetchBook();
  }, [bookId, token]);

  // Generar la primera escena cuando se carga el libro
  useEffect(() => {
    if (!book || !token) return;

    fetchScene().then(res => {
      if (res) {
        setScene(res.ecenary || "Escena generada...");
        setOptions(res.options?.map((o: any) => o.textOption) || []);
        setPage(res.page || 1);
      }
    });
  }, [book, token]);

  // Manejar la opción seleccionada
  const handleOptionClick = async (selectedOption: string) => {
    if (!book || !token) return;

    const gamble = {
      title: book.title,
      ecenary: scene,
      page,
      option: selectedOption
    };

    const result = await fetchScene(gamble);

    if (result) {
      setScene(result.ecenary || "Escena generada...");

      // Verificar si la historia terminó
      if (result.completed) {
        setOptions([]);
        setScene(prev => prev + "\n\n✨ FIN DE LA HISTORIA ✨");
        return;
      }

      setOptions(result.options?.map((o: any) => o.textOption) || []);
      setPage(result.page || (prev => prev + 1));
    }
  };

  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;
  if (!book) return <p className="text-center text-gray-400 mt-20">Cargando libro...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0C1B] text-white">
      <Navbar />
      <div style={{ cursor: `url("/game.png"), auto` }}>
        <div className="w-full mt-20">
          <GameHeader points={0} />
        </div>

        {/* Contenedor del juego */}
        <div className="max-w-3xl mb-20 font-mono mx-auto mt-8 border border-orange-500 rounded p-6 relative">
          {/* Header del libro */}
          <div className="bg-orange-500 text-black font-bold px-4 py-1 rounded">
            📖 {book.title} <span className="float-right">Escena {page}</span>
          </div>

          {/* Texto del juego */}
          <div className="border border-orange-500 rounded p-4 mb-6 whitespace-pre-line">
            {loading ? "Generando escena..." : scene || "Escena generada..."}
          </div>

          {/* Opciones */}
          <div className="grid gap-3">
            {options.map((op, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(op)}
                disabled={loading}
                className={`border capitalize border-orange-500 rounded px-4 py-2 text-left hover:bg-orange-500 hover:text-black ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                [{idx + 1}] {op.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Footer indicativo */}
          <div className="text-xs text-gray-400  mt-4 text-center">
            Haz clic para elegir
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
