export function parseSpesialis(spesialis) {
  if (!spesialis) return [];
  if (Array.isArray(spesialis)) return spesialis;
  try {
    const parsed = JSON.parse(spesialis);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [spesialis];
  }
}

export function normalizePraktek(item) {
  const dokterSource = item?.dokter ?? item;
  const username =
    dokterSource?.user?.username ?? dokterSource?.username ?? "Dokter";
  const url_photo = dokterSource?.url_photo ?? item?.url_photo;

  return {
    id_praktek: item?.id_praktek,
    spesialis: parseSpesialis(item?.spesialis),
    harga: item?.harga,
    harga_promo: item?.harga_promo,
    promo: item?.promo,
    dokter: { username, url_photo },
  };
}

export function normalizeDoctorsToPraktek(doctors) {
  return (doctors ?? []).flatMap((dokter) =>
    (dokter.praktek ?? []).map((praktek) =>
      normalizePraktek({ ...praktek, dokter }),
    ),
  );
}

export function normalizePraktekList(list) {
  return (list ?? []).map(normalizePraktek);
}
