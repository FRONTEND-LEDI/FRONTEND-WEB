import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

// Componente de botón reutilizable 
const Button = ({ children, ...props }: Props) => (
  <button
    {...props}
    className="w-full text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
  >
    {children}
  </button>
);

export default Button;
