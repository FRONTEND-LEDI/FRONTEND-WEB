import Navbar from "../navbar";
import { GameHeader } from "./gameHeader";
import { useState, useEffect, useRef } from "react";
import { useParams } from "wouter";
import { createYourHistory } from "../../../db/services/games";
import { getBookById } from "../../../db/services/books";
import { useAuth } from "../../../context/AuthContext";
import { RefreshCcw, Lightbulb, TriangleAlert } from 'lucide-react';
import Footer from "../Footer";

interface GameOption {
  textOption: string;
}

interface GameResponse {
  _id?: string;
  title: string;
  scenery: string;
  options?: GameOption[];
  page?: number;
  chosenOptions?: GameOption[];
  completed?: boolean;
  score?: number;
}

export function CreatuHistoria() {
  const { token } = useAuth();
  const { bookId } = useParams();
  const [book, setBook] = useState<any>(null);
  const [scene, setScene] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showTextComplete, setShowTextComplete] = useState<boolean>(false);
  const [animatingOptions, setAnimatingOptions] = useState<boolean>(false);
  const [visibleOptions, setVisibleOptions] = useState<string[]>([]);
  
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTypingInterval = () => {
    if(typingIntervalRef.current){
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }

  // Efecto de escritura tipo máquina de escribir
  useEffect(() => {
    if (!scene || gameCompleted) {
      setDisplayedText(scene);
      setShowTextComplete(true);
      setTimeout(() => {
        setShowOptions(true);
        setIsTyping(false);
      }, 300);
      return;
    }
    
    if (displayedText === scene && !isTyping){
      return;
    }

    setIsTyping(true);
    setShowTextComplete(false);
    setShowOptions(false);
    setDisplayedText("");
    
    let currentIndex = 0;
    const typingSpeed = 30;
    
    clearTypingInterval();

    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < scene.length) {
        setDisplayedText(scene.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        setShowTextComplete(true);
        setTimeout(() => {
          setAnimatingOptions(true);
          setVisibleOptions(options);
          setShowOptions(true);
        }, 500);
        clearTypingInterval();
      }
    }, typingSpeed);

    return () => {
      clearTypingInterval();
    };
  }, [scene, gameCompleted, options]);

  const fetchScene = async (gamble?: { option?: string }): Promise<GameResponse | null> => {
    if (!book || !token) return null;

    try {
      setLoading(true);
      setError(null);
      const result = await createYourHistory(
        book._id,
        {
          title: book.title,
          scenery: scene,
          page,
          option: gamble?.option,
        },
        token
      );

      return result;
    } catch (err: any) {
      console.error("Error al generar escena:", err);
      setError(err.message || "Error desconocido al generar escena.");
      return null;
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (!book || !token) return;

    const initializeGame = async () => {
      const res = await fetchScene();
      if (res) {
        setScene(res.scenery || "Escena generada...");
        setOptions(res.options?.map((o) => o.textOption) || []);
        setPage(res.page || 1);

        if (res.completed) {
          setGameCompleted(true);
          if (res.score !== undefined) {
            setFinalScore(res.score);
          }
        }
      }
    };

    initializeGame();
  }, [book, token]);

  const handleOptionClick = async (selectedOption: string) => {
    if (!book || !token || loading || gameCompleted || isTyping) return;

    const result = await fetchScene({ option: selectedOption });

    if (result) {
      setScene(result.scenery || "Escena generada...");

      if (result.score !== undefined) {
        setFinalScore(result.score);
        setGameCompleted(true);
      } else if (!result.options || result.options.length === 0) {
        setGameCompleted(true);
      } else {
        setOptions(result.options.map((o) => o.textOption));
        setPage(result.page || page + 1);
      }
    }
  };

  const skipTyping = () => {
    if (isTyping) {
      clearTypingInterval();
      setDisplayedText(scene);
      setIsTyping(false);
      setShowTextComplete(true);
      setTimeout(() => {
        setAnimatingOptions(true);
        setVisibleOptions(options);
        setShowOptions(true);
      }, 300);
    }
  };

  useEffect(() => {
    if (showOptions && options.length > 0 && !animatingOptions) {
      setVisibleOptions([]);
      setTimeout(() => {
        setAnimatingOptions(true);
        setVisibleOptions(options);
      }, 100);
    }
  }, [options, showOptions, animatingOptions]);

  useEffect(() => {
    return () => {
      clearTypingInterval();
    };
  }, []);

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-fund">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">  <TriangleAlert /></span>
            </div>
            <p className="text-red-600 text-xl mb-6 font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg"
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
      <div className="flex flex-col min-h-screen bg-fund">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600 text-lg font-medium">Cargando libro...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-fund to-orange-50">
      <Navbar />
      
      <GameHeader points={finalScore} bookTitle={book.title} />

      <div className="flex-1 px-4 pb-8 pt-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Área de texto estilo visual novel */}
            <div 
              className="relative bg-gradient-to-br from-gray-50 to-orange-50 p-8 min-h-[200px] cursor-pointer"
              onClick={skipTyping}
            >
              {/* Decoración de esquinas */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-orange-400 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-orange-400 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-orange-400 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-orange-400 rounded-br-lg"></div>

              <div className="relative z-10">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-[350px]">
                    <div className="relative w-20 h-20 mb-6">
                      <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-gray-600 text-lg font-medium animate-pulse">
                      Generando tu historia...
                    </p>
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
                      {displayedText}
                      {isTyping && (
                        <span className="inline-block w-2 h-5 bg-orange-500 ml-1 animate-pulse"></span>
                      )}
                    </div>
                    
                    {gameCompleted && (
                      <div className="mt-8 text-center">
                        <div className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl p-6 shadow-xl">
                          <p className="text-3xl font-bold text-white mb-2">
                           FIN DE LA HISTORIA
                          </p>
                          {finalScore > 0 && (
                            <p className="text-xl text-orange-100">
                              Puntaje final: <span className="font-bold text-white">{finalScore}</span> puntos
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Indicador "Preparando opciones" */}
              {showTextComplete && !animatingOptions && (
                <div className="flex justify-center mt-6">
                  <div className="bg-orange-100 border border-orange-200 rounded-full px-4 py-2 text-orange-600 text-sm font-medium animate-pulse">
                    ⏳ Preparando opciones...
                  </div>
                </div>
              )}

              {/* Indicador de clic para saltar texto */}
              {isTyping && (
                <div className="absolute bottom-8 right-8 flex items-center gap-4">
                  <div className="text-gray-400 text-sm animate-pulse flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                    <span>Haz clic para continuar</span>
                    <span className="text-lg">▼</span>
                  </div>
                </div>
              )}
            </div>

            {/* Panel de opciones con animaciones */}
            {!gameCompleted && showOptions && !loading && (
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 overflow-hidden">
                <div className="max-w-3xl mx-auto">
                  <p className={`text-white text-center font-semibold mb-4 text-lg transition-all duration-500 transform ${
                    animatingOptions ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    ¿Qué decides hacer?
                  </p>
                  
                  <div className="grid gap-3">
                    {visibleOptions.length > 0 ? (
                      visibleOptions.map((op, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(op)}
                          disabled={loading || isTyping}
                          className={`
                            group relative bg-white rounded-xl px-6 py-4 text-left
                            font-medium text-gray-800 transition-all duration-500 transform
                            ${loading || isTyping 
                              ? "opacity-50 cursor-not-allowed" 
                              : "hover:bg-orange-50 hover:shadow-lg hover:scale-102 cursor-pointer"
                            }
                            ${animatingOptions 
                              ? 'translate-y-0 opacity-100' 
                              : 'translate-y-6 opacity-0'
                            }
                          `}
                          style={{
                            transitionDelay: animatingOptions ? `${idx * 100}ms` : '0ms'
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                              {idx + 1}
                            </div>
                            <span className="capitalize flex-1 leading-relaxed">
                              {op}
                            </span>
                            <div className={`text-orange-500 transition-all duration-300 ${
                              animatingOptions ? 'opacity-100' : 'opacity-0'
                            } group-hover:opacity-100`}>
                              →
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className={`text-center text-orange-100 py-4 transition-all duration-500 ${
                        animatingOptions ? 'opacity-100' : 'opacity-0'
                      }`}>
                        No hay opciones disponibles
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Botón reiniciar cuando termina */}
            {gameCompleted && (
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-8">
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
                  >
                    <span> <RefreshCcw className="text-primary" /></span> Jugar de nuevo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Indicaciones de interfaz */}
          {!gameCompleted && !loading && (
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <span>Historia en progreso</span>
              </div>
              {isTyping && (
                <div className="flex items-center gap-2">
                  <span>  <Lightbulb /></span>
                  <span>Haz clic en el texto para avanzar rápido</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}