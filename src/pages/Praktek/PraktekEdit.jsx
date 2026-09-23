import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import TitleCard from "../../components/UI/TitleCard";
import KotakPraktekEdit from "../../components/Praktek/KotakPraktekEdit";

const PraktekEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  useEffect(() => {
    if (!data) {
      navigate("/praktek");
    }
  }, [data, navigate]);

  if (!data) return null;

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-14 font-jakarta sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <TitleCard>{[true, "/praktek", "Kembali"]}</TitleCard>
          <KotakPraktekEdit data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default PraktekEdit;
