import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../icon";

export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  required = false,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const actualType = isPasswordType && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[#1E3A34] mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#9CA8A3] pointer-events-none">
            <Icon />
          </span>
        )}
        <input
          id={id}
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full h-12 ${Icon ? "pl-11" : "pl-4"} ${
            isPasswordType ? "pr-11" : "pr-4"
          } rounded-xl border bg-white text-[#1E3A34] placeholder:text-[#B4AFA2] focus:outline-none focus:ring-2 transition ${
            error
              ? "border-[#C4432E] focus:ring-[#C4432E]/30 focus:border-[#C4432E]"
              : "border-[#E4E0D6] focus:ring-[#F0A93B]/50 focus:border-[#F0A93B]"
          } ${className}`}
          {...props}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={
              showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
            }
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#9CA8A3] hover:text-[#1E3A34] transition"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-[#C4432E]">{error}</p>}
    </div>
  );
}
