import { useEffect, useMemo } from "react";
import { useRekam } from "../../hooks/useRekam";
import { parseSpesialis } from "../../utils/praktek";
import DokterProfileCard from "./DokterProfileCard";

const KotakDetailKonsul = ({ data }) => {
  const { praktekRekam, isLoading, getByPraktek } = useRekam();

  useEffect(() => {
    if (data?.id_praktek) {
      getByPraktek(data.id_praktek);
    }
  }, [data?.id_praktek]);

  const rekamList = praktekRekam?.rekam_medis ?? [];
  const dilayani = rekamList.length;

  const rating = useMemo(() => {
    const rated = rekamList.filter((r) => typeof r.rating === "number");
    if (rated.length === 0) return 0;
    return rated.reduce((sum, r) => sum + r.rating, 0) / rated.length;
  }, [rekamList]);

  const whileLoading = (value) => (isLoading ? "..." : value);

  return (
    <DokterProfileCard
      photoUrl={data?.dokter?.url_photo}
      name={data?.dokter?.user?.username}
      pengalaman={data?.dokter?.pengalaman ?? 0}
      rating={whileLoading(rating.toFixed(1))}
      dilayani={whileLoading(dilayani)}
      spesialisList={parseSpesialis(data?.spesialis)}
      klinik={data?.dokter?.nama_klinik}
    />
  );
};

export default KotakDetailKonsul;
