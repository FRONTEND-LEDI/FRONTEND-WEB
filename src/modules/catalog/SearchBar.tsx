import React, { useState, useEffect, useRef } from "react";

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const hasCleared = useRef(false); // Para evitar múltiples llamadas

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  useEffect(() => {
    if (query.trim() === "") {
      if (!hasCleared.current) {
        hasCleared.current = true;
        onSearch("");
      }
    } else {
      hasCleared.current = false; // Se vuelve a permitir búsqueda cuando el input tiene algo
    }
  }, [query, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Buscar por título, tema, etc."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow border border-gray-300 rounded px-3 py-1"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
