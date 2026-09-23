import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Jumbotron from "../../components/UI/Jumbotron";
import SearchBar from "../../components/UI/SearchBar";
import OptionButton from "../../components/UI/OptionButton";
import { PageError, PageLoading } from "../../components/UI/PageState";
import PraktekCardList from "../../components/Konsultasi/PraktekCardList";
import CardKonsulSearch from "../../components/Konsultasi/CardKonsulSearch";
import { useDoctor } from "../../hooks/useDoctor";
import { normalizeDoctorsToPraktek } from "../../utils/praktek";

const Konsultasi = () => {
  const [searchParams] = useSearchParams();
  const dataParam = searchParams.get("data") ?? "";
  const isSearching = dataParam.trim().length > 0;

  const {
    doctors,
    doctorsPaging,
    searchResults,
    searchPaging,
    isLoading,
    isError,
    message,
    getAll,
    search,
  } = useDoctor();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isSearching) return;
    getAll({ page, size: 10 });
  }, [page, isSearching, getAll]);

  useEffect(() => {
    if (isSearching) {
      search({ search_query: dataParam, page: 1, size: 10 });
    }
  }, [dataParam]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (doctorsPaging && page < doctorsPaging.totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const practices = normalizeDoctorsToPraktek(doctors);

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-14 font-jakarta sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <SearchBar />

          {isSearching ? (
            <section className="flex flex-col gap-4">
              <p className="text-[#1E3A34]">
                Hasil pencarian:{" "}
                <span className="font-semibold">{dataParam}</span>
                {!isLoading && (
                  <span className="text-[#6B7280]">
                    {" "}
                    ({searchPaging?.total ?? 0} ditemukan)
                  </span>
                )}
              </p>
              <CardKonsulSearch data={searchResults} isLoading={isLoading} />
            </section>
          ) : isLoading ? (
            <PageLoading />
          ) : isError ? (
            <PageError message={message} />
          ) : (
            <>
              <Jumbotron type="praktek" />

              <OptionButton>
                {["Kucing", "Anjing", "Burung", "Kelinci", "Hamster", "Iguana"]}
              </OptionButton>

              <div className="flex flex-col gap-6">
                <PraktekCardList
                  practices={practices}
                  isLoading={false}
                  emptyMessage="Belum ada praktek dokter tersedia saat ini."
                  wrap
                />

                {doctorsPaging && doctorsPaging.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 py-8">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      className="rounded-lg border border-[#EAE5D8] px-4 py-2 font-semibold text-[#1E3A34] transition hover:bg-[#FBF8F2] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Sebelumnya
                    </button>

                    <span className="text-sm text-[#6B7280]">
                      Halaman{" "}
                      <span className="font-semibold text-[#1E3A34]">
                        {page}
                      </span>{" "}
                      dari{" "}
                      <span className="font-semibold text-[#1E3A34]">
                        {doctorsPaging.totalPages}
                      </span>
                    </span>

                    <button
                      onClick={handleNextPage}
                      disabled={page >= doctorsPaging.totalPages}
                      className="rounded-lg border border-[#EAE5D8] px-4 py-2 font-semibold text-[#1E3A34] transition hover:bg-[#FBF8F2] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Konsultasi;
