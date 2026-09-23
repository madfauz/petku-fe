const ScrollRow = ({ children, className = "gap-4 py-3" }) => (
  <div
    className={`flex overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scrollbar-hide ${className}`}
    style={{ scrollbarWidth: "none" }}
  >
    {children}
  </div>
);

export default ScrollRow;
