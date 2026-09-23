import { Link } from "react-router-dom";
import { CalendarIcon } from "../icon";

const categoryColors = {
  "Kesehatan Hewan": "bg-red-50 text-red-700 border-red-200",
  "Perawatan Hewan": "bg-blue-50 text-blue-700 border-blue-200",
  "Nutrisi dan Makanan": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Perilaku Hewan": "bg-purple-50 text-purple-700 border-purple-200",
  "Vaksinasi dan Pencegahan": "bg-green-50 text-green-700 border-green-200",
  "Grooming dan Kebersihan": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Tips dan Trik": "bg-amber-50 text-amber-700 border-amber-200",
  "Pertolongan Pertama": "bg-orange-50 text-orange-700 border-orange-200",
};

const CardArtikel = ({ data = [], cardClassName = "" }) => (
  <>
    {data.map((item) => (
      <Link
        key={item.id_artikel}
        to={`/artikel/${item.id_artikel}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`group flex flex-col overflow-hidden rounded-3xl border border-[#EAE5D8] bg-white font-jakarta transition-all duration-300 hover:border-[#F0A93B] hover:shadow-[0_18px_40px_-20px_rgba(30,58,52,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] ${cardClassName}`}
      >
        <div className="flex flex-1 flex-col gap-3 p-4">
          <span
            className={`inline-block w-fit max-w-[200px] truncate rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
              categoryColors[item.kategori] ||
              "bg-gray-50 text-gray-700 border-gray-200"
            }`}
            title={item.kategori}
          >
            {item.kategori}
          </span>

          <h3
            className="min-h-[3rem] line-clamp-2 break-words font-fredoka text-base font-semibold leading-snug text-[#1E3A34] transition-colors group-hover:text-[#F0A93B]"
            title={item.judul}
          >
            {item.judul}
          </h3>

          {item.meta_deskripsi && (
            <p className="min-h-[2rem] line-clamp-2 break-words text-xs text-[#6B7280]">
              {item.meta_deskripsi}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-3 text-sm text-[#6B7280]">
            <span className="flex min-w-0 items-center gap-1.5">
              <CalendarIcon size={16} className="shrink-0" />
              <span className="truncate text-xs">
                {new Date(item.createdAt).toLocaleDateString("id-ID")}
              </span>
            </span>
          </div>

          <button className="rounded-2xl bg-[#1E3A34] py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 group-hover:bg-[#F0A93B] group-hover:text-[#1E3A34]">
            Baca Selengkapnya
          </button>
        </div>
      </Link>
    ))}
  </>
);

export default CardArtikel;
