import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon } from "../icon";
import { useDebounce } from "../../hooks/useDebounce";

const SearchBar = ({ children = "Cari dokter di sini" }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentParam = searchParams.get("data") ?? "";

  const [search, setSearch] = useState(currentParam);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const current = searchParams.get("data") ?? "";
    if (debouncedSearch === current) return;

    if (debouncedSearch.trim()) {
      navigate(
        `/konsultasi?data=${encodeURIComponent(debouncedSearch.trim())}`,
        {
          replace: true,
        },
      );
    } else if (current) {
      navigate("/konsultasi", { replace: true });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setSearch(currentParam);
  }, [currentParam]);

  return (
    <div className="flex w-full items-center rounded-full border border-[#E4E0D6] bg-white shadow-[0_10px_30px_-18px_rgba(30,58,52,0.35)] focus-within:border-[#F0A93B] focus-within:ring-2 focus-within:ring-[#F0A93B]/40 transition">
      <div className="m-1.5 shrink-0 rounded-full bg-[#F0A93B] p-3 text-[#1E3A34]">
        <SearchIcon size={18} />
      </div>
      <input
        className="w-full border-none bg-transparent px-3 py-3 font-jakarta text-sm text-[#1E3A34] outline-none placeholder:text-[#B4AFA2] focus:outline-none sm:text-base"
        type="search"
        name="search"
        aria-label="Cari dokter"
        placeholder={children}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
