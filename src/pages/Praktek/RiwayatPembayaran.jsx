import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import PageShell from "../../components/UI/PageShell";
import { PageLoading } from "../../components/UI/PageState";
import KotakPembayaran from "../../components/Praktek/KotakPembayaran";

const RiwayatPembayaran = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoading && user === null) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  return (
    <Layout>
      <PageShell backTo="/" title="Riwayat Pembayaran">
        {isLoading || !user ? <PageLoading /> : <KotakPembayaran />}
      </PageShell>
    </Layout>
  );
};

export default RiwayatPembayaran;
