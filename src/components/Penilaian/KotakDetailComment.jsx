import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useRekam } from "../../hooks/useRekam";
import capitalizeWords from "../../utils/capitalizeWords";
import { PawIcon } from "../icon";
import RatingStars from "../UI/RatingStars";
import generateDate from "../../utils/generateDate";

const StatBar = ({ label, count, total }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2.5 text-xs text-[#6B7280] sm:text-sm">
      <span className="w-3 shrink-0 text-right font-medium text-[#1E3A34]">
        {label}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#EAE5D8]">
        <div
          className="h-full rounded-full bg-[#F0A93B]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-6 shrink-0 text-right">{count}</span>
    </div>
  );
};

const KotakDetailComment = () => {
  const { id: id_praktek } = useParams();
  const { getByPraktek, praktekRekam, isLoading } = useRekam();

  useEffect(() => {
    if (id_praktek) {
      getByPraktek(id_praktek);
    }
  }, [id_praktek]);

  const komentarList = (praktekRekam?.rekam_medis ?? []).filter(
    (rekam) => rekam.tanggal_komentar !== null,
  );

  const { average, breakdown } = useMemo(() => {
    const rated = komentarList.filter((r) => typeof r.rating === "number");
    const avg =
      rated.length > 0
        ? rated.reduce((sum, r) => sum + r.rating, 0) / rated.length
        : 0;
    const counts = [5, 4, 3, 2, 1].map(
      (star) => rated.filter((r) => r.rating === star).length,
    );
    return { average: avg, breakdown: counts };
  }, [komentarList]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 font-jakarta" aria-busy="true">
        <div className="h-28 rounded-3xl bg-[#FBF8F2] animate-pulse" />
        <div className="h-28 rounded-3xl bg-[#FBF8F2] animate-pulse" />
        <div className="h-28 rounded-3xl bg-[#FBF8F2] animate-pulse" />
      </div>
    );
  }

  if (komentarList.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-[#D9D3C3] px-4 py-14 text-center font-jakarta">
        <PawIcon size={30} className="text-[#F0A93B]" />
        <p className="text-sm text-[#6B7280]">
          Belum ada penilaian untuk praktek ini.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 font-jakarta">
      <section className="flex flex-col gap-5 rounded-3xl border border-[#EAE5D8] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(30,58,52,0.35)] sm:p-6 md:flex-row md:items-center">
        <div className="flex shrink-0 flex-col items-center gap-1 md:w-40 md:border-r md:border-[#EAE5D8] md:pr-6">
          <p className="font-fredoka text-4xl font-semibold text-[#1E3A34]">
            {average.toFixed(1)}
          </p>
          <RatingStars value={Math.round(average)} size={16} />
          <p className="text-xs text-[#6B7280]">
            {komentarList.length} penilaian
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          {[5, 4, 3, 2, 1].map((star, i) => (
            <StatBar
              key={star}
              label={star}
              count={breakdown[i]}
              total={komentarList.length}
            />
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3">
        {komentarList.map((comment) => (
          <div
            key={comment.id_temu}
            className="flex flex-col gap-3 rounded-3xl border border-[#EAE5D8] bg-white p-4 shadow-[0_10px_30px_-18px_rgba(30,58,52,0.35)] sm:p-5"
          >
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#E5E1D6] ring-2 ring-[#F0A93B]/40 sm:h-12 sm:w-12">
                <img
                  src={comment?.pelanggan?.url_photo}
                  alt={comment?.pelanggan?.username ?? "pelanggan"}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/100x100?text=User";
                  }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <h3 className="truncate text-[15px] font-semibold text-[#1E3A34] sm:text-base">
                    {capitalizeWords(comment?.pelanggan?.username)}
                  </h3>
                  <span className="text-xs text-[#6B7280] sm:text-sm">
                    {generateDate(comment?.tanggal_komentar)}
                  </span>
                </div>
                <RatingStars
                  value={comment?.rating}
                  size={14}
                  className="mt-1"
                />
              </div>
            </div>

            {comment?.komentar && (
              <p className="break-words text-sm leading-relaxed text-[#4B5563] sm:text-[15px]">
                {comment.komentar}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KotakDetailComment;
