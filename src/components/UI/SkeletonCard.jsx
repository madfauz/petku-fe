export default function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-[#EAE5D8] bg-white animate-pulse ${className}`}
    >
      <div className="aspect-[4/3] w-full bg-[#F1ECDF]" />
      <div className="flex flex-col gap-2 p-3 sm:gap-2.5 sm:p-4">
        <div className="h-5 w-3/4 rounded-full bg-[#F1ECDF]" />
        <div className="flex gap-1.5">
          <div className="h-5 w-16 rounded-full bg-[#F1ECDF]" />
          <div className="h-5 w-16 rounded-full bg-[#F1ECDF]" />
        </div>
        <div className="h-6 w-1/2 rounded-full bg-[#F1ECDF]" />
        <div className="mt-2 h-10 w-full rounded-xl bg-[#F1ECDF]" />
      </div>
    </div>
  );
}
