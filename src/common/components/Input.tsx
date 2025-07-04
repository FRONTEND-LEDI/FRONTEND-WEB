import type { InputHTMLAttributes } from "react";

// Extendemos las props para aceptar cualquier atributo de un <input>
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

// Componente reutilizable de input con estilos y accesibilidad
const Input = ({ label, name, ...props }: Props) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={name} className="text-sm font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
      {...props}
    />
  </div>
);

export default Input;
