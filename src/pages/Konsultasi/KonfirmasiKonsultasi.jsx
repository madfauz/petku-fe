import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePraktek } from "../../hooks/usePraktek";
import Layout from "../../components/Layout/Layout";
import KotakKonfirmasi from "../../components/Jadwal/KotakKonfirmasi";
import KotakKonfirmasiDiri from "../../components/Konsultasi/KotakKonfirmasiDiri";
import PageShell from "../../components/UI/PageShell";
import { PageError, PageLoading } from "../../components/UI/PageState";

const KonfirmasiKonsultasi = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;
  const day = state?.day;
  const time = state?.time;
  const id_praktek = state?.id_praktek;

  const { user } = useSelector((store) => store.user);
  const { praktek, isLoading, isError, message, getById } = usePraktek();

  useEffect(() => {
    if (!id_praktek) {
      navigate("/", { replace: true });
    }
  }, [id_praktek]);

  useEffect(() => {
    if (id_praktek) {
      getById(id_praktek);
    }
  }, [id_praktek]);

  if (!id_praktek) return null;

  return (
    <Layout>
      <PageShell
        backTo={`/konsultasi/${id_praktek}`}
        title="Konfirmasi Konsultasi"
      >
        {isLoading ? (
          <PageLoading />
        ) : isError ? (
          <PageError message={message} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
            <KotakKonfirmasi data={praktek} dateTime={{ day, time }} />
            <KotakKonfirmasiDiri
              data={{ practice: praktek, user }}
              dateTime={{ day, time }}
            />
          </div>
        )}
      </PageShell>
    </Layout>
  );
};

export default KonfirmasiKonsultasi;
