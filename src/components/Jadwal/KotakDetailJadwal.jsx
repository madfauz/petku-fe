import {
  CalendarIcon,
  MapPinIcon,
  PawIcon,
  StethoscopeIcon,
  UserIcon,
} from "../icon";
import SectionCard from "../UI/SectionCard";
import capitalizeWords from "../../utils/capitalizeWords";
import { formatWaktu } from "../../utils/formatWaktu";

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

const KotakDetailJadwal = ({ data }) => {
  if (!data) return null;

  const lawanPelanggan = data.pelanggan;
  const lawanDokter = data.dokter;

  return (
    <div className="flex flex-col gap-5">
      <SectionCard icon={UserIcon} title="Peserta">
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#6B7280]">Pelanggan</span>
            <span className="font-semibold text-[#1E3A34]">
              {capitalizeWords(lawanPelanggan?.user?.username)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#6B7280]">Dokter</span>
            <span className="font-semibold text-[#1E3A34]">
              {capitalizeWords(lawanDokter?.user?.username)}
            </span>
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={PawIcon} title="Hewan">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-[#6B7280]">Nama & jenis</span>
          <span className="font-semibold text-[#1E3A34]">
            {data.hewan?.nama} ({capitalizeWords(data.hewan?.jenis_hewan)})
          </span>
        </div>
      </SectionCard>

      <SectionCard icon={CalendarIcon} title="Jadwal">
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#6B7280]">Waktu</span>
            <span className="font-semibold text-[#1E3A34]">
              {formatWaktu(data.waktu_dipilih_pelanggan)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#6B7280]">Status jadwal</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                statusStyle[data.status] ?? "bg-[#F3F4F6] text-[#6B7280]"
              }`}
            >
              {data.status}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#6B7280]">Status pembayaran</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                paymentStyle[data.status_pembayaran] ??
                "bg-[#F3F4F6] text-[#6B7280]"
              }`}
            >
              {data.status_pembayaran === "paid"
                ? "Sudah dibayar"
                : "Belum dibayar"}
            </span>
          </div>
        </div>
      </SectionCard>

      {data.rekam_medis?.catatan_pasien && (
        <SectionCard icon={StethoscopeIcon} title="Catatan dokter">
          <p className="whitespace-pre-line break-words text-sm leading-relaxed text-[#4B5563]">
            {data.rekam_medis.catatan_pasien}
          </p>
        </SectionCard>
      )}

      <p className="flex items-start gap-2 rounded-2xl bg-[#FBF8F2] px-3.5 py-2.5 text-xs text-[#6B7280] sm:text-sm">
        <MapPinIcon size={16} className="mt-0.5 shrink-0 text-[#B87A12]" />
        Pastikan untuk berada di lokasi sesuai jadwal konsultasi
      </p>
    </div>
  );
};

export default KotakDetailJadwal;
