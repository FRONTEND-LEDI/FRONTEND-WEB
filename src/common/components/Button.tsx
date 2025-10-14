import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

// Componente de botón reutilizable 
const Button = ({ children, ...props }: Props) => (
  <button
    {...props}
    className="
        relative flex items-center karaoke justify-center h-[50px] w-[200px] cursor-pointer overflow-hidden 
        rounded-[30px] border-2 border-primary bg-transparent 
        text-primary transition-all duration-1500 ease-in-out 
        hover:shadow-[1px_1px_200px_#252525] hover:text-white hover:border-none
        after:content-[''] after:absolute after:left-0 after:top-0 
        after:h-[10px] after:w-[10px] after:rounded-[30px] after:bg-primary 
        after:invisible after:z-[-1] after:transition-all after:duration-500 after:ease-in-out
        hover:after:visible hover:after:scale-[80] hover:after:translate-x-[2px]
      "
    >
  
    {children}
  </button>
);

export default Button;
