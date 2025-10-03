import Navbar from "../navbar";
import { GameHeader } from "./gameHeader";

export function CreatuHistoria() {
  // Simulación de libro y opciones
  const libro = { title: "Las aventuras de Sherlock Holmes" };
  const opciones = [
    "Investigar las huellas en el callejón",
    "Interrogar al testigo nervioso",
    "Examinar la carta misteriosa",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0C1B] text-white ">
      <Navbar />
      <div  style={{
   cursor: `url("/game.png"), auto`

  }}>

 
      <div className="w-full mt-20">
          <GameHeader  points={0} />
          </div>
    


    

      {/* Contenedor del juego */}
      <div className="max-w-3xl font-mono mx-auto mt-8 border border-orange-500 rounded p-6 relative">
        {/* Header del libro */}
        <div className="bg-orange-500 text-black font-bold px-4 py-1 rounded">
          📖 {libro.title} <span className="float-right">Escena 1</span>
        </div>

        {/* Icono central */}
        <div className="flex justify-center my-6">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-black text-2xl">
            🦊
          </div>
        </div>

        {/* Texto del juego */}
        <div className="border border-orange-500 rounded p-4 mb-6">
          En las calles de Londres, un zorro detective te entrega una lupa. "Hay un misterio que resolver", dice. ¿Qué pista seguirás primero?
        </div>

        {/* Opciones */}
        <div className="grid gap-3">
          {opciones.map((op, idx) => (
            <button
              key={idx}
              className="border border-orange-500 rounded px-4 py-2 text-left hover:bg-orange-500 hover:text-black"
            >
              [{idx + 1}] {op.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Footer indicativo */}
        <div className="text-xs text-gray-400 mt-4 text-center">
          Usa las teclas 1, 2, 3 o haz clic para elegir
        </div>
      </div>
       </div>
    </div>
  );
}
