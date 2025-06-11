import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input = ({ label, name, ...props }: Props) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={name} className="text-sm font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

export default Input;
