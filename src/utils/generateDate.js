export default function generateDate(date) {
  if (!date) return "-";
  const datePart = date.split(" ")[0];
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year}`;
}
