import { PawIcon, StethoscopeIcon, EditIcon, ClockIcon } from "../icon";

const JUMBOTRON_CONFIG = {
  dashboard: {
    bgClass: "bg-dashboard-image",
    icon: StethoscopeIcon,
    title: "Selamat Datang",
    description: "Kelola kebutuhan kesehatan hewan peliharaanmu di sini.",
  },
  artikel: {
    bgClass: "bg-artikel-image",
    icon: EditIcon,
    title: "Artikel",
    description: "Kumpulan tips dan informasi seputar hewan peliharaan.",
  },
  hewan: {
    bgClass: "bg-hewan-image",
    icon: PawIcon,
    title: "Hewan Peliharaan",
    description: "Kelola data hewan peliharaanmu dengan mudah.",
  },
  praktek: {
    bgClass: "bg-praktek-image",
    icon: ClockIcon,
    title: "Konsultasi",
    description: "Informasi dan pengaturan seputar praktek konsultasi.",
  },
};

const Jumbotron = ({ type = "dashboard" }) => {
  const {
    bgClass,
    icon: Icon,
    title,
    description,
  } = JUMBOTRON_CONFIG[type] || JUMBOTRON_CONFIG.dashboard;

  return (
    <div
      className={`relative h-[190px] w-full overflow-hidden rounded-3xl bg-cover bg-center sm:h-[300px] lg:h-[360px] ${bgClass}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A34] via-[#1E3A34]/55 to-[#1E3A34]/10" />

      <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-5 font-jakarta text-white sm:p-8">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#F0A93B] text-[#1E3A34]">
          <Icon size={20} />
        </span>
        <h2 className="font-fredoka text-2xl font-semibold leading-tight sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-sm text-[#C8DCD3] sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Jumbotron;
