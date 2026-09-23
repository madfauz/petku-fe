const StethoscopeIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.8 2.3A.3.3 0 1 0 4.2 2.3A.3.3 0 1 0 4.8 2.3M19.8 2.3A.3.3 0 1 0 19.2 2.3A.3.3 0 1 0 19.8 2.3" />
    <path d="M4.5 3v6.5a5.5 5.5 0 0 0 11 0V3" />
    <path d="M19.5 3v6.5a3 3 0 0 1-3 3v0" />
    <path d="M16.5 12.5v3.5a5 5 0 0 1-10 0v-1" />
    <circle cx="20" cy="15" r="2" />
  </svg>
);

export default StethoscopeIcon;
