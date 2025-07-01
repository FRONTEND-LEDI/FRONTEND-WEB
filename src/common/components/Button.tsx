import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

// Componente de botón reutilizable 
const Button = ({ children, ...props }: Props) => (
  <button
    {...props}
    className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-[#758d2d] transition-colors"
  >
    {children}
  </button>
);

export default Button;
