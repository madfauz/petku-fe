import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useJadwal } from "../../hooks/useJadwal";
import Layout from "../../components/Layout/Layout";
import KotakDetailJadwal from "../../components/Jadwal/KotakDetailJadwal";
import KotakAksiJadwal from "../../components/Jadwal/KotakAksiJadwal";
import PageShell from "../../components/UI/PageShell";
import { PageError, PageLoading } from "../../components/UI/PageState";

const DetailJadwalRekam = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const { jadwal, isLoading, isError, message, getById } = useJadwal();

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  return (
    <Layout>
      <PageShell backTo="/" title="Detail Jadwal Konsultasi & Rekam Medis">
        {isLoading ? (
          <PageLoading />
        ) : isError ? (
          <PageError message={message} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
            <KotakDetailJadwal data={jadwal} user={user} />
            <KotakAksiJadwal
              data={jadwal}
              user={user}
              onRefresh={() => getById(id)}
            />
          </div>
        )}
      </PageShell>
    </Layout>
  );
};

export default DetailJadwalRekam;
