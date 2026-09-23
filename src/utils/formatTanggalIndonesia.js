const HARI_MAP = {
  Sun: "Minggu",
  Mon: "Senin",
  Tue: "Selasa",
  Wed: "Rabu",
  Thu: "Kamis",
  Fri: "Jumat",
  Sat: "Sabtu",
};

const BULAN_MAP = {
  Jan: "Januari",
  Feb: "Februari",
  Mar: "Maret",
  Apr: "April",
  May: "Mei",
  Jun: "Juni",
  Jul: "Juli",
  Aug: "Agustus",
  Sep: "September",
  Oct: "Oktober",
  Nov: "November",
  Dec: "Desember",
};

export function formatJadwalDateTime(dateObj, time) {
  const [dayEn, monthEn, dateNum, year] = dateObj.toDateString().split(" ");

  return {
    date: `${HARI_MAP[dayEn]}, ${dateNum} ${BULAN_MAP[monthEn]} ${year}`,
    time: String(time).replaceAll(":", "."),
  };
}

export function stringifyJadwalDateTime(dateTimeFormat) {
  return JSON.stringify(dateTimeFormat);
}
