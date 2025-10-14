import type { Foro } from "./types";

type FilterProps = {
  setForoSeleccionado: (foro: Foro | null) => void; 
  foros: Foro[];
};

export default function FilterForum({ setForoSeleccionado, foros }: FilterProps) {
  console.log("Foros",foros);
  return (
    <div className="flex flex-col justify-center items-center mt-50 gap-8 w-full">
      <div className="flex flex-col gap-3 w-full top-12 justify-center items-center">
        {foros.map(foro => (
          <button
            key={foro._id}
            className="w-40 hover:bg-primary hover:shadow-2xl hover:shadow-gray-400 cursor-pointer bg-primary text-white font-bold rounded-xl py-2"
            onClick={() => setForoSeleccionado(foro)}
          >
            {foro.title}
          </button>
        ))}
      </div>
    </div>
  );
}