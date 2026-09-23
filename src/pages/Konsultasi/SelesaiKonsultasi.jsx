import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/UI/Button";
import { CalendarIcon } from "../../components/icon";

const SelesaiKonsultasi = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-12 font-jakarta">
        <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#EAE5D8] bg-white px-6 py-10 text-center shadow-[0_24px_60px_-30px_rgba(30,58,52,0.4)] sm:px-10">
          <svg
            className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 opacity-25"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path
              fill="#F0A93B"
              d="M45.6,-58.6C58.6,-49.3,68.4,-34.4,71.9,-18.1C75.4,-1.7,72.6,16.2,63.9,30.5C55.2,44.8,40.5,55.6,24.1,62.1C7.7,68.6,-10.5,70.9,-27.1,66C-43.7,61.2,-58.7,49.1,-66.4,33.5C-74.1,17.9,-74.5,-1.3,-68.5,-17.6C-62.5,-33.9,-50.1,-47.4,-35.8,-56.5C-21.5,-65.7,-5.4,-70.5,9.9,-70.9C25.1,-71.3,32.6,-67.9,45.6,-58.6Z"
              transform="translate(100 100)"
            />
          </svg>

          <div className="relative flex flex-col items-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-[#1E3A34] text-[#F0A93B] ring-8 ring-[#F0A93B]/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 5 5 9-10" />
              </svg>
            </span>

            <h1 className="mt-6 font-fredoka text-2xl font-semibold text-[#1E3A34] sm:text-3xl">
              Pemesanan Selesai
            </h1>
            <p className="mt-2 text-[15px] text-[#6B7280]">
              Terima kasih sudah melakukan konsultasi
            </p>

            <p className="mt-6 flex w-full items-start gap-2.5 rounded-2xl bg-[#FBF8F2] px-4 py-3 text-left text-sm text-[#6B7280]">
              <CalendarIcon
                size={18}
                className="mt-0.5 shrink-0 text-[#B87A12]"
              />
              Detail jadwal temu kamu bisa dilihat di halaman utama.
            </p>

            <Button
              className="mt-6"
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              Kembali ke Halaman Utama
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelesaiKonsultasi;
