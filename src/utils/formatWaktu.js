export function formatWaktu(waktuJson) {
  try {
    const { date, time } = JSON.parse(waktuJson);
    return `${time ?? ""} ${date ?? ""}`.trim();
  } catch {
    return "Waktu tidak tersedia";
  }
}
