import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePraktek } from "../../hooks/usePraktek";
import Layout from "../../components/Layout/Layout";
import KotakDetailKonsul from "../../components/Konsultasi/KotakDetailKonsul";
import TanggalTemu from "../../components/Konsultasi/TanggalTemu";
import KotakComment from "../../components/Konsultasi/KotakComment";
import PageShell from "../../components/UI/PageShell";
import { PageError, PageLoading } from "../../components/UI/PageState";

const DetailKonsultasi = () => {
  const { id: id_praktek } = useParams();
  const { user } = useSelector((state) => state.user);

  const { praktek, isLoading, isError, message, getById } = usePraktek();

  useEffect(() => {
    if (id_praktek) {
      getById(id_praktek);
    }
  }, [id_praktek]);

  return (
    <Layout>
      <PageShell backTo="/" title="Pilih Jadwal Konsultasi">
        {isLoading ? (
          <PageLoading />
        ) : isError ? (
          <PageError message={message} />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
              <KotakDetailKonsul data={praktek} />
              <TanggalTemu data={praktek} user={user} />
            </div>

            <KotakComment />
          </div>
        )}
      </PageShell>
    </Layout>
  );
};

export default DetailKonsultasi;
