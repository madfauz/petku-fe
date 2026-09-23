import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "../icon";

export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Pilih salah satu",
  emptyLabel = "Tidak ada pilihan",
  icon: Icon,
  error,
  disabled = false,
  className = "",
  multiple = false,
  ...props
}) {
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const isEmpty = options.length === 0;
  const isDisabled = disabled || isEmpty;

  const selectedValues = multiple
    ? Array.isArray(value)
      ? value.map(String)
      : []
    : [];

  const selectedIndex = multiple
    ? -1
    : options.findIndex((option) => String(option.value) === String(value));
  const selected = multiple ? null : options[selectedIndex];

  const selectedMultiLabels = multiple
    ? options
        .filter((o) => selectedValues.includes(String(o.value)))
        .map((o) => o.label)
    : [];

  const triggerText = isEmpty
    ? emptyLabel
    : multiple
      ? selectedMultiLabels.length > 0
        ? selectedMultiLabels.join(", ")
        : placeholder
      : (selected?.label ?? placeholder);

  const hasSelection = multiple
    ? selectedMultiLabels.length > 0
    : Boolean(selected);

  let tone = "border-[#E4E0D6] focus:ring-[#F0A93B]/50 focus:border-[#F0A93B]";
  if (error) {
    tone = "border-[#C4432E] focus:ring-[#C4432E]/30 focus:border-[#C4432E]";
  } else if (open) {
    tone = "border-[#F0A93B] ring-2 ring-[#F0A93B]/50";
  }

  const openList = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const choose = (index) => {
    const option = options[index];
    if (!option) return;

    if (multiple) {
      const optionValue = String(option.value);
      const exists = selectedValues.includes(optionValue);
      const nextValues = exists
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];

      onChange?.(nextValues, option);
      // list tetap terbuka supaya bisa pilih lebih dari satu berturut-turut
      return;
    }

    onChange?.(option.value, option);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        if (!open) {
          openList();
          break;
        }
        const step = e.key === "ArrowDown" ? 1 : -1;
        setActive((i) => (i + step + options.length) % options.length);
        break;
      }
      case "Home":
      case "End":
        if (open) {
          e.preventDefault();
          setActive(e.key === "Home" ? 0 : options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else openList();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, active]);

  return (
    <div className="w-full" ref={rootRef}>
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

        <button
          {...props}
          ref={buttonRef}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-activedescendant={open ? `${id}-option-${active}` : undefined}
          aria-invalid={Boolean(error)}
          aria-multiselectable={multiple || undefined}
          disabled={isDisabled}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={handleKeyDown}
          onKeyUp={(e) => e.key === " " && e.preventDefault()}
          className={`flex w-full h-12 items-center ${
            Icon ? "pl-11" : "pl-4"
          } pr-11 text-left rounded-xl border bg-white focus:outline-none focus:ring-2 transition disabled:bg-[#FBF8F2] disabled:text-[#9CA3AF] disabled:cursor-not-allowed ${
            hasSelection ? "text-[#1E3A34]" : "text-[#B4AFA2]"
          } ${tone} ${className}`}
        >
          <span className="truncate">{triggerText}</span>
        </button>

        <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#9CA8A3] pointer-events-none">
          <ChevronDownIcon
            size={18}
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>

        {open && !isDisabled && (
          <ul
            ref={listRef}
            id={`${id}-listbox`}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-auto rounded-xl border border-[#E4E0D6] bg-white p-1 shadow-[0_16px_40px_-16px_rgba(30,58,52,0.35)]"
          >
            {options.map((option, index) => {
              const isSelected = multiple
                ? selectedValues.includes(String(option.value))
                : index === selectedIndex;

              return (
                <li
                  key={option.value}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(index)}
                  className={`flex min-h-[44px] cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[15px] ${
                    index === active ? "bg-[#FBF8F2]" : ""
                  } ${
                    isSelected
                      ? "font-semibold text-[#1E3A34]"
                      : "text-[#4B5563]"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F0A93B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                      aria-hidden="true"
                    >
                      <path d="m5 12 5 5 9-10" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {name && (
        <input
          type="hidden"
          name={name}
          value={multiple ? (value ?? []).join(",") : (value ?? "")}
        />
      )}
      {error && <p className="mt-1 text-xs text-[#C4432E]">{error}</p>}
    </div>
  );
}
