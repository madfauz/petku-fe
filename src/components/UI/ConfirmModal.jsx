import { useEffect } from "react";
import { CloseIcon, PawIcon, TrashIcon } from "../icon";
import Button from "./Button";

const ConfirmModal = ({
  open,
  title,
  description,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Kembali",
  loading = false,
  loadingLabel = "Memproses...",
  onConfirm,
  onCancel,
  variant = "danger",
}) => {
  const isDanger = variant === "danger";

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape" && !loading) onCancel?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 font-jakarta"
    >
      <div
        aria-hidden="true"
        onClick={onCancel}
        className="absolute inset-0 bg-[#1E3A34]/60 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-[0_30px_80px_-20px_rgba(30,58,52,0.55)]">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Tutup"
          className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-full text-[#6B7280] hover:bg-[#FBF8F2] hover:text-[#1E3A34] transition"
        >
          <CloseIcon size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <span
            className={`grid place-items-center w-14 h-14 rounded-full ${
              isDanger
                ? "bg-[#FDECE8] text-[#C4432E]"
                : "bg-[#F0A93B]/20 text-[#B87A12]"
            }`}
          >
            {isDanger ? <TrashIcon size={26} /> : <PawIcon size={26} />}
          </span>

          <h2
            id="confirm-modal-title"
            className="mt-4 font-fredoka text-xl font-semibold text-[#1E3A34]"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              {description}
            </p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            autoFocus
          >
            {cancelLabel}
          </Button>
          <Button
            variant={isDanger ? "danger" : "secondary"}
            onClick={onConfirm}
            isLoading={loading}
            loadingText={loadingLabel}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
