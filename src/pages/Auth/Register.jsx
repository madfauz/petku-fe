import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/userSlice";
import {
  UserIcon,
  EmailIcon,
  LockIcon,
  PawIcon,
  StethoscopeIcon,
} from "../../components/icon";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import CardSelectGroup from "../../components/UI/CardSelectGroup";

const ROLE_OPTIONS = [
  {
    value: "pelanggan",
    label: "Pelanggan",
    desc: "Konsultasi & rawat hewan",
    Icon: PawIcon,
  },
  {
    value: "dokter",
    label: "Dokter",
    desc: "Buka praktek konsultasi",
    Icon: StethoscopeIcon,
  },
];

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("pelanggan");
  const [localError, setLocalError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/login");
    }
  }, [isSuccess, navigate, dispatch]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    dispatch(
      register({
        username,
        email,
        password,
        confirm_password: confirmPassword,
        role,
      }),
    );
  };

  const errorMessage =
    localError ||
    (isError && typeof message === "string" ? message.split(".")[0] : "");

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

        <div className="relative z-10 flex items-center gap-2">
          <PawIcon size={30} className="text-[#F0A93B]" />
          <span className="font-fredoka text-2xl text-white font-semibold">
            PetKu
          </span>
        </div>

        <div className="relative z-10 max-w-sm">
          <h1 className="font-fredoka text-[2.1rem] leading-tight text-white font-semibold">
            Mulai jaga kesehatan hewanmu.
          </h1>
          <p className="mt-4 text-[#C8DCD3] text-[15px] leading-relaxed">
            Daftar sebagai pelanggan untuk konsultasi hewan peliharaanmu, atau
            sebagai dokter untuk membuka praktek konsultasi.
          </p>
        </div>

        <p className="relative z-10 text-[#C8DCD3] text-xs">
          © {new Date().getFullYear()} PetKu. Kesehatan hewan, lebih dekat.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-[420px]">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <PawIcon size={26} className="text-[#F0A93B]" />
            <span className="font-fredoka text-xl text-[#1E3A34] font-semibold">
              PetKu
            </span>
          </div>

          <h2 className="font-fredoka text-[1.9rem] text-[#1E3A34] font-semibold">
            Halo, ayo mulai
          </h2>
          <p className="mt-2 text-[15px] text-[#6B7280]">
            Daftar untuk melanjutkan ke PetKu.
          </p>

          <form className="mt-7 flex flex-col gap-4" onSubmit={handlerSubmit}>
            <Input
              id="username"
              label="Username"
              placeholder="Nama kamu"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={UserIcon}
              required
            />

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
              label="Kata sandi"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={LockIcon}
              required
              minLength={6}
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Konfirmasi kata sandi"
              placeholder="Ulangi kata sandi"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={LockIcon}
              required
              minLength={6}
            />

            <CardSelectGroup
              label="Daftar sebagai"
              options={ROLE_OPTIONS}
              value={role}
              onChange={setRole}
            />

            {errorMessage && (
              <p
                role="status"
                className="text-sm rounded-lg px-3.5 py-2.5 bg-[#FDECE8] text-[#C4432E]"
              >
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="mt-1"
            >
              Daftar
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-[#6B7280]">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#1E3A34] hover:text-[#F0A93B] transition"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
