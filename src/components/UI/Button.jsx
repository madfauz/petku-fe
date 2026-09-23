import React from "react";
import { SpinnerIcon } from "../icon";

const VARIANTS = {
  primary: "bg-[#F0A93B] hover:bg-[#DD9A30] active:bg-[#C98B2B] text-[#1E3A34]",
  secondary: "bg-[#1E3A34] hover:bg-[#162B27] active:bg-[#0E1C1A] text-white",
  outline:
    "border-2 border-[#1E3A34] text-[#1E3A34] hover:bg-[#1E3A34]/5 active:bg-[#1E3A34]/10",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  isLoading = false,
  loadingText = "Memproses...",
  disabled = false,
  className = "",
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`h-12 w-full rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
        VARIANTS[variant] || VARIANTS.primary
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <SpinnerIcon />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
