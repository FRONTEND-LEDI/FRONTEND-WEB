import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

// Componente de botón reutilizable 
const Button = ({ children, ...props }: Props) => (
  <button
    {...props}
    className="w-full bg-primary text-white cursor-pointer py-2 px-4 rounded hover:bg-btnHover transition-colors"
  >
    {children}
  </button>
);

export default Button;
