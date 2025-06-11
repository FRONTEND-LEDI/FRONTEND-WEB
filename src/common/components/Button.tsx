import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...props }: Props) => (
  <button
    {...props}
    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
  >
    {children}
  </button>
);

export default Button;
