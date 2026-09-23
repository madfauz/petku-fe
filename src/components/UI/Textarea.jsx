export default function Textarea({
  label,
  id,
  value = "",
  onChange,
  placeholder,
  rows = 4,
  maxLength,
  error,
  required = false,
  className = "",
  ...props
}) {
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
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        required={required}
        aria-invalid={Boolean(error)}
        className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-[#1E3A34] placeholder:text-[#B4AFA2] focus:outline-none focus:ring-2 transition ${
          error
            ? "border-[#C4432E] focus:ring-[#C4432E]/30 focus:border-[#C4432E]"
            : "border-[#E4E0D6] focus:ring-[#F0A93B]/50 focus:border-[#F0A93B]"
        } ${className}`}
        {...props}
      />
      {(error || maxLength) && (
        <div className="mt-1 flex items-start justify-between gap-3">
          {error && <p className="text-xs text-[#C4432E]">{error}</p>}
          {maxLength && (
            <p className="ml-auto text-xs text-[#9CA3AF]">
              {value.length}/{maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
