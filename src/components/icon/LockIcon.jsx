export default function LockIcon({ size = 18, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <rect
        x="5"
        y="10.5"
        width="14"
        height="9.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 10.5V7.8a4 4 0 118 0v2.7"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
