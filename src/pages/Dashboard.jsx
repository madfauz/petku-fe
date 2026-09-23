import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import CardKonsul from "../components/Konsultasi/CardKonsul";
import CardArtikel from "../components/Artikel/CardArtikel";
import CardJadwal from "../components/Jadwal/CardJadwal";
import TitleCard from "../components/UI/TitleCard";
import { PageError, PageLoading } from "../components/UI/PageState";
import capitalizeWords from "../utils/capitalizeWords";
import { useJadwal } from "../hooks/useJadwal";
import ScrollRow from "../components/UI/ScrollRow";
import { useArtikel } from "../hooks/useArtikel";
import Jumbotron from "../components/UI/Jumbotron";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { myJadwal, getByUser: getJadwalByUser } = useJadwal();
  const {
    latestArtikel,
    isLoading: isArtikelLoading,
    isError: isArtikelError,
    message: artikelMessage,
    getLatest: getLatestArtikel,
  } = useArtikel();

  useEffect(() => {
    if (!user?.id_user) return;
    getJadwalByUser();
  }, [user?.id_user, user?.role]);

  useEffect(() => {
    getLatestArtikel({ limit: 5 });
  }, [getLatestArtikel]);

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-14 font-jakarta sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4">
          <div>
            <h1 className="font-fredoka text-2xl font-semibold text-[#1E3A34] sm:text-4xl">
              {user
                ? `Halo, ${capitalizeWords(user.username)}`
                : "Halo, selamat datang"}
            </h1>
            <p className="mt-1 text-[15px] text-[#6B7280]">
              Temukan dokter terbaik untuk hewan kesayanganmu.
            </p>
          </div>
        </header>
        <Jumbotron type="dashboard" />

        {user != null && myJadwal?.length > 0 && (
          <section className="flex flex-col gap-1">
            <TitleCard className="w-full">
              {[false, "", "Jadwal Konsultasi & Rekam Medis"]}
            </TitleCard>
            <CardJadwal data={myJadwal} />
          </section>
        )}

        <section className="flex flex-col gap-1">
          <TitleCard className="w-full">
            {[false, "", "Konsultasi", "Lihat Semua", "/konsultasi"]}
          </TitleCard>
          <CardKonsul />
        </section>

        <section className="flex flex-col gap-1">
          <TitleCard className="w-full">
            {[false, "", "Artikel Terkini", "Lihat Semua", "/artikel"]}
          </TitleCard>

          {isArtikelLoading ? (
            <PageLoading rows={1} />
          ) : isArtikelError ? (
            <PageError message={artikelMessage} />
          ) : (
            latestArtikel?.length > 0 && (
              <ScrollRow>
                <CardArtikel
                  data={latestArtikel}
                  cardClassName="w-72 shrink-0"
                />
              </ScrollRow>
            )
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
