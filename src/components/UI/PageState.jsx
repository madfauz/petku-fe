import { PawIcon } from "../icon";

export const PageLoading = ({ rows = 3 }) => (
  <div
    className="flex flex-col gap-5"
    aria-busy="true"
    aria-label="Memuat data"
  >
    {Array.from({ length: rows }).map((_, idx) => (
      <div
        key={idx}
        className="h-32 animate-pulse rounded-3xl bg-[#1E3A34]/10"
      />
    ))}
  </div>
);

export const PageError = ({ message }) => (
  <div className="flex flex-col items-center gap-3 py-16 text-center">
    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#FDECE8] text-[#C4432E]">
      <PawIcon size={26} />
    </span>
    <p role="alert" className="max-w-sm text-[15px] text-[#C4432E]">
      {message || "Terjadi kesalahan, silakan coba lagi."}
    </p>
  </div>
);
