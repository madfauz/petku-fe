import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHewan } from "../../hooks/useHewan";
import { useMetodePembayaran } from "../../hooks/useMetodePembayaran";
import { useJadwal } from "../../hooks/useJadwal";
import {
  formatJadwalDateTime,
  stringifyJadwalDateTime,
} from "../../utils/formatTanggalIndonesia";
import { rupiah } from "../../utils/rupiah";
import { ClockIcon, PawIcon, UserIcon } from "../icon";
import Button from "../UI/Button";
import Input from "../UI/Input";
import SectionCard from "../UI/SectionCard";
import Select from "../UI/Select";

const KotakKonfirmasiDiri = ({ data, dateTime }) => {
  const navigate = useNavigate();
  const { practice, user } = data;
  const idPraktek = practice?.id_praktek;

  const { myHewan, getByUser: getHewanByUser } = useHewan();
  const { metodeList, getAll: getAllMetode } = useMetodePembayaran();
  const { create: createJadwal, isLoading } = useJadwal();

  const [idHewan, setIdHewan] = useState("");
  const [idMetode, setIdMetode] = useState("");
  const [formError, setFormError] = useState("");

  const dateTimeFormat = useMemo(() => {
    if (!dateTime?.day || !dateTime?.time) return null;
    return formatJadwalDateTime(dateTime.day, dateTime.time);
  }, [dateTime]);

  useEffect(() => {
    getHewanByUser();
    getAllMetode();
  }, []);

  useEffect(() => {
    if (myHewan?.length > 0 && !idHewan) {
      setIdHewan(myHewan[0].id_hewan);
    }
  }, [myHewan]);

  useEffect(() => {
    if (metodeList?.length > 0 && !idMetode) {
      setIdMetode(metodeList[0].id_metode_pembayaran);
    }
  }, [metodeList]);

  const metodeTerpilih = metodeList?.find(
    (m) => m.id_metode_pembayaran === idMetode,
  );
  const hargaPraktek = practice?.promo
    ? practice?.harga_promo
    : practice?.harga;
  const pajak = metodeTerpilih?.pajak ?? 0;
  const estimasiTotal = (hargaPraktek ?? 0) + pajak;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!idHewan) {
      setFormError("Kamu belum memiliki hewan yang bisa dirujuk.");
      return;
    }
    if (!idMetode) {
      setFormError("Pilih metode pembayaran terlebih dahulu.");
      return;
    }
    if (!dateTimeFormat) {
      setFormError("Waktu janji temu belum dipilih.");
      return;
    }

    try {
      await createJadwal({
        id_praktek: idPraktek,
        id_dokter: practice?.id_dokter,
        id_metode_pembayaran: idMetode,
        id_hewan: idHewan,
        waktu_dipilih_pelanggan: stringifyJadwalDateTime(dateTimeFormat),
      });

      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Create Jadwal Error:", error);
      setFormError(
        error?.response?.data?.errors ||
          error.message ||
          "Terjadi kesalahan saat membuat janji temu.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 font-jakarta min-w-0"
    >
      <SectionCard icon={UserIcon} title="Data pemilik">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="namaPemilik"
            label="Nama pemilik"
            value={user?.username ?? ""}
            disabled
          />
          <Input id="email" label="Email" value={user?.email ?? ""} disabled />
          <Input
            id="kontak"
            label="Nomor telepon"
            value={user?.pelanggan?.kontak ?? ""}
          />
          <Input
            id="alamat"
            label="Alamat"
            value={user?.pelanggan?.alamat ?? ""}
          />
        </div>
      </SectionCard>

      <SectionCard icon={PawIcon} title="Hewan & pembayaran">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            id="hewan"
            label="Hewan yang dirujuk"
            value={idHewan}
            onChange={setIdHewan}
            options={myHewan?.map((h) => ({
              value: h.id_hewan,
              label: h.nama,
            }))}
            emptyLabel="Kamu belum punya hewan"
          />
          <Select
            id="metode"
            label="Metode pembayaran"
            value={idMetode}
            onChange={setIdMetode}
            options={metodeList?.map((m) => ({
              value: m.id_metode_pembayaran,
              label: `${m.nama} (pajak ${rupiah(m.pajak)})`,
            }))}
            emptyLabel="Metode pembayaran belum tersedia"
          />
        </div>
      </SectionCard>

      <section className="rounded-3xl bg-white border border-[#EAE5D8] p-5 sm:p-6 shadow-[0_10px_30px_-18px_rgba(30,58,52,0.35)]">
        <h2 className="font-fredoka text-lg sm:text-xl font-semibold text-[#1E3A34]">
          Ringkasan transaksi
        </h2>

        <div className="mt-4 flex flex-col gap-2.5">
          {[
            ["Harga praktek", rupiah(hargaPraktek)],
            [`Pajak (${metodeTerpilih?.nama ?? "-"})`, rupiah(pajak)],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 text-[15px]"
            >
              <span className="text-[#6B7280]">{label}</span>
              <span className="font-semibold text-[#1E3A34]">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-dashed border-[#D9D3C3] pt-4">
          <span className="font-semibold text-[#1E3A34]">Total</span>
          <span className="font-fredoka text-3xl font-semibold text-[#1E3A34]">
            {rupiah(estimasiTotal)}
          </span>
        </div>

        {formError && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-[#FDECE8] px-3.5 py-2.5 text-sm text-[#C4432E]"
          >
            {formError}
          </p>
        )}

        <Button type="submit" isLoading={isLoading} className="mt-5">
          Buat Janji Temu
        </Button>

        <p className="mt-4 flex items-start gap-2 text-sm text-[#6B7280]">
          <ClockIcon size={16} className="mt-0.5 shrink-0 text-[#B87A12]" />
          Janji temu dokter dapat dilakukan 3 jam sebelum jam praktik
        </p>
      </section>
    </form>
  );
};

export default KotakKonfirmasiDiri;
