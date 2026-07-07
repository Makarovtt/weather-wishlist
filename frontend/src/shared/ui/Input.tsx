import { InputHTMLAttributes } from "react";

export const Input = ({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`w-full rounded-md border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${className}`}
    {...props}
  />
);
