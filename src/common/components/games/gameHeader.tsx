import { useLocation } from "wouter";

export function GameHeader({  points = 0 }: {  points?: number }) {
  const [, setLocation] = useLocation();

  const handleSalir = () => {
    setLocation("/BiblioGames"); // vuelve a la selección de juegos
  };

  return (
    <div className="w-full flex justify-between items-center p-2 bg-[#0a0e27] border-b border-orange-500 text-orange-400 font-mono pt-10">
      {/* Botón Salir */}
      <button
        onClick={handleSalir}
        className="px-4 py-1 border border-orange-500 rounded hover:bg-orange-500/20 transition"
      >
        ← SALIR
      </button>

      {/* Barra de vida y puntos */}
      <div className="flex items-center">
        {/* Puntos */}
        <div className="flex items-center gap-2">
          <span>⚡ Puntos:</span>
          <span>{points}</span>
        </div>
      </div>
    </div>
  );
}
