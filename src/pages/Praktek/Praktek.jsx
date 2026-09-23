import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { PageError } from "../../components/UI/PageState";
import Jumbotron from "../../components/UI/Jumbotron";
import ConfirmModal from "../../components/UI/ConfirmModal";
import KotakListPraktek from "../../components/Praktek/KotakListPraktek";
import KotakPraktekForm from "../../components/Praktek/KotakPraktekForm";
import { usePraktek } from "../../hooks/usePraktek";

const Praktek = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { praktekList, isLoading, isError, message, getAll, deleteById } =
    usePraktek();

  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deletingError, setDeletingError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    getAll({ page: 1, size: 100 });
  }, []);

  const myPraktek = useMemo(
    () => (praktekList ?? []).filter((p) => p.id_dokter === user?.id_user),
    [praktekList, user?.id_user],
  );

  const hideDeleteConfirm = () => {
    setTarget(null);
    setDeletingError("");
  };

  const handleConfirmDelete = async () => {
    if (!target) return;
    setDeleting(true);
    setDeletingError("");
    try {
      await deleteById(target.id_praktek);
      await getAll({ page: 1, size: 100 });
      hideDeleteConfirm();
    } catch (error) {
      setDeletingError(error.message || "Gagal menghapus praktek");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Layout>
      <ConfirmModal
        open={target !== null}
        title={`Hapus praktek ${target?.spesialis?.join(", ") ?? ""}`}
        description="Kamu yakin ingin menghapus praktek ini? Semua data terkait akan hilang dan tidak dapat dipulihkan."
        loading={deleting}
        loadingLabel="Menghapus..."
        onConfirm={handleConfirmDelete}
        onCancel={hideDeleteConfirm}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-14 font-jakarta sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <Jumbotron type="praktek" />

          {deletingError && (
            <p
              role="alert"
              className="rounded-xl bg-[#FDECE8] px-3.5 py-2.5 text-sm font-jakarta text-[#C4432E]"
            >
              {deletingError}
            </p>
          )}

          {isError ? (
            <PageError message={message} />
          ) : (
            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
              <KotakListPraktek
                data={myPraktek}
                onDelete={setTarget}
                isLoading={isLoading}
              />
              <KotakPraktekForm
                onSuccess={() => getAll({ page: 1, size: 100 })}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Praktek;
