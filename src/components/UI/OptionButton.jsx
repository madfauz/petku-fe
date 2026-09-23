import { useNavigate, useSearchParams } from "react-router-dom";
import ScrollRow from "./ScrollRow";

const OptionButton = ({ children }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dataParam = searchParams.get("data");

  const onClick = (title) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (dataParam === title) {
      navigate("/konsultasi");
    } else {
      navigate(`/konsultasi?data=${encodeURIComponent(title)}`);
    }
  };

  return (
    <ScrollRow className="gap-2.5 py-1">
      {children.map((title) => {
        const active = dataParam === title;
        return (
          <button
            type="button"
            key={title}
            aria-pressed={active}
            onClick={() => onClick(title)}
            className={`shrink-0 rounded-full border px-4 py-2 font-jakarta text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] ${
              active
                ? "border-[#1E3A34] bg-[#1E3A34] text-white"
                : "border-[#E4E0D6] bg-white text-[#1E3A34] hover:border-[#F0A93B] hover:bg-[#F0A93B]/15"
            }`}
          >
            {title}
          </button>
        );
      })}
    </ScrollRow>
  );
};

export default OptionButton;
