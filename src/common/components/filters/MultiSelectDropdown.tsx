// ! reemplazado por DynamicMultiSelect.tsx - filtro dinámico
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

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
}

const MultiSelectDropdown: React.FC<Props> = ({
  label,
  options,
  selected,
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState<(string | number)[]>(selected);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setTemp(selected), [selected]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = (v: string | number) =>
    setTemp((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm hover:shadow transition cursor-pointer"
      >
        <span className="font-medium">{label}</span>
        <ChevronDown className="h-4 w-4 opacity-70" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-64 rounded-xl border bg-white p-3 shadow-lg">
          <div className="max-h-64 overflow-auto pr-1 space-y-2">
            {options.map((op) => (
              <label
                key={String(op.value)}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  className="accent-amber-600 cursor-pointer"
                  checked={temp.includes(op.value)}
                  onChange={() => toggle(op.value)}
                />
                <span>{op.label}</span>
              </label>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setTemp([])}
              className="text-sm text-gray-600 hover:underline cursor-pointer"
            >
              Limpiar
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm px-3 py-1 rounded-full border cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange(temp);
                  setOpen(false);
                }}
                className="text-sm px-3 py-1 rounded-full bg-amber-500 text-white cursor-pointer"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
