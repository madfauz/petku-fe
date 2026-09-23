import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/userSlice";
import { EmailIcon, LockIcon, PawIcon } from "../../components/icon";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const errorMessage =
    isError && typeof message === "string" ? message.split(".")[0] : message;

  return (
    <section className="min-h-screen w-full flex bg-[#FBF8F2] font-jakarta">
      <div className="hidden lg:flex lg:w-[44%] relative bg-[#1E3A34] overflow-hidden flex-col justify-between px-12 py-12">
        <svg
          className="absolute -top-24 -right-28 w-[420px] h-[420px] opacity-90 pointer-events-none"
          viewBox="0 0 200 200"
        >
          <path
            fill="#F0A93B"
            d="M45.6,-58.6C58.6,-49.3,68.4,-34.4,71.9,-18.1C75.4,-1.7,72.6,16.2,63.9,30.5C55.2,44.8,40.5,55.6,24.1,62.1C7.7,68.6,-10.5,70.9,-27.1,66C-43.7,61.2,-58.7,49.1,-66.4,33.5C-74.1,17.9,-74.5,-1.3,-68.5,-17.6C-62.5,-33.9,-50.1,-47.4,-35.8,-56.5C-21.5,-65.7,-5.4,-70.5,9.9,-70.9C25.1,-71.3,32.6,-67.9,45.6,-58.6Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute -bottom-20 -left-16 w-[280px] h-[280px] opacity-40 pointer-events-none"
          viewBox="0 0 200 200"
        >
          <path
            fill="#EAF2E9"
            d="M39.5,-50.4C51.5,-41.8,61.4,-29.6,65.6,-15.3C69.8,-1,68.3,15.5,60.9,28.6C53.5,41.8,40.2,51.6,25.6,57.8C11.1,64,-4.7,66.6,-19.8,63.1C-34.9,59.6,-49.3,50,-58.1,36.6C-66.9,23.2,-70.1,6,-66.8,-9.6C-63.5,-25.3,-53.8,-39.4,-41.1,-48.1C-28.4,-56.8,-14.2,-60.2,0.5,-60.9C15.2,-61.6,27.6,-59,39.5,-50.4Z"
            transform="translate(100 100)"
          />
        </svg>

        <div className="relative z-10 flex items-center gap-2">
          <PawIcon size={30} className="text-[#F0A93B]" />
          <span className="font-fredoka text-2xl text-white font-semibold">
            PetKu
          </span>
        </div>

        <div className="relative z-10 max-w-sm">
          <h1 className="font-fredoka text-[2.1rem] leading-tight text-white font-semibold">
            Teman jaga kesehatan hewanmu.
          </h1>
          <p className="mt-4 text-[#C8DCD3] text-[15px] leading-relaxed">
            Konsultasi dengan dokter hewan, atur jadwal praktek, dan simpan
            rekam medis peliharaanmu — semua dalam satu tempat.
          </p>
        </div>

        <p className="relative z-10 text-[#C8DCD3] text-xs">
          © {new Date().getFullYear()} PetKu. Kesehatan hewan, lebih dekat.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-[400px]">
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <PawIcon size={26} className="text-[#F0A93B]" />
            <span className="font-fredoka text-xl text-[#1E3A34] font-semibold">
              PetKu
            </span>
          </div>

          <h2 className="font-fredoka text-[1.9rem] text-[#1E3A34] font-semibold">
            Selamat datang kembali
          </h2>
          <p className="mt-2 text-[15px] text-[#6B7280]">
            Masuk untuk melanjutkan konsultasi hewan peliharaanmu.
          </p>

          <form className="mt-8 flex flex-col gap-5" onSubmit={handlerSubmit}>
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={EmailIcon}
              required
            />

            <Input
              id="password"
              type="password"
              label={
                <div className="flex items-center justify-between w-full">
                  <span>Kata sandi</span>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#F0A93B] hover:text-[#D6912B] transition"
                  >
                    Lupa sandi?
                  </Link>
                </div>
              }
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={LockIcon}
              required
            />

            {message && (
              <p
                role="status"
                className={`text-sm rounded-lg px-3.5 py-2.5 ${
                  isError
                    ? "bg-[#FDECE8] text-[#C4432E]"
                    : "bg-[#EAF2E9] text-[#2F6A4F]"
                }`}
              >
                {errorMessage}
              </p>
            )}

            <Button type="submit" variant="primary" isLoading={isLoading}>
              Masuk
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#6B7280]">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#1E3A34] hover:text-[#F0A93B] transition"
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
