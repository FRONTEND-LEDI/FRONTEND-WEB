import Navbar from "../navbar";
import { GameHeader } from "./gameHeader";
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { createYourHistory } from "../../../db/services/games";
import { getBookById } from "../../../db/services/books";
import { useAuth } from "../../../context/AuthContext";
import Footer from "../Footer";

interface GameOption {
  textOption: string;
}

interface GameResponse {
  ecenary: string;
  options?: GameOption[];
  page: number;
  completed?: boolean;
}

export function CreatuHistoria() {
  const { bookId } = useParams();
  const [book, setBook] = useState<any>(null);
  const [scene, setScene] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  const { token } = useAuth();

  // Función para llamar a tu endpoint de IA
  const fetchScene = async (gamble?: any): Promise<GameResponse | null> => {
    if (!book) return null;
    if (!token) {
      setError("Debes iniciar sesión para jugar.");
      return null;
    }

    try {
      setLoading(true);
      setError(null); // Limpiar error previo
      const result = await createYourHistory(book._id, gamble, token);
      return result;
    } catch (err: any) {
      console.error("Error al generar escena:", err);
      setError(err.message || "Error desconocido al generar escena.");
      return null;
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
        setLoading(true);
        const b = await getBookById(bookId, token);
        setBook(b);
      } catch (err: any) {
        console.error("Error al cargar libro:", err);
        setError(err.message || "Error al cargar el libro.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId, token]);

  // Generar la primera escena cuando se carga el libro
  useEffect(() => {
    if (!book || !token) return;

    const initializeGame = async () => {
      const res = await fetchScene();
      if (res) {
        setScene(res.ecenary || "Escena generada...");
        setOptions(res.options?.map((o) => o.textOption) || []);
        setPage(res.page || 1);
        
        // Verificar si ya está completo desde el inicio
        if (res.completed) {
          setGameCompleted(true);
        }
      }
    };

    initializeGame();
  }, [book, token]);

  // Manejar la opción seleccionada
  const handleOptionClick = async (selectedOption: string) => {
    if (!book || !token || loading || gameCompleted) return;

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
        setGameCompleted(true);
        return;
      }

      setOptions(result.options?.map((o) => o.textOption) || []);
      setPage(result.page || page + 1);
    }
  };

  // Estados de carga y error
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0B0C1B] text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-xl mb-4">⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-600"
            >
              Reintentar
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0B0C1B] text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Cargando libro...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen  text-primary">
      <Navbar />
      <div style={{ cursor: `url("/game.png"), auto` }}>
        <div className="w-full mt-20">
          <GameHeader points={0} />
        </div>

        {/* Contenedor del juego */}
        <div className="max-w-3xl mb-20 font-mono mx-auto mt-8 border border-orange-500 rounded p-6 relative">
          {/* Header del libro */}
          <div className="bg-orange-500 text-black font-bold px-4 py-1 rounded flex justify-between items-center">
            <span>📖 {book.title}</span>
            <span>Escena {page}</span>
          </div>

          {/* Texto del juego */}
          <div className="border border-orange-500 rounded p-4 my-6 min-h-[200px] whitespace-pre-line">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                  <p className="text-gray-400">Generando escena...</p>
                </div>
              </div>
            ) : (
              <>
                {scene || "Escena generada..."}
                {gameCompleted && (
                  <div className="mt-6 text-center">
                    <p className="text-2xl text-orange-500 font-bold">
                      ✨ FIN DE LA HISTORIA ✨
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Opciones */}
          {!gameCompleted && (
            <div className="grid gap-3">
              {options.length > 0 ? (
                options.map((op, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(op)}
                    disabled={loading}
                    className={`border capitalize border-orange-500 rounded px-4 py-2 text-left hover:bg-orange-500 hover:text-black transition-colors ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    [{idx + 1}] {op.toUpperCase()}
                  </button>
                ))
              ) : (
                !loading && (
                  <p className="text-center text-gray-400">
                    No hay opciones disponibles
                  </p>
                )
              )}
            </div>
          )}

          {/* Footer indicativo */}
          {!gameCompleted && options.length > 0 && (
            <div className="text-xs text-gray-400 mt-4 text-center">
              Haz clic para elegir tu siguiente acción
            </div>
          )}

          {/* Botón para reiniciar si el juego terminó */}
          {gameCompleted && (
            <div className="mt-6 text-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-600 transition-colors"
              >
                🔄 Jugar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}