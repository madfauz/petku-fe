import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useRekam } from "../../hooks/useRekam";
import capitalizeWords from "../../utils/capitalizeWords";
import { PawIcon, StarIcon } from "../icon";
import RatingStars from "../UI/RatingStars";
import SectionCard from "../UI/SectionCard";
import generateDate from "../../utils/generateDate";

const PREVIEW_LIMIT = 2;

const KotakComment = () => {
  const { id } = useParams();
  const { praktekRekam, isLoading, getByPraktek } = useRekam();

  useEffect(() => {
    if (id) {
      getByPraktek(id);
    }
  }, [id]);

  const komentarList = (praktekRekam?.rekam_medis ?? []).filter(
    (rekam) => rekam.tanggal_komentar !== null,
  );
  const preview = komentarList.slice(0, PREVIEW_LIMIT);
  const hasMore = komentarList.length > PREVIEW_LIMIT;

  const detailPath = `/konsultasi/${id}/penilaian-detail`;

  return (
    <SectionCard
      icon={StarIcon}
      title="Penilaian & Ulasan"
      className="font-jakarta"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      action={
        !isLoading &&
        komentarList.length > 0 && (
          <Link
            to={detailPath}
            className="shrink-0 rounded-full bg-[#F0A93B]/15 px-4 py-1.5 text-sm font-semibold text-[#1E3A34] hover:bg-[#F0A93B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] transition"
          >
            {hasMore ? `Lihat semua (${komentarList.length})` : "Lihat semua"}
          </Link>
        )
      }
    >
      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2" aria-busy="true">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-[#FBF8F2] animate-pulse"
            />
          ))}
        </div>
      ) : preview.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {preview.map((comment) => (
            <Link
              key={comment.id_temu}
              to={detailPath}
              className="flex flex-col gap-3 rounded-2xl border border-[#EAE5D8] bg-[#FBF8F2] p-4 hover:bg-white hover:border-[#F0A93B] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 overflow-hidden rounded-full bg-[#E5E1D6]">
                  <img
                    src={comment?.pelanggan?.url_photo}
                    alt={comment?.pelanggan?.username ?? "pelanggan"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://placehold.co/100x100?text=User";
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-semibold text-[#1E3A34]">
                    {capitalizeWords(comment?.pelanggan?.username)}
                  </h3>
                  <RatingStars value={comment?.rating} size={13} />
                </div>

                <span className="shrink-0 text-xs text-[#6B7280]">
                  {generateDate(comment?.tanggal_komentar)}
                </span>
              </div>

              <p className="line-clamp-3 text-sm leading-relaxed text-[#4B5563]">
                {comment?.komentar}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#D9D3C3] px-4 py-10 text-center">
          <PawIcon size={28} className="text-[#F0A93B]" />
          <p className="text-sm text-[#6B7280]">
            Belum ada penilaian untuk praktek ini.
          </p>
        </div>
      )}
    </SectionCard>
  );
};

export default KotakComment;
