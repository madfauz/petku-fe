export default function EyeOffIcon({ size = 18, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M3 3l18 18M10.6 10.7a2.5 2.5 0 003.5 3.5M6.6 6.8C4.5 8.2 3 10.2 2 12c1.6 3 5.1 6.5 10 6.5 1.6 0 3-.4 4.2-1M17.4 17.2C19.4 15.8 21 13.8 22 12c-1.4-2.6-4.3-5.7-8.3-6.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
