import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Jumbotron from "../../components/UI/Jumbotron";
import ConfirmModal from "../../components/UI/ConfirmModal";
import { PageError } from "../../components/UI/PageState";
import KotakListHewan from "../../components/Hewan/KotakListHewan";
import KotakHewanForm from "../../components/Hewan/KotakHewanForm";
import { useHewan } from "../../hooks/useHewan";

export default function Hewan() {
  const { user } = useSelector((state) => state.user);
  const { myHewan, isLoading, isError, message, deleteById, getByUser } =
    useHewan();

  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user !== null) {
      getByUser();
    }
  }, [user]);

  const hideAlert = () => setTarget(null);

  const onDelete = async () => {
    setDeleting(true);
    try {
      await deleteById(target.id);
      await getByUser();
      hideAlert();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Layout>
      <ConfirmModal
        open={target !== null}
        title={`Hapus ${target?.nama ?? ""}`}
        description="Kamu yakin ingin menghapus hewan ini? Jika hewan ini dihapus, maka semua data terkait hewan ini akan hilang."
        loading={deleting}
        loadingLabel="Menghapus..."
        onConfirm={onDelete}
        onCancel={hideAlert}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-14 font-jakarta sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <Jumbotron type="hewan" />

          {isError ? (
            <PageError message={message} />
          ) : (
            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
              <KotakListHewan
                handleDelete={(id, nama) => setTarget({ id, nama })}
                data={myHewan}
                isLoading={isLoading}
              />
              <KotakHewanForm onSuccess={getByUser} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
