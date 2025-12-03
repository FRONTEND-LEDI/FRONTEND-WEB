import type React from "react";
import { useState, useEffect } from "react";
import { Filter, X, Brain, Sparkles, Zap } from "lucide-react";
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
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const aiPlaceholders = [
    "Descubrí cuentos de escritores formoseños...",
    "Encontrá poemas, cuentos, audiolibros...",
    "Obras sobre la historia y cultura de Formosa...",
    "Cuentos infantiles de escritores locales...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % aiPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (query) {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        onSearch(query);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setIsSearching(false);
      onSearch("");
    }
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
    filters.formats.length > 0 ||
    filters.anthology === true;

  const clearAllFilters = () => {
    onChange({
      years: [],
      genres: [],
      subgenres: [],
      formats: [],
      anthology: false,
    });
    setQuery("");
  };

  const handleFilterChange = (newFilters: FilterState) => {
    onChange(newFilters);
    if (
      hasActiveFilters ||
      newFilters.years.length > 0 ||
      newFilters.genres.length > 0 ||
      newFilters.subgenres.length > 0 ||
      newFilters.formats.length > 0 ||
      newFilters.anthology === true
    ) {
      setQuery("");
    }
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Buscador */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1 max-w-md group">
          <div className="absolute -top-2 -right-2 z-10">
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-[length:200%_200%] animate-gradient-x text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span className="font-medium">Buscar</span>
            </div>
          </div>

          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            <Brain
              className={`h-4 w-4 text-orange-500 transition-all duration-300 ${
                isSearching ? "animate-pulse scale-110" : ""
              }`}
            />
            {isSearching && (
              <div className="flex gap-1">
                <div
                  className="w-1 h-1 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-1 h-1 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-1 h-1 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder={aiPlaceholders[currentPlaceholder]}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-1 border-primary/30 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 rounded-lg focus:outline-none focus:ring-0 transition-all duration-300 placeholder:text-gray-400 placeholder:transition-all placeholder:duration-500 relative overflow-hidden
                     before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-r before:from-orange-500 before:via-amber-500 before:to-yellow-500 before:bg-[length:200%_200%] before:animate-gradient-x before:rounded-lg before:-z-10
                     focus:before:opacity-100 hover:before:opacity-70 before:opacity-0"
            style={{
              background:
                "linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fefce8 100%)",
              boxShadow: query ? "0 0 20px rgba(249, 115, 22, 0.15)" : "none",
            }}
          />

          {(query || isSearching) && (
            <div className="absolute inset-0 pointer-events-none">
              <Sparkles
                className="absolute top-2 right-8 h-3 w-3 text-orange-400 animate-ping"
                style={{ animationDelay: "0s" }}
              />
              <Zap
                className="absolute bottom-2 right-12 h-3 w-3 text-amber-400 animate-ping"
                style={{ animationDelay: "1s" }}
              />
              <Sparkles
                className="absolute top-3 right-16 h-2 w-2 text-yellow-400 animate-ping"
                style={{ animationDelay: "2s" }}
              />
            </div>
          )}
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
                  filters.formats.length +
                  (filters.anthology ? 1 : 0)}
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
              onChange={(years) => handleFilterChange({ ...filters, years })}
              placeholder="Todos los años"
            />

            <DynamicMultiSelect
              label="Género"
              options={genreOptions}
              selected={filters.genres}
              onChange={(genres) =>
                handleFilterChange({ ...filters, genres: genres as string[] })
              }
              placeholder="Todos los géneros"
            />

            <DynamicMultiSelect
              label="Subgénero"
              options={subgenreOptions}
              selected={filters.subgenres}
              onChange={(subgenres) =>
                handleFilterChange({
                  ...filters,
                  subgenres: subgenres as string[],
                })
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

          {/* Antologías Toggle */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.anthology === true}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    anthology: e.target.checked,
                  })
                }
                className="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                Ver Antologías completas
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovedFiltersBar;
