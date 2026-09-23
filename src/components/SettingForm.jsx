import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/userSlice";
import { EditIcon, MapPinIcon, StethoscopeIcon, UserIcon } from "./icon";
import Button from "./UI/Button";
import Input from "./UI/Input";
import SectionCard from "./UI/SectionCard";

const SettingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user,
  );

  const [username, setUsername] = useState("");
  const [kontak, setKontak] = useState("");
  const [alamat, setAlamat] = useState("");
  const [urlPhoto, setUrlPhoto] = useState(null);
  const [pengalaman, setPengalaman] = useState("");
  const [namaKlinik, setNamaKlinik] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState("");

  useEffect(() => {
    if (!user && isError) {
      navigate("/login");
    } else if (user) {
      const role = user.role;
      const detail = user[role] || {};

      setUsername(user.username || "");
      setKontak(detail.kontak && detail.kontak !== "null" ? detail.kontak : "");
      setAlamat(detail.alamat && detail.alamat !== "null" ? detail.alamat : "");
      setPreviewPhoto(detail.url_photo || "");

      if (role === "dokter") {
        setPengalaman(
          detail.pengalaman && detail.pengalaman !== "null"
            ? detail.pengalaman
            : "",
        );
        setNamaKlinik(
          detail.nama_klinik && detail.nama_klinik !== "null"
            ? detail.nama_klinik
            : "",
        );
      }
    }
  }, [user, isError, navigate]);

  const loadImage = (event) => {
    const image = event.target.files[0];
    if (image) {
      setUrlPhoto(image);
      setPreviewPhoto(URL.createObjectURL(image));
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id_user: user.id_user,
        role: user.role,
        username,
        kontak,
        alamat,
        url_photo: urlPhoto,
      };

      if (user.role === "dokter") {
        payload.pengalaman = pengalaman;
        payload.nama_klinik = namaKlinik;
      }

      await dispatch(updateProfile(payload)).unwrap();
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="flex min-h-[280px] items-center justify-center font-jakarta text-[#6B7280]">
        Memuat data pengguna...
      </div>
    );
  }

  if (!user) return null;

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex flex-col gap-5 font-jakarta mt-[24px]"
    >
      <SectionCard icon={UserIcon} title="Foto profil">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-full border-2 border-[#EAE5D8] bg-[#FBF8F2] sm:h-28 sm:w-28">
              {previewPhoto ? (
                <img
                  src={previewPhoto}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserIcon size={36} className="text-[#B4AFA2]" />
              )}
            </div>

            <label
              htmlFor="foto"
              className="absolute -bottom-1 -right-1 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-[#F0A93B] text-white shadow-[0_6px_16px_-6px_rgba(240,169,59,0.7)] transition hover:bg-[#DB9426]"
            >
              <EditIcon size={16} />
            </label>
            <input
              type="file"
              id="foto"
              accept="image/*"
              className="hidden"
              onChange={loadImage}
            />
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-[#1E3A34]">{username || "-"}</p>
            <p className="mt-0.5 text-sm text-[#6B7280]">
              Klik ikon kamera untuk mengganti foto profil
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={UserIcon} title="Data diri">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            id="kontak"
            label="Nomor telepon"
            value={kontak}
            onChange={(e) => setKontak(e.target.value)}
            placeholder="Contoh: 081234567890"
          />
          <div className="sm:col-span-2">
            <Input
              id="alamat"
              label="Alamat"
              icon={MapPinIcon}
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Masukkan alamat lengkap"
            />
          </div>
        </div>
      </SectionCard>

      {user.role === "dokter" && (
        <SectionCard icon={StethoscopeIcon} title="Data praktek">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="nama_klinik"
              label="Nama klinik"
              value={namaKlinik}
              onChange={(e) => setNamaKlinik(e.target.value)}
              placeholder="Contoh: Klinik Sehat Selalu"
            />
            <Input
              id="pengalaman"
              label="Pengalaman (tahun)"
              type="number"
              min="0"
              value={pengalaman}
              onChange={(e) => setPengalaman(e.target.value)}
              placeholder="Contoh: 5"
            />
          </div>
        </SectionCard>
      )}

      <section className="rounded-3xl bg-white border border-[#EAE5D8] p-5 sm:p-6 shadow-[0_10px_30px_-18px_rgba(30,58,52,0.35)]">
        {message && (
          <p
            role={isError ? "alert" : "status"}
            className={`mb-4 rounded-xl px-3.5 py-2.5 text-sm ${
              isError
                ? "bg-[#FDECE8] text-[#C4432E]"
                : "bg-[#E6F4EC] text-[#1F7A4D]"
            }`}
          >
            {message}
          </p>
        )}

        <Button type="submit" isLoading={isLoading} loadingText="Menyimpan...">
          Simpan Perubahan
        </Button>
      </section>
    </form>
  );
};

export default SettingForm;
