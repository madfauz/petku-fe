import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJadwal } from "../../hooks/useJadwal";
import { useRekam } from "../../hooks/useRekam";
import { useTransaksi } from "../../hooks/useTransaksi";
import { rupiah } from "../../utils/rupiah";
import Button from "../UI/Button";
import RatingStars from "../UI/RatingStars";
import Textarea from "../UI/Textarea";

const KotakAksiJadwal = ({ data, user, onRefresh }) => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  const [saved, setSaved] = useState(
    data?.rekam_medis?.rating != null
      ? {
          rating: data.rekam_medis.rating,
          komentar: data.rekam_medis.komentar ?? "",
        }
      : null,
  );
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState(saved?.rating ?? 0);
  const [komentar, setKomentar] = useState(saved?.komentar ?? "");

  const [noteOpen, setNoteOpen] = useState(false);
  const [catatan, setCatatan] = useState(
    data?.rekam_medis?.catatan_pasien ?? "",
  );

  const {
    updateStatusByDokter,
    update,
    deleteById,
    isLoading: isJadwalLoading,
  } = useJadwal();
  const {
    createTransaction,
    pay,
    verify,
    isLoading: isTransaksiLoading,
  } = useTransaksi();
  const {
    updateRekam,
    updateCatatanPasien,
    isLoading: isRekamLoading,
    isSuccess: isRekamSuccess,
    message: rekamMessage,
  } = useRekam();

  if (!data) return null;

  const isDokter = user?.role === "dokter" && data.id_dokter === user.id_user;
  const isPelanggan =
    user?.role === "pelanggan" && data.id_pelanggan === user.id_user;

  const isProcessing = isJadwalLoading || isTransaksiLoading || isRekamLoading;

  const canConfirm = isDokter && data.status === "pending";
  const canPay =
    isPelanggan &&
    data.status === "confirmed" &&
    data.status_pembayaran === "unpaid";
  const canCancel =
    isPelanggan &&
    data.status === "pending" &&
    data.status_pembayaran === "unpaid";
  const canRate =
    isPelanggan &&
    data.status === "selesai" &&
    data.status_pembayaran === "paid";
  const canNote =
    isDokter &&
    data.status === "confirmed" &&
    data.status_pembayaran === "paid";

  const handleConfirm = async (status) => {
    setFormError("");
    try {
      await updateStatusByDokter(data.id_temu, status);
      onRefresh();
    } catch (error) {
      setFormError(
        error?.response?.data?.errors ||
          error.message ||
          "Gagal memperbarui status jadwal.",
      );
    }
  };

  const handleDelete = async () => {
    setFormError("");
    try {
      await deleteById(data.id_temu);
      navigate("/");
    } catch (error) {
      setFormError(
        error?.response?.data?.errors ||
          error.message ||
          "Gagal menghapus jadwal.",
      );
    }
  };

  const handlePay = async () => {
    setFormError("");
    try {
      const transaction = await createTransaction(data.id_temu);

      const handleSuccessVerification = async () => {
        try {
          await verify(data.id_temu);
        } catch (err) {
          console.error("Gagal verifikasi status:", err);
        } finally {
          onRefresh();
        }
      };

      pay(transaction.token, {
        onSuccess: () => {
          handleSuccessVerification();
        },
        onPending: () => {
          onRefresh();
        },
        onError: (result) => {
          setFormError("Pembayaran gagal. " + JSON.stringify(result));
        },
        onClose: () => {
          handleSuccessVerification();
        },
      });
    } catch (error) {
      setFormError(
        error?.response?.data?.errors ||
          error.message ||
          "Gagal memulai pembayaran.",
      );
    }
  };

  const handleRate = async (e) => {
    e.preventDefault();
    setFormError("");

    if (rating < 1) {
      setFormError("Pilih rating terlebih dahulu.");
      return;
    }

    try {
      await updateRekam({
        id_temu: data.id_temu,
        komentar: komentar.trim(),
        rating,
      });
      setSaved({ rating, komentar: komentar.trim() });
      setRatingOpen(false);
    } catch (error) {
      setFormError(
        error?.response?.data?.errors ||
          error.message ||
          "Gagal menyimpan penilaian.",
      );
    }
  };

  const handleNote = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!catatan.trim()) {
      setFormError("Catatan pasien belum diisi.");
      return;
    }

    let noteSaved = false;
    try {
      await updateCatatanPasien({
        id_temu: data.id_temu,
        catatan_pasien: catatan.trim(),
      });
      noteSaved = true;
      await updateStatusByDokter(data.id_temu, "selesai");
      onRefresh();
    } catch (error) {
      setFormError(
        noteSaved
          ? "Catatan tersimpan, tetapi status jadwal gagal diubah menjadi selesai. Coba simpan lagi."
          : error?.response?.data?.errors ||
              error.message ||
              "Gagal menyimpan catatan pasien.",
      );
    }
  };

  const cancelNote = () => {
    setCatatan(data?.rekam_medis?.catatan_pasien ?? "");
    setFormError("");
    setNoteOpen(false);
  };

  const cancelRate = () => {
    setRating(saved?.rating ?? 0);
    setKomentar(saved?.komentar ?? "");
    setFormError("");
    setRatingOpen(false);
  };

  return (
    <section className="rounded-3xl bg-white border border-[#EAE5D8] p-5 sm:p-6 shadow-[0_10px_30px_-18px_rgba(30,58,52,0.35)]">
      <h2 className="font-fredoka text-lg sm:text-xl font-semibold text-[#1E3A34]">
        Aksi
      </h2>

      <div className="mt-4 flex items-center justify-between gap-4 border-b border-dashed border-[#D9D3C3] pb-4">
        <span className="font-semibold text-[#1E3A34]">Total</span>
        <span className="font-fredoka text-2xl font-semibold text-[#1E3A34]">
          {rupiah(data.total_harga ?? 0)}
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

      <div className="mt-5 flex flex-col gap-3">
        {canConfirm && (
          <>
            <Button
              type="button"
              isLoading={isProcessing}
              onClick={() => handleConfirm("confirmed")}
            >
              Konfirmasi Jadwal
            </Button>
            <Button
              type="button"
              variant="secondary"
              isLoading={isProcessing}
              onClick={() => handleConfirm("batal")}
            >
              Batalkan Jadwal
            </Button>
          </>
        )}

        {canPay && (
          <Button type="button" isLoading={isProcessing} onClick={handlePay}>
            Bayar Sekarang
          </Button>
        )}

        {canNote &&
          (noteOpen ? (
            <form
              onSubmit={handleNote}
              className="flex flex-col gap-4 rounded-2xl border border-[#EAE5D8] p-4"
            >
              <Textarea
                id="catatan"
                label="Catatan pasien"
                rows={5}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Tulis diagnosis, tindakan, dan saran untuk pemilik hewan..."
              />
              <p className="text-xs text-[#6B7280]">
                Setelah catatan disimpan, jadwal ini akan ditandai selesai.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isProcessing}
                  onClick={cancelNote}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  isLoading={isProcessing}
                  loadingText="Menyimpan..."
                >
                  Simpan
                </Button>
              </div>
            </form>
          ) : (
            <Button type="button" onClick={() => setNoteOpen(true)}>
              Isi Catatan & Selesaikan
            </Button>
          ))}

        {canCancel && (
          <Button
            type="button"
            variant="secondary"
            isLoading={isProcessing}
            onClick={handleDelete}
          >
            Batalkan & Hapus Jadwal
          </Button>
        )}

        {canRate && (
          <>
            {saved && !ratingOpen && (
              <div className="rounded-2xl bg-[#FBF8F2] p-4">
                <p className="text-sm font-semibold text-[#1E3A34]">
                  Penilaianmu
                </p>
                <RatingStars
                  value={saved.rating}
                  size={18}
                  className="mt-1.5"
                />
                {saved.komentar && (
                  <p className="mt-2 break-words text-sm text-[#4B5563]">
                    {saved.komentar}
                  </p>
                )}
              </div>
            )}

            {isRekamSuccess && !ratingOpen && (
              <p
                role="status"
                className="rounded-xl bg-[#E6F4EC] px-3.5 py-2.5 text-sm text-[#1F7A4D]"
              >
                {rekamMessage}
              </p>
            )}

            {ratingOpen ? (
              <form
                onSubmit={handleRate}
                className="flex flex-col gap-4 rounded-2xl border border-[#EAE5D8] p-4"
              >
                <div>
                  <p className="mb-1 text-sm font-medium text-[#1E3A34]">
                    Bagaimana konsultasimu?
                  </p>
                  <RatingStars
                    value={rating}
                    size={32}
                    onChange={setRating}
                    className="-ml-1"
                  />
                </div>

                <Textarea
                  id="komentar"
                  label="Komentar (opsional)"
                  maxLength={255}
                  value={komentar}
                  onChange={(e) => setKomentar(e.target.value)}
                  placeholder="Ceritakan pengalaman konsultasimu..."
                />

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isProcessing}
                    onClick={cancelRate}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isProcessing}
                    loadingText="Menyimpan..."
                  >
                    Kirim
                  </Button>
                </div>
              </form>
            ) : (
              <Button
                type="button"
                variant={saved ? "outline" : "primary"}
                onClick={() => setRatingOpen(true)}
              >
                {saved ? "Ubah Penilaian" : "Berikan Penilaian"}
              </Button>
            )}
          </>
        )}

        {!(canConfirm || canPay || canCancel || canRate || canNote) && (
          <p className="text-sm text-[#6B7280]">
            Tidak ada aksi yang tersedia untuk jadwal ini saat ini.
          </p>
        )}
      </div>
    </section>
  );
};

export default KotakAksiJadwal;
