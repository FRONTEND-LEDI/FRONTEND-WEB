import { useLocation } from "wouter";

export function GameHeader({ 
  points = 0, 
  bookTitle = "Libro" 
}: { 
  points?: number; 
  bookTitle?: string;
}) {
  const [, setLocation] = useLocation();

  const handleSalir = () => {
    setLocation("/BiblioGames");
  };

  return (
    <div className="w-full flex justify-between mt-12 items-center px-4 py-3 border-b-2 border-orange-500 text-orange-400 font-mono pt-10 bg-fund/50 backdrop-blur-sm">
      {/* Botón Salir */}
      <button
        onClick={handleSalir}
        className="px-5 py-2 cursor-pointer border-2 border-orange-500 rounded-lg hover:bg-orange-500/20 transition-all font-semibold flex items-center gap-2 hover:scale-105 transform"
      >
        <span>←</span>
        <span>SALIR</span>
      </button>

      {/* Título del libro - Centro */}
      <div className="flex-1 text-center px-4">
        <div className="inline-flex items-center gap-2">
          <span className="font-bold text-orange-400 truncate max-w-xs sm:max-w-md">
            {bookTitle}
          </span>
        </div>
      </div>

      {/* Puntos */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <span className="text-sm font-semibold">Puntos:</span>
          <span className="ml-2 text-xl font-bold">{points}</span>
        </div>
      </div>
    </div>
  );
}