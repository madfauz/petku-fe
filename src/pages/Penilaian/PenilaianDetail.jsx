import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import KotakDetailComment from "../../components/Penilaian/KotakDetailComment";
import PageShell from "../../components/UI/PageShell";

const PenilaianDetail = () => {
  const { id: id_praktek } = useParams();

  return (
    <Layout>
      <PageShell
        backTo={`/konsultasi/${id_praktek}`}
        title="Penilaian & Ulasan"
      >
        <KotakDetailComment />
      </PageShell>
    </Layout>
  );
};

export default PenilaianDetail;
