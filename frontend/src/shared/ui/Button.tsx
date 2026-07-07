import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "danger" | "ghost";
}

const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
  ghost: "bg-slate-200 text-slate-800 hover:bg-slate-300 disabled:bg-slate-100",
};

export const Button = ({ children, variant = "primary", className = "", ...props }: ButtonProps) => (
  <button
    className={`rounded-md px-4 py-2 font-medium transition-colors ${variantStyles[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);
