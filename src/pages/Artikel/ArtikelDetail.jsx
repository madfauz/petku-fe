import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import PageShell from "../../components/UI/PageShell";
import { PageError, PageLoading } from "../../components/UI/PageState";
import { useArtikel } from "../../hooks/useArtikel";
import { CalendarIcon } from "../../components/icon";

const categoryBg = {
  "Kesehatan Hewan": "bg-red-100",
  "Perawatan Hewan": "bg-blue-100",
  "Nutrisi dan Makanan": "bg-yellow-100",
  "Perilaku Hewan": "bg-purple-100",
  "Vaksinasi dan Pencegahan": "bg-green-100",
  "Grooming dan Kebersihan": "bg-cyan-100",
  "Tips dan Trik": "bg-amber-100",
  "Pertolongan Pertama": "bg-orange-100",
};

const categoryText = {
  "Kesehatan Hewan": "text-red-700",
  "Perawatan Hewan": "text-blue-700",
  "Nutrisi dan Makanan": "text-yellow-700",
  "Perilaku Hewan": "text-purple-700",
  "Vaksinasi dan Pencegahan": "text-green-700",
  "Grooming dan Kebersihan": "text-cyan-700",
  "Tips dan Trik": "text-amber-700",
  "Pertolongan Pertama": "text-orange-700",
};

const ArtikelDetail = () => {
  const { id } = useParams();
  const { artikel, isLoading, isError, message, getById } = useArtikel();

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id, getById]);

  return (
    <Layout>
      <PageShell backTo="/artikel" title="Artikel">
        {isLoading ? (
          <PageLoading />
        ) : isError ? (
          <PageError message={message} />
        ) : !artikel ? (
          <div className="rounded-xl bg-[#F3F4F6] px-4 py-8 text-center text-[#6B7280]">
            Artikel tidak ditemukan
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <span
                  className={`inline-block rounded-full ${
                    categoryBg[artikel.kategori] || "bg-gray-100"
                  } px-4 py-2 text-sm font-semibold ${
                    categoryText[artikel.kategori] || "text-gray-700"
                  }`}
                >
                  {artikel.kategori}
                </span>
              </div>

              <h1 className="font-fredoka text-3xl font-bold leading-tight text-[#1E3A34] sm:text-4xl">
                {artikel.judul}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
                <span className="flex items-center gap-2">
                  <CalendarIcon size={16} />
                  {new Date(artikel.createdAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {artikel.meta_deskripsi && (
              <div className="rounded-2xl border-l-4 border-[#F0A93B] bg-[#FBF8F2] px-4 py-4">
                <p className="text-base italic text-[#6B7280]">
                  {artikel.meta_deskripsi}
                </p>
              </div>
            )}

            <article className="prose prose-sm max-w-none font-jakarta text-[#4B5563] sm:prose-base">
              {artikel.konten?.split("\n\n").map((paragraph, idx) => (
                <div key={idx} className="mb-4">
                  {paragraph.split("\n").map((line, lineIdx) => (
                    <p key={lineIdx} className="mb-2 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </article>

            <div className="my-1 h-px bg-[#EAE5D8]" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6B7280]">Artikel dipublikasikan</p>
                <p className="font-semibold text-[#1E3A34]">
                  {new Date(artikel.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        )}
      </PageShell>
    </Layout>
  );
};

export default ArtikelDetail;
