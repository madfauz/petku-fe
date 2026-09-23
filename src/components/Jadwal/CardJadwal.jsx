import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cat, Dog, Hamster, Bird, Chameleon, Rabbit } from "../icon/PetIcon";
import { CalendarIcon, MapPinIcon, StethoscopeIcon } from "../icon";
import ScrollRow from "../UI/ScrollRow";
import capitalizeWords from "../../utils/capitalizeWords";
import { formatWaktu } from "../../utils/formatWaktu";

const CardJadwal = ({ data }) => {
  const { user } = useSelector((state) => state.user);

  if (!data || data.length === 0) return null;

  const petIcons = {
    kucing: Cat,
    anjing: Dog,
    hamster: Hamster,
    burung: Bird,
    kelinci: Rabbit,
  };
  const statusStyle = {
    pending: "bg-[#F0A93B]/15 text-[#B87A12]",
    confirmed: "bg-sky-50 text-sky-700",
    selesai: "bg-[#E6F4EC] text-[#1F7A4D]",
    batal: "bg-[#FDECE8] text-[#C4432E]",
  };
  const paymentStyle = {
    unpaid: "bg-[#FDECE8] text-[#C4432E]",
    paid: "bg-[#E6F4EC] text-[#1F7A4D]",
  };

  return (
    <ScrollRow>
      {data.map((jadwal) => {
        const lawan =
          user?.role === "dokter" ? jadwal.pelanggan : jadwal.dokter;
        const Icon = petIcons[jadwal.hewan?.jenis_hewan] ?? Chameleon;
        const catatan = jadwal.rekam_medis?.catatan_pasien;

        return (
          <Link
            key={jadwal.id_temu}
            to={`/jadwal-rekam/${jadwal.id_temu}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex w-[86%] min-w-[260px] max-w-[340px] shrink-0 flex-col gap-3 rounded-3xl border border-[#EAE5D8] bg-white p-3.5 font-jakarta transition hover:border-[#F0A93B] hover:shadow-[0_2px_8px_-4px_rgba(30,58,52,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] sm:gap-4 sm:p-4"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#1E3A34] sm:h-12 sm:w-12">
                <Icon />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-[#1E3A34] sm:text-base">
                  {capitalizeWords(lawan?.user?.username)}
                </p>
                <p className="mt-0.5 flex items-start gap-1.5 text-xs text-[#6B7280] sm:text-sm">
                  <CalendarIcon size={14} className="mt-0.5 shrink-0" />
                  <span className="break-words leading-snug">
                    {formatWaktu(jadwal.waktu_dipilih_pelanggan)}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                  statusStyle[jadwal.status] ?? "bg-[#F3F4F6] text-[#6B7280]"
                }`}
              >
                {jadwal.status}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  paymentStyle[jadwal.status_pembayaran] ??
                  "bg-[#F3F4F6] text-[#6B7280]"
                }`}
              >
                {jadwal.status_pembayaran === "paid"
                  ? "Sudah dibayar"
                  : "Belum dibayar"}
              </span>
            </div>

            <div className="mt-auto rounded-2xl bg-[#FBF8F2] px-3 py-2.5 text-xs text-[#6B7280] sm:text-sm">
              {catatan ? (
                <>
                  <p className="flex items-center gap-1.5 font-semibold text-[#1E3A34]">
                    <StethoscopeIcon
                      size={14}
                      className="shrink-0 text-[#B87A12]"
                    />
                    {user?.role === "dokter"
                      ? "Catatan kamu"
                      : "Catatan dokter"}
                  </p>
                  <p className="mt-1 line-clamp-3 break-words">{catatan}</p>
                </>
              ) : (
                <p className="flex items-start gap-2">
                  <MapPinIcon
                    size={16}
                    className="mt-0.5 shrink-0 text-[#B87A12]"
                  />
                  Pastikan untuk berada di lokasi sesuai jadwal konsultasi
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </ScrollRow>
  );
};

export default CardJadwal;
