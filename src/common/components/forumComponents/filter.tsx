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
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {foros.map(foro => (
        <button
          key={foro.id}
          className="hover:bg-primary justify-center items-center shadow-2xl shadow-gray-800 hover:shadow-black cursor-pointer bg-green-300 text-white font-bold rounded-xl p-2"
          onClick={() => setForoSeleccionado(foro)}
        >
          {foro.nombre}
        </button>
      ))}
    </div>
  );
}
