import { Link } from "react-router-dom";
import capitalizeWords from "../../utils/capitalizeWords";
import { rupiah } from "../../utils/rupiah";
import { StarIcon } from "../icon";

const PraktekCard = ({ practice, rating, className = "" }) => {
  const isPromo = practice.promo && practice.harga_promo != null;
  const spesialis = practice.spesialis ?? [];

  return (
    <Link
      to={`/konsultasi/${practice.id_praktek}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group flex flex-col overflow-hidden rounded-3xl border border-[#EAE5D8] bg-white font-jakarta hover:border-[#F0A93B] hover:shadow-[0_18px_40px_-20px_rgba(30,58,52,0.45)] transition duration-300 ${className}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAF2E9]">
        <img
          src={practice.dokter.url_photo}
          alt={practice.dokter.username}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/300x300?text=Dokter";
          }}
        />

        {rating != null && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 shadow-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1">
            <StarIcon size={12} />
            <span className="text-xs font-bold text-[#1E3A34]">
              {Number(rating).toFixed(1)}
            </span>
          </div>
        )}

        {isPromo && (
          <span className="absolute right-2 top-2 rounded-full bg-[#F0A93B] px-2 py-0.5 text-[11px] font-bold sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs text-[#1E3A34]">
            Promo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
        <h3 className="line-clamp-1 font-fredoka text-base font-semibold sm:text-lg text-[#1E3A34]">
          {capitalizeWords(practice.dokter.username)}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {spesialis.slice(0, 2).map((s, i) => (
            <span
              key={i}
              className="rounded-full bg-[#EAF2E9] px-2 py-0.5 text-[11px] font-medium sm:px-2.5 sm:text-xs capitalize text-[#1E3A34]/80"
            >
              {s}
            </span>
          ))}
          {spesialis.length > 2 && (
            <span className="rounded-full bg-[#F0A93B]/15 px-2 py-0.5 text-[11px] font-semibold sm:px-2.5 sm:text-xs text-[#B87A12]">
              +{spesialis.length - 2}
            </span>
          )}
        </div>

        <div className="mt-auto pt-2">
          <p className="font-fredoka text-lg font-semibold text-[#1E3A34] sm:text-xl">
            {rupiah(isPromo ? practice.harga_promo : practice.harga)}
          </p>
          {isPromo && (
            <p className="text-xs text-[#9CA3AF] line-through">
              {rupiah(practice.harga)}
            </p>
          )}
        </div>

        <span className="mt-1 block rounded-xl bg-[#F0A93B] py-2 text-center text-xs font-bold sm:mt-2 sm:py-2.5 sm:text-sm text-[#1E3A34] transition duration-300 group-hover:bg-[#1E3A34] group-hover:text-white">
          Buat Janji Temu
        </span>
      </div>
    </Link>
  );
};

export default PraktekCard;
