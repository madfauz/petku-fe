import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import TitleCard from "../../components/UI/TitleCard";
import KotakDetailRekam from "../../components/RekamMedis/KotakDetailRekam";
import { useSelector } from "react-redux";
import { useRekam } from "../../hooks/useRekam";

const RekamMedisDetail = () => {
  const { user } = useSelector((state) => state.user);

  const {
    getByPelanggan,
    getByDokter,
    pelangganRekam,
    dokterRekam,
    isLoading,
  } = useRekam();

  useEffect(() => {
    if (user?.id_user && user?.role) {
      if (user.role === "pelanggan") {
        getByPelanggan(user.id_user);
      } else {
        getByDokter(user.id_user);
      }
    }
  }, [user, getByPelanggan, getByDokter]);

  const rekamData =
    user?.role === "pelanggan"
      ? pelangganRekam?.rekam_medis
      : dokterRekam?.rekam_medis;

  return (
    <Layout>
      <TitleCard>{[true, "/", "Kembali"]}</TitleCard>
      {isLoading ? (
        <div className="flex justify-center items-center p-8 font-poppins text-subtle-grey">
          Memuat rekam medis...
        </div>
      ) : (
        <KotakDetailRekam data={{ rekam: rekamData, role: user?.role }} />
      )}
    </Layout>
  );
};

export default RekamMedisDetail;
