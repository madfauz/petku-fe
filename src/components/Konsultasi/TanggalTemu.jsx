import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rupiah } from "../../utils/rupiah";
import { CalendarIcon, ClockIcon } from "../icon";
import SectionCard from "../UI/SectionCard";

const DAY_NUMBER = {
  Senin: 1,
  Selasa: 2,
  Rabu: 3,
  Kamis: 4,
  Jumat: 5,
  Sabtu: 6,
  Minggu: 0,
};

function getDateTimes(jadwalWaktu) {
  const days = [];
  const times = [];
  if (!jadwalWaktu?.length) return { days, times };

  const today = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(today.getDate() + 14);

  const currentDate = new Date(today);

  while (currentDate <= twoWeeksFromNow) {
    const dayOfWeek = currentDate.getDay();

    for (const jadwal of jadwalWaktu) {
      if (DAY_NUMBER[jadwal.day] !== dayOfWeek) continue;
      if (days.length >= 6) return { days, times };

      times.push(jadwal.times);
      days.push(new Date(currentDate));
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return { days, times };
}

const ChipOption = ({ selected, onClick, className = "", children }) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onClick}
    className={`rounded-2xl border text-center transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] focus-visible:ring-offset-2 ${
      selected
        ? "border-[#1E3A34] bg-[#1E3A34] text-white shadow-md"
        : "border-[#E5E1D6] bg-white text-[#1E3A34] hover:border-[#F0A93B] hover:bg-[#FBF8F2]"
    } ${className}`}
  >
    {children}
  </button>
);

const TanggalTemu = ({ data, user }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [keyDate, setKeyDate] = useState(0);
  const [keyTime, setKeyTime] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const { days: selectedDates, times: selectedTimes } = getDateTimes(
    data?.jadwal_waktu,
  );
  const times = selectedTimes[keyDate];

  const clickedDate = (key, date) => {
    setKeyDate(key);
    setKeyTime(0);
    setSelectedDate(date);
    setSelectedTime(selectedTimes[key][0]);
  };

  const clickedTime = (key, time) => {
    setKeyTime(key);
    setSelectedTime(time);
  };

  const handleClick = (id_praktek) => {
    if (user === null) {
      setMessage("Silahkan login terlebih dahulu");
    } else if (user?.role !== "pelanggan") {
      setMessage("Anda bukan pelanggan");
    } else if (!selectedDate || !selectedTime) {
      setMessage("Silahkan pilih tanggal dan jam terlebih dahulu");
    } else {
      navigate(`/konsultasi/${id_praktek}/konfirmasi`, {
        state: {
          day: selectedDate,
          time: `${selectedTime.start} - ${selectedTime.end}`,
          id_praktek: id_praktek,
        },
      });
    }
  };

  useEffect(() => {
    if (selectedDates.length !== 0 && selectedTimes.length !== 0) {
      setSelectedDate(selectedDates[keyDate]);
      if (times?.[keyTime]) {
        setSelectedTime(times[keyTime]);
      } else {
        setSelectedTime("");
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-5 font-jakarta min-w-0">
      <SectionCard icon={CalendarIcon} title="Pilih tanggal">
        {selectedDates.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {selectedDates.map((date, key) => (
              <ChipOption
                key={key}
                selected={key === keyDate}
                onClick={() => clickedDate(key, date)}
                className="flex flex-col items-center py-3"
              >
                <span
                  className={`text-xs font-medium ${
                    key === keyDate ? "text-[#F6C468]" : "text-[#6B7280]"
                  }`}
                >
                  {date.toLocaleDateString("id-ID", { weekday: "short" })}
                </span>
                <span className="font-fredoka text-2xl font-semibold leading-tight">
                  {date.getDate()}
                </span>
                <span className="text-xs">
                  {date.toLocaleDateString("id-ID", { month: "short" })}
                </span>
              </ChipOption>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-[#FBF8F2] px-4 py-6 text-center text-sm text-[#6B7280]">
            Belum ada jadwal tersedia dalam 2 minggu ke depan.
          </p>
        )}
      </SectionCard>

      <SectionCard icon={ClockIcon} title="Pilih jam praktek">
        {times?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {times.map((time, key) => (
              <ChipOption
                key={key}
                selected={key === keyTime}
                onClick={() => clickedTime(key, time)}
                className="px-3 py-3 text-sm font-semibold"
              >
                {time.start} - {time.end}
              </ChipOption>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-[#FBF8F2] px-4 py-6 text-center text-sm text-[#6B7280]">
            Jam praktek akan muncul setelah jadwal tersedia.
          </p>
        )}
      </SectionCard>

      <section className="rounded-3xl bg-white border border-[#EAE5D8] p-5 sm:p-6 shadow-[0_10px_30px_-18px_rgba(30,58,52,0.35)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#6B7280]">Biaya konsultasi</p>
            {data?.promo ? (
              <>
                <div className="mt-1 flex items-center gap-2 flex-wrap">
                  <span className="font-fredoka text-3xl font-semibold text-[#1E3A34]">
                    {rupiah(data?.harga_promo)}
                  </span>
                  <span className="rounded-full bg-[#F0A93B] px-2.5 py-0.5 text-xs font-bold text-[#1E3A34]">
                    Promo
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-[#9CA3AF] line-through">
                  {rupiah(data?.harga)}
                </p>
              </>
            ) : (
              <span className="mt-1 block font-fredoka text-3xl font-semibold text-[#1E3A34]">
                {rupiah(data?.harga)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              handleClick(data?.id_praktek);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full sm:w-auto rounded-2xl bg-[#F0A93B] px-8 py-3.5 font-bold text-[#1E3A34] shadow-[0_8px_20px_-8px_rgba(240,169,59,0.9)] hover:bg-[#E29A28] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A34] focus-visible:ring-offset-2 transition"
          >
            Buat Janji Temu
          </button>
        </div>

        {message && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-[#FDECE8] px-3.5 py-2.5 text-sm text-[#C4432E]"
          >
            {message}
          </p>
        )}

        <p className="mt-4 flex items-start gap-2 border-t border-[#EAE5D8] pt-4 text-sm text-[#6B7280]">
          <ClockIcon size={16} className="mt-0.5 shrink-0 text-[#B87A12]" />
          Janji temu dokter dapat dilakukan 3 jam sebelum jam praktik
        </p>
      </section>
    </div>
  );
};

export default TanggalTemu;
