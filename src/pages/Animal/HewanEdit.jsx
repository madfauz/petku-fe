import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import TitleCard from "../../components/UI/TitleCard";
import KotakHewanEdit from "../../components/Hewan/KotakHewanEdit";

const HewanEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  useEffect(() => {
    if (!data) {
      navigate("/hewan");
    }
  }, [data, navigate]);

  if (!data) return null;

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-14 font-jakarta sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <TitleCard>{[true, "/hewan", "Kembali"]}</TitleCard>
          <KotakHewanEdit data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default HewanEdit;
