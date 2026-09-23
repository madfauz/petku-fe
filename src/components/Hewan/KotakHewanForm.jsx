import { useState } from "react";
import { useHewan } from "../../hooks/useHewan";
import { JENIS_HEWAN_OPTIONS } from "../../utils/jenisHewan";
import { PlusIcon } from "../icon";
import Button from "../UI/Button";
import Input from "../UI/Input";
import SectionCard from "../UI/SectionCard";
import Select from "../UI/Select";

const KotakHewanForm = ({ onSuccess }) => {
  const { create, isLoading, isError, message } = useHewan();
  const [namaHewan, setNamaHewan] = useState("");
  const [jenisHewan, setJenisHewan] = useState("kucing");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await create({ nama: namaHewan, jenis_hewan: jenisHewan });
      setNamaHewan("");
      setJenisHewan("kucing");
      onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SectionCard
      icon={PlusIcon}
      title="Daftarkan hewan peliharaan mu"
      className="font-jakarta"
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

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Menyimpan..."
          className="mt-1"
        >
          Simpan
        </Button>

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
      </form>
    </SectionCard>
  );
};

export default KotakHewanForm;
