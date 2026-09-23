import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useJadwal } from "../../hooks/useJadwal";
import { formatTanggalPanjang } from "../../utils/formatTanggalPanjang";
import { rupiah } from "../../utils/rupiah";
import capitalizeWords from "../../utils/capitalizeWords";
import { PawIcon } from "../icon";

const getTanggalLabel = (jadwal) => {
  const viaPembayaran = formatTanggalPanjang(jadwal?.tanggal_pembayaran);
  if (viaPembayaran) return viaPembayaran;

  try {
    const { date } = JSON.parse(jadwal?.waktu_dipilih_pelanggan);
    return date || "Tanggal tidak diketahui";
  } catch {
    return "Tanggal tidak diketahui";
  }
};

const KotakPembayaran = () => {
  const { user } = useSelector((state) => state.user);
  const isDokter = user?.role === "dokter";

  const { myJadwal, isLoading, isError, message, getByUser } = useJadwal();

  useEffect(() => {
    if (user?.id_user) {
      getByUser();
    }
  }, [user?.id_user]);

  const jadwalList = myJadwal ?? [];

  const { groups, totalTransaksi, totalDibayar } = useMemo(() => {
    const map = new Map();
    let paidTotal = 0;

    for (const jadwal of jadwalList) {
      const label = getTanggalLabel(jadwal);
      if (!map.has(label)) map.set(label, []);
      map.get(label).push(jadwal);

      if (jadwal?.status_pembayaran === "paid") {
        paidTotal += jadwal?.total_harga ?? 0;
      }
    }

    return {
      groups: Array.from(map.entries()),
      totalTransaksi: jadwalList.length,
      totalDibayar: paidTotal,
    };
  }, [jadwalList]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 font-jakarta" aria-busy="true">
        <div className="h-20 rounded-3xl bg-[#FBF8F2] animate-pulse" />
        <div className="h-24 rounded-3xl bg-[#FBF8F2] animate-pulse" />
        <div className="h-24 rounded-3xl bg-[#FBF8F2] animate-pulse" />
      </div>
    );
  }

  if (isError) {
    return (
      <p
        role="alert"
        className="rounded-2xl bg-[#FDECE8] px-4 py-3 text-sm text-[#C4432E] font-jakarta"
      >
        {message || "Gagal memuat riwayat pembayaran."}
      </p>
    );
  }

  if (jadwalList.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-[#D9D3C3] px-4 py-14 text-center font-jakarta">
        <PawIcon size={30} className="text-[#F0A93B]" />
        <p className="text-sm text-[#6B7280]">Belum ada riwayat pembayaran.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 font-jakarta">
      <section className="grid grid-cols-2 gap-3 rounded-3xl border border-[#EAE5D8] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(30,58,52,0.35)] sm:p-6">
        <div>
          <p className="text-xs text-[#6B7280] sm:text-sm">Total transaksi</p>
          <p className="font-fredoka text-2xl font-semibold text-[#1E3A34] sm:text-3xl">
            {totalTransaksi}
          </p>
        </div>
        <div className="border-l border-[#EAE5D8] pl-3 sm:pl-4">
          <p className="text-xs text-[#6B7280] sm:text-sm">Total dibayar</p>
          <p className="font-fredoka text-2xl font-semibold text-[#1E3A34] sm:text-3xl">
            {rupiah(totalDibayar)}
          </p>
        </div>
      </section>

      {groups.map(([label, items]) => (
        <section key={label} className="flex flex-col gap-3">
          <h2 className="px-1 text-sm font-semibold text-[#6B7280] sm:text-base">
            {label}
          </h2>

          <div className="flex flex-col gap-3">
            {items.map((jadwal) => {
              const lawan = isDokter ? jadwal?.pelanggan : jadwal?.dokter;
              const isPaid = jadwal?.status_pembayaran === "paid";

              return (
                <Link
                  key={jadwal.id_temu}
                  to={`/jadwal-rekam/${jadwal.id_temu}`}
                  className="flex items-center gap-3 rounded-3xl border border-[#EAE5D8] bg-white p-3.5 shadow-[0_10px_30px_-18px_rgba(30,58,52,0.35)] hover:border-[#F0A93B] hover:shadow-[0_14px_34px_-16px_rgba(30,58,52,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] transition sm:gap-4 sm:p-4"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#E5E1D6] ring-2 ring-[#F0A93B]/40 sm:h-14 sm:w-14">
                    <img
                      src={lawan?.url_photo}
                      alt={lawan?.user?.username ?? "pengguna"}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://placehold.co/100x100?text=User";
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[#1E3A34] sm:text-lg">
                      {capitalizeWords(lawan?.user?.username)}
                    </p>
                    <p className="truncate text-xs capitalize text-[#6B7280] sm:text-sm">
                      {jadwal?.status}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <p className="font-fredoka text-base font-semibold text-[#1E3A34] sm:text-xl">
                      {rupiah(jadwal?.total_harga ?? 0)}
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold sm:text-xs ${
                        isPaid
                          ? "bg-[#E6F4EC] text-[#1F7A4D]"
                          : "bg-[#FDECE8] text-[#C4432E]"
                      }`}
                    >
                      {isPaid ? "Sudah dibayar" : "Belum dibayar"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default KotakPembayaran;
