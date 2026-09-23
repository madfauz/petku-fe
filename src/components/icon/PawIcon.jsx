export default function PawIcon({ size = 24, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <circle cx="12" cy="14" r="5.2" fill="currentColor" />
      <circle cx="5" cy="7" r="2.4" fill="currentColor" />
      <circle cx="19" cy="7" r="2.4" fill="currentColor" />
      <circle cx="8.2" cy="3.6" r="2" fill="currentColor" />
      <circle cx="15.8" cy="3.6" r="2" fill="currentColor" />
    </svg>
  );
}
