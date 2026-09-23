import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { PageError, PageLoading } from "../../components/UI/PageState";
import Jumbotron from "../../components/UI/Jumbotron";
import CardArtikel from "../../components/Artikel/CardArtikel";
import { useArtikel } from "../../hooks/useArtikel";

const Artikel = () => {
  const {
    artikelList,
    artikelListPaging,
    isLoading,
    isError,
    message,
    getAll,
  } = useArtikel();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAll({ page, size: 10 });
  }, [page, getAll]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (artikelListPaging && page < artikelListPaging.totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-14 font-jakarta sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {isLoading ? (
            <PageLoading />
          ) : isError ? (
            <PageError message={message} />
          ) : (
            <>
              <Jumbotron type="artikel" />
              <div className="flex flex-col gap-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <CardArtikel data={artikelList} />
                </div>

                {artikelListPaging && artikelListPaging.totalPages > 1 && (
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
                        {artikelListPaging.totalPages}
                      </span>
                    </span>

                    <button
                      onClick={handleNextPage}
                      disabled={page >= artikelListPaging.totalPages}
                      className="rounded-lg border border-[#EAE5D8] px-4 py-2 font-semibold text-[#1E3A34] transition hover:bg-[#FBF8F2] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}

                {artikelList.length === 0 && (
                  <div className="rounded-xl bg-[#F3F4F6] px-4 py-8 text-center text-[#6B7280]">
                    Tidak ada artikel ditemukan
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

export default Artikel;
