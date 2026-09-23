const SectionCard = ({
  icon: Icon,
  title,
  action,
  children,
  className = "",
  onClick = () => {},
}) => (
  <section
    onClick={() => onClick()}
    className={`rounded-3xl bg-white border border-[#EAE5D8] p-5 sm:p-6 shadow-[0_10px_30px_-18px_rgba(30,58,52,0.35)] ${className}`}
  >
    <header className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3 min-w-0">
        {Icon && (
          <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-[#F0A93B]/15 text-[#B87A12]">
            <Icon size={18} />
          </span>
        )}
        <h2 className="font-fredoka text-lg sm:text-xl font-semibold text-[#1E3A34] truncate">
          {title}
        </h2>
      </div>
      {action}
    </header>
    {children}
  </section>
);

export default SectionCard;
