import React from "react";

export default function CardSelectGroup({
  label,
  options = [],
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#1E3A34] mb-1.5">
          {label}
        </label>
      )}
      <div className="grid grid-cols-2 gap-3">
        {options.map(({ value: itemValue, label: itemLabel, desc, Icon }) => {
          const active = value === itemValue;
          return (
            <button
              key={itemValue}
              type="button"
              onClick={() => onChange(itemValue)}
              className={`flex flex-col items-start gap-1.5 rounded-xl border-2 px-4 py-3 text-left transition ${
                active
                  ? "border-[#F0A93B] bg-[#FDF3E3]"
                  : "border-[#E4E0D6] bg-white hover:border-[#E4E0D6]/80"
              }`}
            >
              {Icon && (
                <Icon
                  size={20}
                  className={active ? "text-[#F0A93B]" : "text-[#9CA8A3]"}
                />
              )}
              <span
                className={`text-sm font-semibold ${
                  active ? "text-[#1E3A34]" : "text-[#4B5563]"
                }`}
              >
                {itemLabel}
              </span>
              {desc && (
                <span className="text-xs text-[#9CA8A3] leading-snug">
                  {desc}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
