import TitleCard from "./TitleCard";

const PageShell = ({ backTo = "/", title, children }) => (
  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 font-jakarta">
    <TitleCard className="w-full mb-5">{[true, backTo, title]}</TitleCard>

    <div className="rounded-[2rem] bg-[#FBF8F2] border border-[#EAE5D8] p-4 sm:p-6 lg:p-8 shadow-[0_24px_60px_-30px_rgba(30,58,52,0.4)]">
      {children}
    </div>
  </div>
);

export default PageShell;
