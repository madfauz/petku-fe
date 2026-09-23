import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../icon";

const TitleCard = ({
  children,
  className = "w-[92%] md:w-[86%] xl:w-[80%] mx-auto",
}) => {
  const [showBack, backTo, title, actionLabel, actionTo] = children;

  return (
    <div
      className={`h-max flex justify-between items-center gap-3 font-jakarta ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {showBack && (
          <Link
            to={backTo}
            aria-label="Kembali"
            className="grid place-items-center w-10 h-10 shrink-0 rounded-full bg-white border border-[#1E3A34]/10 text-[#1E3A34] shadow-sm hover:bg-[#1E3A34] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] transition"
          >
            <ArrowLeftIcon size={20} />
          </Link>
        )}
        <h3 className="font-fredoka text-xl md:text-3xl font-semibold text-[#1E3A34] truncate">
          {title}
        </h3>
      </div>

      {actionLabel && (
        <Link
          to={actionTo}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="shrink-0 rounded-full bg-[#F0A93B]/15 px-4 py-2 text-sm md:text-base font-semibold text-[#1E3A34] hover:bg-[#F0A93B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] transition"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default TitleCard;
