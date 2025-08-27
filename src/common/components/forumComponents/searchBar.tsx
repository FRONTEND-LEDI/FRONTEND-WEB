type Foro = {
  id: string;
  nombre: string;
  posts: string[];
};


type SearchProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  foroSeleccionado: Foro | null;
};

export default function SearchingBar({ searchTerm, setSearchTerm, foroSeleccionado }: SearchProps) {
  return (
    <form className="flex gap-2 mb-4" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder={`Buscar en ${foroSeleccionado ? foroSeleccionado.nombre : "todas las publicaciones"}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow border border-gray-300 rounded px-3 py-1"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-1 rounded cursor-pointer hover:bg-orange-700"
      >
        Buscar
      </button>
    </form>
  );
}
