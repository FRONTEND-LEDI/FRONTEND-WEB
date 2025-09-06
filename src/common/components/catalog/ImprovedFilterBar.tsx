import type React from "react";
import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import DynamicMultiSelect from "../../components/filters/DynamicMultiSelect";
import type { FilterState, FormatType } from "../../../types/filters";

interface Props {
  years: (number | string)[];
  genres: string[];
  subgenres: string[];
  formats: FormatType[];
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onSearch: (query: string) => void;
}

const ImprovedFiltersBar: React.FC<Props> = ({
  years,
  genres,
  subgenres,
  formats,
  filters,
  onChange,
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const yearOptions = (years || []).map((y) => ({
    value: y,
    label: String(y),
  }));
  const genreOptions = (genres || []).map((g) => ({ value: g, label: g }));
  const subgenreOptions = (subgenres || []).map((s) => ({
    value: s,
    label: s,
  }));
  const formatOptions = (formats || []).map((f) => ({
    value: f,
    label: f === "ebook" ? "Ebook" : f === "audiobook" ? "Audiolibro" : "Video",
  }));

  const hasActiveFilters =
    filters.years.length > 0 ||
    filters.genres.length > 0 ||
    filters.subgenres.length > 0 ||
    filters.formats.length > 0;

  const clearAllFilters = () => {
    onChange({ years: [], genres: [], subgenres: [], formats: [] });
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Buscador */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Busqueda con IA"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 transition-colors cursor-pointer ${
              showFilters || hasActiveFilters
                ? "bg-amber-50 border-amber-300 text-amber-700"
                : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros</span>
            {hasActiveFilters && (
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                {filters.years.length +
                  filters.genres.length +
                  filters.subgenres.length +
                  filters.formats.length}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Limpiar</span>
            </button>
          )}
        </div>
      </div>

      {/* Filtros plegables */}
      {showFilters && (
        <div className="bg-none p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DynamicMultiSelect
              label="Año"
              options={yearOptions}
              selected={filters.years}
              onChange={(years) => onChange({ ...filters, years })}
              placeholder="Todos los años"
            />

            <DynamicMultiSelect
              label="Género"
              options={genreOptions}
              selected={filters.genres}
              onChange={(genres) =>
                onChange({ ...filters, genres: genres as string[] })
              }
              placeholder="Todos los géneros"
            />

            <DynamicMultiSelect
              label="Subgénero"
              options={subgenreOptions}
              selected={filters.subgenres}
              onChange={(subgenres) =>
                onChange({ ...filters, subgenres: subgenres as string[] })
              }
              placeholder="Todos los subgéneros"
            />

            <DynamicMultiSelect
              label="Formato"
              options={formatOptions}
              selected={filters.formats}
              onChange={(formats) =>
                onChange({ ...filters, formats: formats as FormatType[] })
              }
              placeholder="Todos los formatos"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovedFiltersBar;
