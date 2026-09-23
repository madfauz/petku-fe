import { useState } from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      tag: "#PETCARE",
      url: "https://images.pexels.com/photos/1472999/pexels-photo-1472999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Cek kesehatan hewan peliharaan kamu",
    },
    {
      tag: "#UPTODATE",
      url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Temukan Informasi Seputar Merawat Hewan",
    },
    {
      tag: "#PETCARE",
      url: "https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Cek kesehatan hewan peliharaan kamu",
    },
  ];
  const slide = slides[currentIndex];

  return (
    <div className="relative w-full h-56 sm:h-72 md:h-[340px] lg:h-[400px] font-jakarta">
      <div
        style={{
          backgroundImage: `url(${slide.url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="relative flex h-full w-full items-end overflow-hidden rounded-3xl shadow-[0_24px_60px_-30px_rgba(30,58,52,0.6)] transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A34]/90 via-[#1E3A34]/35 to-transparent" />

        <div className="relative z-10 flex w-full flex-col items-start gap-2 p-5 pb-12 sm:w-3/4 sm:p-8 sm:pb-14 lg:w-1/2">
          <span className="rounded-full bg-[#F0A93B] px-3 py-1 text-xs font-bold text-[#1E3A34]">
            {slide.tag}
          </span>
          <h2 className="font-fredoka text-2xl font-semibold leading-snug text-white sm:text-3xl xl:text-4xl">
            {slide.title}
          </h2>
          <Link
            to="/"
            className="mt-1 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#1E3A34] hover:bg-[#F0A93B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0A93B] transition duration-300"
          >
            Selengkapnya
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 left-5 flex gap-2 sm:left-8">
        {slides.map((s, i) => (
          <button
            type="button"
            onClick={() => setCurrentIndex(i)}
            key={"dot-" + i}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === currentIndex}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-6 bg-[#F0A93B]" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
