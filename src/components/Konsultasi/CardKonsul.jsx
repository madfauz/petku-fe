import { useEffect } from "react";
import { useDoctor } from "../../hooks/useDoctor";
import { normalizeDoctorsToPraktek } from "../../utils/praktek";
import PraktekCardList from "./PraktekCardList";

const CardKonsul = ({ wrap = false }) => {
  const { doctors, isLoading, getAll } = useDoctor();

  useEffect(() => {
    getAll({ page: 1, size: 10 });
  }, []);

  const practices = normalizeDoctorsToPraktek(doctors);
  return (
    <PraktekCardList
      practices={practices.length > 5 ? practices.slice(0, 5) : practices}
      isLoading={isLoading}
      emptyMessage="Belum ada praktek dokter tersedia saat ini."
      wrap={wrap}
    />
  );
};

export default CardKonsul;
