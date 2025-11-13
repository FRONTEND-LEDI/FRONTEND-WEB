import Navbar from "../navbar";
import { GameHeader } from "./gameHeader";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { submitQuiz } from "../../../db/services/games";
import { getBookById } from "../../../db/services/books";
import { useAuth } from "../../../context/AuthContext";
import Footer from "../Footer";
import StarAnimation from "./winnerAnimation";
import { RefreshCcw } from "lucide-react";

interface QuizOption {
  textOption: string;
  status: boolean;
}

interface QuizResponse {
  title: string;
  scenery: string;
  page: number;
  options?: QuizOption[];
  completed?: boolean;
  score?: number;
}

export function Quiz() {
  const { bookId } = useParams();
  const { token } = useAuth();
  const [, setLocation] = useLocation();

  const [book, setBook] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [options, setOptions] = useState<QuizOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [page, setPage] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);

  useEffect(() => {
    const initializeQuiz = async () => {
      if (!bookId || !token) return;
      
      try {
        setLoading(true);
        const bookData = await getBookById(bookId, token);
        setBook(bookData);

        if (bookData.genre !== "Narrativo") {
          setError("Los quiz solo están disponibles para libros del género Narrativo.");
          return;
        }

        const initialResponse: QuizResponse = await submitQuiz(
          bookId, 
          {
            title: bookData.title,
            scenery: "",
            page: 1
          },
          token
        );

        if (initialResponse.options && initialResponse.options.length > 0) {
          setCurrentQuestion(initialResponse.scenery);
          setOptions(initialResponse.options);
          setPage(initialResponse.page);
        } else {
          throw new Error("No se recibieron preguntas del servidor");
        }
        
      } catch (err: any) {
        console.error("Error inicializando quiz:", err);
        setError(err.message || "Error al cargar el quiz");
      } finally {
        setLoading(false);
      }
    };

    initializeQuiz();
  }, [bookId, token]);

  const handleSelectOption = (option: QuizOption) => {
    if (quizCompleted || showFeedback || isAnswering) return;
    setSelectedOption(option);
  };

  const handleConfirmAnswer = async () => {
    if (!selectedOption || !bookId || !token || !book || isAnswering) return;

    setIsAnswering(true);
    setShowFeedback(true);

    if (selectedOption.status) {
      setCurrentScore(prev => prev + 10);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const response: QuizResponse = await submitQuiz(
        bookId, 
        {
          title: book.title,
          scenery: currentQuestion,
          page: page,
          option: {
            text: selectedOption.textOption,
            status: selectedOption.status
          }
        },
        token
      );

      if (response.completed || response.score !== undefined) {
        setFinalScore(response.score || 0);
        setQuizCompleted(true);
      } else {
        if (response.options && response.options.length > 0) {
          setCurrentQuestion(response.scenery);
          setOptions(response.options);
          setPage(response.page);
          setSelectedOption(null);
          setShowFeedback(false);
          setIsAnswering(false);
        } else {
          setQuizCompleted(true);
          setFinalScore(currentScore);
        }
      }
      
    } catch (err: any) {
      console.error("Error confirmando respuesta:", err);
      setError("Error al enviar la respuesta");
      setShowFeedback(false);
      setIsAnswering(false);
    }
  };

  const handleRestartQuiz = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    setLocation("/games/quiz");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-fund">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600 text-lg font-medium">Cargando quiz...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex flex-col min-h-screen bg-fund">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📚</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {book && book.genre !== "Narrativo" ? "Género No Compatible" : "Oops!"}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={handleGoBack}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Volver a Libros
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="bg-white text-orange-500 border-2 border-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-fund to-orange-50">
      <Navbar />
      
      {/* Header con puntos */}
      <GameHeader points={currentScore} bookTitle={book.title} />

      {/* Contenido principal */}
      <div className="flex-1 px-4 pb-8 pt-6">
        <div className="max-w-4xl mx-auto">
          {!quizCompleted ? (
            <div className="overflow-hidden">
              
              {/* Pregunta */}
              <div className="p-8">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 mb-8 border-2 border-primary">
                  <h3 className="text-2xs text-gray-800 leading-relaxed">
                    {currentQuestion}
                  </h3>
                </div>

                {/* Opciones en grid 2x2 estilo Preguntados */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {options.map((option, idx) => {
                    const isSelected = selectedOption?.textOption === option.textOption;
                    const showResult = showFeedback && isSelected;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option)}
                        disabled={showFeedback || isAnswering}
                        className={`
                          relative group min-h-[100px] rounded-2xl p-6 text-left
                          transition-all duration-300 transform border-2
                          ${showFeedback 
                            ? 'cursor-not-allowed' 
                            : 'hover:scale-105 hover:shadow-2xl cursor-pointer'
                          }
                          ${showResult && option.status
                            ? 'bg-green-500 border-green-500 text-white'
                            : showResult && !option.status
                            ? 'bg-red-500 border-red-500 text-white'
                            : isSelected
                            ? 'bg-orange-500 border-orange-500 text-white scale-105 shadow-2xl'
                            : 'border-orange-500 bg-transparent text-gray-800 hover:bg-orange-500 hover:text-white'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="font-semibold leading-snug">
                              {option.textOption}
                            </span>
                          </div>
                          {showResult && (
                            <div className="ml-3 flex-shrink-0">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <span className="text-2xl text-gray-800">
                                  {option.status ? '✓' : '✗'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback animado */}
                {showFeedback && selectedOption && (
                  <div className={`
                    p-4 rounded-2xl mb-4 text-center transform transition-all
                    ${selectedOption.status 
                      ? 'bg-gradient-to-r from-green-100 to-green-200 border-2 border-primary' 
                      : 'bg-gradient-to-r from-red-100 to-red-200 border-2 border-primary'
                    }
                  `}>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl animate-bounce">
                        {selectedOption.status}
                      </span>
                      <div className={`flex items-center gap-2 text-2xl font-bold ${
                        selectedOption.status ? 'text-green-600' : 'text-primary'
                      }`}>
                        <span>
                          {selectedOption.status ? '¡Correcto!' : '¡Casi! Sigue intentando'}
                        </span>
                        <img 
                          src={selectedOption.status ? "/hostImage/FELIZ.png" : "/hostImage/TRISTE.png"} 
                          alt={selectedOption.status ? "feliz" : "triste"}
                          className="w-8 h-8"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Botón confirmar */}
                {!showFeedback && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleConfirmAnswer}
                      disabled={!selectedOption || isAnswering}
                      className={`
                        bg-gradient-to-r from-orange-500 to-orange-600 text-white 
                        px-12 py-4 rounded-2xl font-bold text-lg
                        transition-all transform shadow-xl
                        ${!selectedOption || isAnswering
                          ? "opacity-50 cursor-not-allowed" 
                          : "hover:scale-105 hover:shadow-2xl hover:from-orange-600 hover:to-orange-700"
                        }
                      `}
                    >
                      {isAnswering ? 'Procesando...' : 'Confirmar Respuesta'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Resultado final */
            <div className="bg-white rounded-3xl mt-6 overflow-hidden border-1 border-primary">
              <div className="bg-primary p-8 text-center">
                <h2 className="text-4xl font-bold text-white">¡Quiz Completado!</h2>
              </div>

              <div className="p-4 text-center">
                <div className="mb-8">
                  <p className="text-gray-600 text-lg mb-4">Tu puntuación final:</p>
                  <div className="inline-block p-2">
                    <div className="text-2xl text-primary font-bold">{finalScore}</div>
                  </div>
                </div>

                <p className="text-2xl gap-8 flex flex-col font-semibold text-gray-700 mb-12">
                  {finalScore >= 80 ? (
                    <>
                      ¡Excelente trabajo!
                      <StarAnimation />
                    </>
                  ) : finalScore >= 60 ? (
                    "¡Muy bien hecho!"
                  ) : finalScore >= 40 ? (
                    "¡Buen esfuerzo!"
                  ) : (
                    "¡Sigue practicando!"
                  )}
                </p>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleRestartQuiz}
                    className="bg-primary cursor-pointer text-white px-8 py-4 rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
                  >
                    <span><RefreshCcw /></span> Reintentar Quiz
                  </button>
                  <button
                    onClick={handleGoBack}
                    className="bg-white cursor-pointer text-primary border-1 border-primary px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-all flex items-center gap-2"
                  >
                    Volver a Libros
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}