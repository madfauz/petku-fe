export const domain = process.env.REACT_APP_API_URL;

if (!domain && process.env.NODE_ENV !== "development") {
  console.warn(
    "[config] REACT_APP_API_URL belum di-set. Cek file .env dan restart dev server.",
  );
}
