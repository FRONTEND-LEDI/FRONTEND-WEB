// ! reemplazado por ImprovedFilterBar.tsx - filtro dinámico
import React from "react";
import MultiSelectDropdown from "../filters/MultiSelectDropdown";
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

const FiltersBar: React.FC<Props> = ({
  years,
  genres,
  subgenres,
  formats,
  filters,
  onChange,
  onSearch,
}) => {
  const [q, setQ] = React.useState("");

  const yearOptions = years.map((y) => ({ value: y, label: String(y) }));
  const subgenreOptions = subgenres.map((s) => ({ value: s, label: s }));
  const genreOptions = genres.map((g) => ({ value: g, label: g }));
  const formatOptions = formats.map((f) => ({
    value: f,
    label: f === "ebook" ? "Ebook" : f === "audiobook" ? "Audiolibro" : "Video",
  }));

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      {/* Grupo de filtros a la izquierda */}
      <div className="flex flex-wrap items-center gap-3">
        <MultiSelectDropdown
          label="Antologías"
          options={yearOptions}
          selected={filters.years}
          onChange={(yearsSel) => onChange({ ...filters, years: yearsSel })}
        />
        <MultiSelectDropdown
          label="Género"
          options={genreOptions}
          selected={filters.genres}
          onChange={(genreSel) =>
            onChange({ ...filters, genres: genreSel as string[] })
          }
        />
        <MultiSelectDropdown
          label="Subgénero"
          options={subgenreOptions}
          selected={filters.subgenres}
          onChange={(subSel) =>
            onChange({ ...filters, subgenres: subSel as string[] })
          }
        />
        <MultiSelectDropdown
          label="Formato"
          options={formatOptions}
          selected={filters.formats}
          onChange={(fmtSel) =>
            onChange({ ...filters, formats: fmtSel as FormatType[] })
          }
        />
      </div>

      {/* Buscador compacto a la derecha */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(q);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Busqueda con inteligencia artificial..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-[min(460px,90vw)] md:w-[420px] border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-amber-300"
        />
        <button
          type="submit"
          className="rounded-full bg-primary text-white px-5 py-2 hover:bg-btnHover cursor-pointer"
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default FiltersBar;
