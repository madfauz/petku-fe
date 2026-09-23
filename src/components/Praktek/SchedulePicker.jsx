import { TrashIcon } from "../icon";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Select from "../UI/Select";

const HARI_OPTIONS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
].map((h) => ({ value: h, label: h }));

const SchedulePicker = ({ value, onChange, maxHari = 7 }) => {
  const addHari = () => {
    if (value.length >= maxHari) return;
    onChange([
      ...value,
      { day: "Minggu", times: [{ start: "00:00", end: "00:00" }] },
    ]);
  };

  const deleteHari = (indexHari) => {
    onChange(value.filter((_, i) => i !== indexHari));
  };

  const editHari = (indexHari, day) => {
    onChange(value.map((h, i) => (i === indexHari ? { ...h, day } : h)));
  };

  const addWaktu = (indexHari) => {
    onChange(
      value.map((h, i) =>
        i === indexHari
          ? { ...h, times: [...h.times, { start: "00:00", end: "00:00" }] }
          : h,
      ),
    );
  };

  const deleteWaktu = (indexHari, indexWaktu) => {
    onChange(
      value.map((h, i) =>
        i === indexHari
          ? { ...h, times: h.times.filter((_, j) => j !== indexWaktu) }
          : h,
      ),
    );
  };

  const editWaktu = (indexHari, indexWaktu, field, waktu) => {
    onChange(
      value.map((h, i) =>
        i === indexHari
          ? {
              ...h,
              times: h.times.map((t, j) =>
                j === indexWaktu ? { ...t, [field]: waktu } : t,
              ),
            }
          : h,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {value.map((hari, indexHari) => (
        <div
          key={indexHari}
          className="flex flex-col gap-3 rounded-2xl border border-[#E4E0D6] bg-[#FBF8F2] p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[#1E3A34]">
              Hari ke-{indexHari + 1}
            </p>
            {value.length > 1 && (
              <button
                type="button"
                onClick={() => deleteHari(indexHari)}
                aria-label="Hapus hari"
                className="grid place-items-center w-8 h-8 rounded-full text-[#C4432E] hover:bg-[#FDECE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4432E]/50 transition"
              >
                <TrashIcon size={16} />
              </button>
            )}
          </div>

          <Select
            id={`hari-${indexHari}`}
            value={hari.day}
            onChange={(day) => editHari(indexHari, day)}
            options={HARI_OPTIONS}
          />

          <div className="flex flex-col gap-2">
            {hari.times.map((time, indexWaktu) => (
              <div key={indexWaktu} className="flex items-end gap-2">
                <Input
                  id={`waktu-${indexHari}-${indexWaktu}-start`}
                  type="time"
                  value={time.start}
                  onChange={(e) =>
                    editWaktu(indexHari, indexWaktu, "start", e.target.value)
                  }
                  className="h-11"
                />
                <span className="mb-3 shrink-0 text-[#9CA3AF]">–</span>
                <Input
                  id={`waktu-${indexHari}-${indexWaktu}-end`}
                  type="time"
                  value={time.end}
                  onChange={(e) =>
                    editWaktu(indexHari, indexWaktu, "end", e.target.value)
                  }
                  className="h-11"
                />
                {hari.times.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteWaktu(indexHari, indexWaktu)}
                    aria-label="Hapus waktu"
                    className="mb-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#C4432E] hover:bg-[#FDECE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4432E]/50 transition"
                  >
                    <TrashIcon size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => addWaktu(indexHari)}
          >
            + Tambah Waktu
          </Button>
        </div>
      ))}

      {value.length < maxHari && (
        <Button type="button" variant="secondary" onClick={addHari}>
          + Tambah Hari
        </Button>
      )}
    </div>
  );
};

export default SchedulePicker;
