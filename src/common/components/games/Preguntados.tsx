import Navbar from "../navbar";
import { GameHeader } from "./gameHeader";
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { getQuiz, submitQuiz } from "../../../db/services/games";
import { getBookById } from "../../../db/services/books";
import { useAuth } from "../../../context/AuthContext";
import Footer from "../Footer";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizResponse {
  title: string;
  ecenary: string;
  page: number;
  options: QuizQuestion[];
  completed?: boolean;
  score?: number;
}

export function Quiz() {
  const { bookId } = useParams();
  const [book, setBook] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [quizData, setQuizData] = useState<QuizResponse | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const { token } = useAuth();

  // Función para obtener las preguntas del quiz
  const fetchQuiz = async (): Promise<QuizResponse | null> => {
    if (!book) return null;
    if (!token) {
      setError("Debes iniciar sesión para jugar.");
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("Solicitando quiz para libro:", book._id);
      
      const result = await getQuiz(book._id, token);
      console.log("Respuesta recibida:", result);
      
      // Validación robusta de la estructura de datos
      if (!result) {
        throw new Error("No se recibió respuesta del servidor");
      }
      
      // El backend podría devolver los datos en diferentes formatos
      let options = result.options || result.questions || [];
      
      if (!Array.isArray(options)) {
        console.error("Options no es array:", options);
        throw new Error("Formato de quiz inválido: las preguntas no están en formato array");
      }
      
      // Asegurarnos de que cada pregunta tenga la estructura correcta
      const validatedOptions = options.map((q: any, index: number) => ({
        question: q.question || `Pregunta ${index + 1}`,
        options: Array.isArray(q.options) ? q.options : [],
        correctAnswer: q.correctAnswer !== undefined ? q.correctAnswer : 0
      }));
      
      return {
        title: result.title || book.title,
        ecenary: result.ecenary || result.scenario || "",
        page: result.page || 1,
        options: validatedOptions
      };
      
    } catch (err: any) {
      console.error("Error completo al obtener quiz:", err);
      setError(err.message || "Error desconocido al cargar el quiz.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Función para enviar resultados
  const sendQuizResults = async (finalScore: number): Promise<boolean> => {
    if (!book || !token || !quizData) return false;

    try {
      const quizState = {
        title: book.title,
        ecenary: quizData.ecenary,
        page: quizData.page,
        options: quizData.options,
        score: finalScore,
        completed: true
      };
      
      await submitQuiz(book._id, quizState, token);
      return true;
    } catch (err: any) {
      console.error("Error al enviar resultados:", err);
      // No mostramos error al usuario si falla el envío de resultados
      return false;
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

  // Inicializar el quiz cuando se carga el libro
  useEffect(() => {
    if (!book || !token) return;

    const initializeQuiz = async () => {
      const res = await fetchQuiz();
      if (res) {
        setQuizData(res);
        // Verificar si ya estaba completado
        if (res.completed && res.score !== undefined) {
          setQuizCompleted(true);
          setScore(res.score);
        }
      }
    };

    initializeQuiz();
  }, [book, token]);

  // Obtener la pregunta actual de forma segura
  const getCurrentQuestionData = (): QuizQuestion | null => {
    if (!quizData || !quizData.options || !Array.isArray(quizData.options)) {
      return null;
    }
    
    if (currentQuestion < 0 || currentQuestion >= quizData.options.length) {
      return null;
    }
    
    const question = quizData.options[currentQuestion];
    
    // Validar estructura de la pregunta
    if (!question || !question.options || !Array.isArray(question.options)) {
      return null;
    }
    
    return question;
  };

  // Manejar la selección de respuesta
  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult || quizCompleted) return;
    setSelectedAnswer(answerIndex);
  };

  // Confirmar respuesta
  const handleSubmitAnswer = () => {
    const currentQuestionData = getCurrentQuestionData();
    if (selectedAnswer === null || !currentQuestionData) return;

    const correct = selectedAnswer === currentQuestionData.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
    }
    setAnsweredQuestions(answeredQuestions + 1);
  };

  // Ir a la siguiente pregunta
  const handleNextQuestion = async () => {
    if (!quizData) return;

    // Si es la última pregunta
    if (currentQuestion >= quizData.options.length - 1) {
      setQuizCompleted(true);
      // Enviar resultados al backend
      await sendQuizResults(score);
      return;
    }

    // Pasar a la siguiente pregunta
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  // Reiniciar quiz
  const handleRestartQuiz = async () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setScore(0);
    setAnsweredQuestions(0);
    setQuizCompleted(false);
    
    // Recargar el quiz
    if (book && token) {
      const res = await fetchQuiz();
      if (res) {
        setQuizData(res);
      }
    }
  };

  // Estados de error
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

  // Estado de carga
  if (!book || loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0B0C1B] text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Cargando quiz...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Si no hay datos del quiz
  if (!quizData || !quizData.options || quizData.options.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0B0C1B] text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-xl mb-4">No hay preguntas disponibles para este libro</p>
            <button
              onClick={() => window.history.back()}
              className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-600"
            >
              Volver
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Obtener pregunta actual de forma segura
  const currentQuestionData = getCurrentQuestionData();
  
  // Si no hay pregunta actual válida
  if (!currentQuestionData) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0B0C1B] text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-xl mb-4">Error: Estructura de pregunta inválida</p>
            <button
              onClick={handleRestartQuiz}
              className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-600"
            >
              Reintentar Quiz
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalQuestions = quizData.options.length;
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0C1B] text-white">
      <Navbar />
      <div style={{ cursor: `url("/game.png"), auto` }}>
        <div className="w-full mt-20">
          <GameHeader points={score * 10} />
        </div>

        {/* Contenedor del quiz */}
        <div className="max-w-3xl mb-20 font-mono mx-auto mt-8 border border-orange-500 rounded p-6 relative">
          {!quizCompleted ? (
            <>
              {/* Header del quiz */}
              <div className="bg-orange-500 text-black font-bold px-4 py-1 rounded flex justify-between items-center mb-4">
                <span>🧠 {book.title} - Quiz</span>
                <span>
                  Pregunta {currentQuestion + 1}/{totalQuestions}
                </span>
              </div>

              {/* Barra de progreso */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Contexto del libro */}
              {quizData.ecenary && (
                <div className="border border-orange-500 rounded p-4 mb-6 bg-[#1a1b2e]">
                  <p className="text-sm text-gray-300 italic">{quizData.ecenary}</p>
                </div>
              )}

              {/* Pregunta */}
              <div className="border border-orange-500 rounded p-6 mb-6 bg-[#1a1b2e]">
                <h3 className="text-xl font-bold mb-4">{currentQuestionData.question}</h3>
              </div>

              {/* Opciones de respuesta */}
              <div className="grid gap-3 mb-6">
                {currentQuestionData.options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrectAnswer = idx === currentQuestionData.correctAnswer;
                  
                  let buttonClass = "border border-orange-500 rounded px-4 py-3 text-left hover:bg-orange-500 hover:text-black transition-colors";
                  
                  if (showResult) {
                    if (isCorrectAnswer) {
                      buttonClass = "border-2 border-green-500 bg-green-500/20 rounded px-4 py-3 text-left";
                    } else if (isSelected && !isCorrect) {
                      buttonClass = "border-2 border-red-500 bg-red-500/20 rounded px-4 py-3 text-left";
                    } else {
                      buttonClass = "border border-gray-500 rounded px-4 py-3 text-left opacity-50";
                    }
                  } else if (isSelected) {
                    buttonClass = "border-2 border-orange-500 bg-orange-500/30 rounded px-4 py-3 text-left";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <span className="font-bold mr-2">[{String.fromCharCode(65 + idx)}]</span>
                      {option}
                      {showResult && isCorrectAnswer && <span className="ml-2">✓</span>}
                      {showResult && isSelected && !isCorrect && <span className="ml-2">✗</span>}
                    </button>
                  );
                })}
              </div>

              {/* Resultado de la respuesta */}
              {showResult && (
                <div
                  className={`border-2 rounded p-4 mb-6 ${
                    isCorrect
                      ? "border-green-500 bg-green-500/10"
                      : "border-red-500 bg-red-500/10"
                  }`}
                >
                  <p className="text-center font-bold text-lg">
                    {isCorrect ? "🎉 ¡Correcto!" : "❌ Incorrecto"}
                  </p>
                  {!isCorrect && (
                    <p className="text-center text-sm mt-2">
                      La respuesta correcta era:{" "}
                      <span className="font-bold">
                        {currentQuestionData.options[currentQuestionData.correctAnswer]}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Puntuación: {score}/{answeredQuestions}
                </div>
                <div className="space-x-3">
                  {!showResult ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className={`bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-600 transition-colors ${
                        selectedAnswer === null ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Confirmar
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-600 transition-colors"
                    >
                      {currentQuestion >= totalQuestions - 1 ? "Ver resultados" : "Siguiente"}
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Pantalla de resultados finales */
            <div className="text-center">
              <div className="bg-orange-500 text-black font-bold px-4 py-1 rounded mb-6">
                🏆 Quiz Completado
              </div>

              <div className="border border-orange-500 rounded p-8 mb-6 bg-[#1a1b2e]">
                <h2 className="text-3xl font-bold mb-4">¡Quiz Finalizado!</h2>
                <div className="text-6xl font-bold text-orange-500 mb-4">
                  {score}/{totalQuestions}
                </div>
                <p className="text-xl mb-2">
                  {score === totalQuestions
                    ? "¡Perfecto! 🌟"
                    : score >= totalQuestions * 0.7
                    ? "¡Muy bien! 👏"
                    : score >= totalQuestions * 0.5
                    ? "¡Buen intento! 👍"
                    : "Sigue practicando 📚"}
                </p>
                <p className="text-gray-400">
                  Porcentaje: {Math.round((score / totalQuestions) * 100)}%
                </p>
              </div>

              <div className="space-x-4">
                <button
                  onClick={handleRestartQuiz}
                  className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  🔄 Reintentar
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="border border-orange-500 text-white px-6 py-2 rounded hover:bg-orange-500 hover:text-black transition-colors"
                >
                  Volver
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}