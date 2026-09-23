import { Link } from "react-router-dom";
import {
  CatDark,
  DogDark,
  HamsterDark,
  BirdDark,
  ChameleonDark,
  RabbitDark,
} from "../icon/PetIcon";
import { EditIcon, PawIcon, TrashIcon } from "../icon";
import SectionCard from "../UI/SectionCard";
import capitalizeWords from "../../utils/capitalizeWords";

const KotakListHewan = ({ data = [], handleDelete, isLoading }) => {
  const petIcons = {
    kucing: CatDark,
    anjing: DogDark,
    hamster: HamsterDark,
    burung: BirdDark,
    kelinci: RabbitDark,
  };

  return (
    <SectionCard
      icon={PawIcon}
      title="Hewan peliharaan mu"
      className="font-jakarta"
      action={
        !isLoading && (
          <span className="shrink-0 rounded-full bg-[#F0A93B]/15 px-3 py-1 text-sm font-semibold text-[#1E3A34]">
            {data?.length ?? 0} hewan
          </span>
        )
      }
    >
      {isLoading ? (
        <div className="flex flex-col gap-3" aria-busy="true">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-[76px] rounded-2xl bg-[#FBF8F2] animate-pulse"
            />
          ))}
        </div>
      ) : data?.length > 0 ? (
        <div className="flex flex-col gap-3">
          {data.map((hewan) => {
            const Icon = petIcons[hewan.jenis_hewan] ?? ChameleonDark;
            return (
              <div
                key={hewan.id_hewan}
                className="flex items-center gap-3 rounded-2xl border border-[#EAE5D8] bg-[#FBF8F2] p-3 hover:bg-white hover:border-[#F0A93B] hover:shadow-md transition"
              >
                <div className="grid place-items-center w-12 h-12 shrink-0 rounded-full bg-[#F0A93B]/20">
                  <Icon />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-semibold text-[#1E3A34]">
                    {capitalizeWords(hewan.nama)}
                  </h4>
                  <p className="truncate text-sm text-[#6B7280]">
                    {capitalizeWords(hewan.jenis_hewan)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    to="/hewan/edit"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    state={hewan}
                    title="Edit"
                    aria-label={`Edit ${hewan.nama}`}
                    className="grid place-items-center w-10 h-10 rounded-full text-[#1E3A34] hover:bg-[#F0A93B]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] transition"
                  >
                    <EditIcon size={20} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(hewan.id_hewan, hewan.nama)}
                    title="Hapus"
                    aria-label={`Hapus ${hewan.nama}`}
                    className="grid place-items-center w-10 h-10 rounded-full text-[#C4432E] hover:bg-[#FDECE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4432E]/50 transition"
                  >
                    <TrashIcon size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#D9D3C3] px-4 py-10 text-center">
          <PawIcon size={28} className="text-[#F0A93B]" />
          <p className="text-sm text-[#6B7280]">
            Kamu belum memiliki hewan peliharaan terdaftar.
          </p>
        </div>
      )}
    </SectionCard>
  );
};

export default KotakListHewan;
