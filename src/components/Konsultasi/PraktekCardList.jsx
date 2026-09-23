import PraktekCard from "./PraktekCard";
import SkeletonCard from "../UI/SkeletonCard";
import ScrollRow from "../UI/ScrollRow";

const PraktekCardList = ({
  practices,
  isLoading,
  emptyMessage,
  wrap = false,
}) => {
  const itemClass = wrap ? "" : "w-[180px] sm:w-[230px] md:w-[250px] shrink-0";

  const content = isLoading ? (
    Array.from({ length: wrap ? 8 : 4 }, (_, i) => (
      <SkeletonCard key={i} className={itemClass} />
    ))
  ) : practices.length > 0 ? (
    practices.map((practice) => (
      <PraktekCard
        key={practice.id_praktek}
        practice={practice}
        rating={practice?.rating_average}
        className={itemClass}
      />
    ))
  ) : (
    <p className="col-span-full py-4 font-jakarta text-sm text-[#6B7280]">
      {emptyMessage ?? "Belum ada praktek dokter tersedia."}
    </p>
  );

  return wrap ? (
    <div className="grid grid-cols-2 gap-3 max-[359px]:grid-cols-1 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {content}
    </div>
  ) : (
    <ScrollRow>{content}</ScrollRow>
  );
};

export default PraktekCardList;
