import capitalizeWords from "../../utils/capitalizeWords";
import { MapPinIcon, StarIcon, StethoscopeIcon } from "../icon";

const InfoRow = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-3">
    <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-white/10 text-[#F0A93B]">
      <Icon size={18} />
    </span>
    <div className="min-w-0">
      <p className="text-xs text-[#C8DCD3]">{label}</p>
      <div className="mt-0.5 text-[15px] font-medium text-white break-words">
        {children}
      </div>
    </div>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="rounded-2xl bg-white/10 px-4 py-3">
    <p className="font-fredoka text-2xl font-semibold text-white leading-none">
      {value}
    </p>
    <p className="mt-1 text-xs text-[#C8DCD3]">{label}</p>
  </div>
);

const DokterProfileCard = ({
  photoUrl,
  name,
  pengalaman = 0,
  rating,
  dilayani,
  spesialisList = [],
  klinik,
  children,
}) => (
  <article className="relative overflow-hidden rounded-[2rem] bg-[#1E3A34] p-5 sm:p-6 text-white font-jakarta lg:sticky lg:top-6">
    <svg
      className="absolute -top-24 -right-24 w-72 h-72 opacity-90 pointer-events-none"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <path
        fill="#F0A93B"
        d="M45.6,-58.6C58.6,-49.3,68.4,-34.4,71.9,-18.1C75.4,-1.7,72.6,16.2,63.9,30.5C55.2,44.8,40.5,55.6,24.1,62.1C7.7,68.6,-10.5,70.9,-27.1,66C-43.7,61.2,-58.7,49.1,-66.4,33.5C-74.1,17.9,-74.5,-1.3,-68.5,-17.6C-62.5,-33.9,-50.1,-47.4,-35.8,-56.5C-21.5,-65.7,-5.4,-70.5,9.9,-70.9C25.1,-71.3,32.6,-67.9,45.6,-58.6Z"
        transform="translate(100 100)"
      />
    </svg>

    <div className="relative z-10 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-stretch gap-6">
        <div className="relative shrink-0 w-40 h-40 sm:w-44 sm:h-44 lg:w-full lg:h-auto lg:aspect-square">
          <img
            src={photoUrl}
            alt={name ?? "Dokter"}
            className="w-full h-full rounded-3xl object-cover bg-white/10 ring-4 ring-white/15"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/300x300?text=Dokter";
            }}
          />
          <div
            className="absolute -bottom-3 right-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[#1E3A34] shadow-lg"
            aria-label="Rating dokter"
          >
            <StarIcon size={14} />
            <span className="text-sm font-bold">{rating}</span>
          </div>
        </div>

        <div className="text-center sm:text-left min-w-0">
          <h2 className="font-fredoka text-2xl sm:text-[1.75rem] leading-tight font-semibold break-words">
            {capitalizeWords(name)}
          </h2>
          <p className="mt-1 text-sm text-[#C8DCD3]">Dokter hewan di PetKu</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat value={`${pengalaman} th`} label="Pengalaman" />
        <Stat value={dilayani} label="Pelanggan dilayani" />
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-5">
        <InfoRow icon={StethoscopeIcon} label="Spesialis">
          {spesialisList.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {spesialisList.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[#F0A93B]/20 px-2.5 py-0.5 text-xs font-semibold text-[#F6C468]"
                >
                  {capitalizeWords(item)}
                </span>
              ))}
            </div>
          ) : (
            "-"
          )}
        </InfoRow>

        <InfoRow icon={MapPinIcon} label="Lokasi praktek">
          {klinik ?? "-"}
        </InfoRow>
      </div>

      {children}
    </div>
  </article>
);

export default DokterProfileCard;
