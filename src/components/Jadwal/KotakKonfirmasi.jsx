import { useEffect, useMemo } from "react";
import { useRekam } from "../../hooks/useRekam";
import { formatJadwalDateTime } from "../../utils/formatTanggalIndonesia";
import { parseSpesialis } from "../../utils/praktek";
import { CalendarIcon, ClockIcon } from "../icon";
import DokterProfileCard from "../Konsultasi/DokterProfileCard";

const KotakKonfirmasi = ({ data, dateTime }) => {
  const { praktekRekam, isLoading, getByPraktek } = useRekam();

  useEffect(() => {
    if (data?.id_praktek) {
      getByPraktek(data.id_praktek);
    }
  }, [data?.id_praktek]);

  const dilayani = (praktekRekam?.rekam_medis ?? []).length;

  const jadwalTerpilih = useMemo(() => {
    if (!dateTime?.day || !dateTime?.time) return null;
    return formatJadwalDateTime(dateTime.day, dateTime.time);
  }, [dateTime]);

  const whileLoading = (value) => (isLoading ? "..." : value);

  return (
    <DokterProfileCard
      photoUrl={data?.dokter?.url_photo}
      name={data?.dokter?.user?.username}
      pengalaman={data?.dokter?.pengalaman ?? 0}
      rating={whileLoading(praktekRekam?.praktek?.rating ?? "-")}
      dilayani={whileLoading(dilayani)}
      spesialisList={parseSpesialis(data?.spesialis)}
      klinik={data?.dokter?.nama_klinik}
    >
      <div className="rounded-2xl bg-[#F0A93B] p-4 text-[#1E3A34]">
        <p className="text-sm font-semibold">Jadwal yang dipilih</p>

        {jadwalTerpilih ? (
          <div className="mt-3 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <CalendarIcon size={18} className="shrink-0" />
              <span className="font-semibold">{jadwalTerpilih.date}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ClockIcon size={18} className="shrink-0" />
              <span className="font-semibold">{jadwalTerpilih.time} WIB</span>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm">Waktu belum dipilih</p>
        )}
      </div>
    </DokterProfileCard>
  );
};

export default KotakKonfirmasi;
