import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

// Componente reutilizable de input
const Input = ({ label, name, type = "text", ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const actualType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col space-y-1 relative">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={actualType}
          className={`border border-gray-300 rounded px-3 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#d97706] pr-10`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
