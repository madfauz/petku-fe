import { Fragment } from "react";

const STAR_PATH =
  "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z";

const RatingStars = ({ value = 0, size = 14, className = "", onChange }) => {
  const interactive = typeof onChange === "function";

  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role={interactive ? "radiogroup" : "img"}
      aria-label={interactive ? "Rating" : `Rating ${value ?? 0} dari 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const star = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="currentColor"
            className={i <= value ? "text-[#F0A93B]" : "text-[#E5E1D6]"}
            aria-hidden="true"
          >
            <path d={STAR_PATH} />
          </svg>
        );

        return interactive ? (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={i === value}
            aria-label={`${i} bintang`}
            onClick={() => onChange(i)}
            className="rounded-lg p-1 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B]"
          >
            {star}
          </button>
        ) : (
          <Fragment key={i}>{star}</Fragment>
        );
      })}
    </div>
  );
};

export default RatingStars;
