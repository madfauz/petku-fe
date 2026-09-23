import { Link } from "react-router-dom";
import { Cat, Dog, Bird, Chameleon, Hamster, Rabbit } from "../icon/PetIcon";
import { EditIcon, PawIcon, TrashIcon } from "../icon";
import SectionCard from "../UI/SectionCard";
import { rupiah } from "../../utils/rupiah";

const petIcons = {
  kucing: Cat,
  anjing: Dog,
  hamster: Hamster,
  burung: Bird,
  kelinci: Rabbit,
};

const KotakListPraktek = ({ data, onDelete }) => {
  const list = data ?? [];

  return (
    <SectionCard
      icon={PawIcon}
      title="Praktek mu"
      className="font-jakarta"
      action={
        list.length > 0 && (
          <span className="shrink-0 rounded-full bg-[#F0A93B]/15 px-3 py-1 text-sm font-semibold text-[#1E3A34]">
            {list.length} praktek
          </span>
        )
      }
    >
      {list.length > 0 ? (
        <div className="flex flex-col gap-4">
          {list.map((practice) => {
            const spesialisList = practice?.spesialis ?? [];
            const MainIcon = petIcons[spesialisList[0]] ?? Chameleon;

            return (
              <div
                key={practice.id_praktek}
                className="flex flex-col gap-4 rounded-2xl border border-[#EAE5D8] bg-[#FBF8F2] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F0A93B]/20">
                      <MainIcon />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-1.5">
                        {spesialisList.map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold capitalize text-[#1E3A34]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          practice?.promo
                            ? "bg-[#E6F4EC] text-[#1F7A4D]"
                            : "bg-[#F3F4F6] text-[#6B7280]"
                        }`}
                      >
                        Promo {practice?.promo ? "aktif" : "tidak aktif"}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Link
                      to="/praktek/edit"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      state={practice}
                      title="Edit"
                      aria-label="Edit praktek"
                      className="grid h-9 w-9 place-items-center rounded-full text-[#1E3A34] hover:bg-[#F0A93B]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] transition"
                    >
                      <EditIcon size={18} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(practice)}
                      title="Hapus"
                      aria-label="Hapus praktek"
                      className="grid h-9 w-9 place-items-center rounded-full text-[#C4432E] hover:bg-[#FDECE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4432E]/50 transition"
                    >
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline gap-2">
                  {practice?.promo ? (
                    <>
                      <span className="font-fredoka text-xl font-semibold text-[#1E3A34]">
                        {rupiah(practice?.harga_promo)}
                      </span>
                      <span className="text-sm text-[#9CA3AF] line-through">
                        {rupiah(practice?.harga)}
                      </span>
                    </>
                  ) : (
                    <span className="font-fredoka text-xl font-semibold text-[#1E3A34]">
                      {rupiah(practice?.harga)}
                    </span>
                  )}
                </div>

                {practice?.rating_count > 0 && (
                  <p className="text-xs text-[#6B7280] sm:text-sm">
                    {practice.rating_average} / 5 dari {practice.rating_count}{" "}
                    penilaian · {practice.dilayani} pelanggan dilayani
                  </p>
                )}

                <div className="flex flex-col gap-2 border-t border-[#E4E0D6] pt-3">
                  {practice?.jadwal_waktu?.map((jadwal, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap items-center gap-1.5"
                    >
                      <span className="shrink-0 rounded-full bg-[#1E3A34] px-2.5 py-1 text-xs font-semibold text-white">
                        {jadwal.day}
                      </span>
                      {jadwal.times.map((waktu, j) => (
                        <span
                          key={j}
                          className="rounded-full border border-[#E4E0D6] bg-white px-2.5 py-1 text-xs font-medium text-[#1E3A34]"
                        >
                          {waktu.start}–{waktu.end}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#D9D3C3] px-4 py-10 text-center">
          <PawIcon size={28} className="text-[#F0A93B]" />
          <p className="text-sm text-[#6B7280]">
            Kamu belum memiliki praktek terdaftar.
          </p>
        </div>
      )}
    </SectionCard>
  );
};

export default KotakListPraktek;
