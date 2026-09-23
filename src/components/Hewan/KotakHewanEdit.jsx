import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHewan } from "../../hooks/useHewan";
import { JENIS_HEWAN_OPTIONS } from "../../utils/jenisHewan";
import { EditIcon } from "../icon";
import Button from "../UI/Button";
import Input from "../UI/Input";
import SectionCard from "../UI/SectionCard";
import Select from "../UI/Select";

const KotakHewanEdit = ({ data }) => {
  const navigate = useNavigate();
  const { updateById, isLoading, isError, message } = useHewan();

  const [namaHewan, setNamaHewan] = useState(data.nama);
  const [jenisHewan, setJenisHewan] = useState(data.jenis_hewan);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateById(data.id_hewan, {
        nama: namaHewan,
        jenis_hewan: jenisHewan,
      });
      navigate("/hewan");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SectionCard
      icon={EditIcon}
      title="Ubah data peliharaan mu"
      className="w-full max-w-xl mx-auto font-jakarta"
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          id="nama"
          name="nama"
          label="Nama hewan"
          placeholder="Masukkan nama hewan mu di sini..."
          value={namaHewan}
          onChange={(event) => setNamaHewan(event.target.value)}
          required
        />

        <Select
          id="jenis"
          label="Jenis hewan"
          value={jenisHewan}
          onChange={setJenisHewan}
          options={JENIS_HEWAN_OPTIONS}
        />

        {message && (
          <p
            role={isError ? "alert" : "status"}
            className={`rounded-xl px-3.5 py-2.5 text-sm ${
              isError
                ? "bg-[#FDECE8] text-[#C4432E]"
                : "bg-[#E6F4EC] text-[#1F7A4D]"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-1 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => navigate("/hewan")}
          >
            Batal
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Menyimpan..."
          >
            Simpan
          </Button>
        </div>
      </form>
    </SectionCard>
  );
};

export default KotakHewanEdit;
