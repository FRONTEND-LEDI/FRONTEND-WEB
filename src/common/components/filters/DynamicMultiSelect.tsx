import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  label: string;
  options: Option[];
  selected: (string | number)[];
  onChange: (values: (string | number)[]) => void;
  className?: string;
  placeholder?: string;
}

const DynamicMultiSelect: React.FC<Props> = ({
  label,
  options,
  selected,
  onChange,
  className,
  placeholder = "Seleccionar...",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = (value: string | number) => {
    const newSelected = selected.includes(value)
      ? selected.filter((x) => x !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const clearAll = () => {
    onChange([]);
  };

  const getDisplayText = () => {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) {
      const option = options.find((opt) => opt.value === selected[0]);
      return option?.label || String(selected[0]);
    }
    return `${selected.length} seleccionados`;
  };

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full min-w-[140px] px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-color cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">{label}:</span>
          <span className="text-gray-600 truncate">{getDisplayText()}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[250px] bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2">
            {selected.length > 0 && (
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">
                  {selected.length} seleccionados
                </span>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Limpiar todo
                </button>
              </div>
            )}

            <div className="max-h-48 overflow-auto space-y-1">
              {options.map((option) => (
                <label
                  key={String(option.value)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    checked={selected.includes(option.value)}
                    onChange={() => toggle(option.value)}
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicMultiSelect;
