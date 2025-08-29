type Foro = {
  id: string;
  nombre: string;
  posts: string[];
};

type FilterProps = {
  setForoSeleccionado: (foro: Foro) => void;
  foros: Foro[];
};

export default function FilterForum({ setForoSeleccionado, foros }: FilterProps) {
  const categorias = ["Romance", "Miedo", "Risa", "Psicológico", "Triste", "Nostalgia"];

  return (
    <div className="flex flex-col justify-start items-start gap-8 w-full">
      
      {/* --- Foros arriba --- */}
      <div className="flex flex-col gap-3 w-full items-center">
        {foros.map(foro => (
          <button
            key={foro.id}
            className="w-40 hover:bg-primary shadow-lg shadow-gray-800 hover:shadow-black cursor-pointer bg-primary text-white font-bold rounded-xl py-2"
            onClick={() => setForoSeleccionado(foro)}
          >
            {foro.nombre}
          </button>
        ))}
      </div>
{/* --- Categorías abajo --- */}
      <div className="grid grid-cols-3 gap-3 justify-items-center w-full">
        {categorias.map(cat => (
          <button
            key={cat}
            className="bg-orange-400 cursor-pointer text-white text-sm rounded-3xl px-3 py-1"
          >
            {cat}
          </button>
        ))}
      </div>
      {/* --- Imagen al medio --- */}
      <div className="w-full flex justify-center">
        <img src="image.png" alt="Decoración" className="w-32 h-32" />
      </div>

      
    </div>
  );
}
