import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePraktek } from "../../hooks/usePraktek";
import { JENIS_HEWAN_OPTIONS } from "../../utils/jenisHewan";
import { EditIcon } from "../icon";
import Button from "../UI/Button";
import Input from "../UI/Input";
import SectionCard from "../UI/SectionCard";
import Select from "../UI/Select";
import SchedulePicker from "./SchedulePicker";

const KotakPraktekEdit = ({ data }) => {
  const navigate = useNavigate();
  const { editById, isLoading, isError, message } = usePraktek();

  const [dateTimes, setDateTimes] = useState(data?.jadwal_waktu ?? []);
  const [promo, setPromo] = useState(Boolean(data?.promo));
  const [spesialis, setSpesialis] = useState(data?.spesialis ?? ["kucing"]);
  const [harga, setHarga] = useState(data?.harga ?? "");
  const [hargaPromo, setHargaPromo] = useState(data?.harga_promo ?? "");
  const [formError, setFormError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const hariList = dateTimes.map((d) => d.day);
    if (new Set(hariList).size !== hariList.length) {
      setFormError("Tidak boleh ada hari yang sama di jadwal ini.");
      return;
    }
    if (promo && (!hargaPromo || Number(hargaPromo) <= 0)) {
      setFormError("Harga promo harus diisi lebih dari 0.");
      return;
    }
    if (spesialis.length === 0) {
      setFormError("Pilih minimal satu spesialis.");
      return;
    }

    try {
      await editById(data?.id_praktek, {
        harga: Number(harga),
        harga_promo: promo ? Number(hargaPromo) : 0,
        spesialis,
        jadwal_waktu: dateTimes,
        promo,
      });
      navigate("/praktek");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SectionCard
      icon={EditIcon}
      title="Ubah data praktek mu"
      className="w-full max-w-xl mx-auto font-jakarta"
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Select
          id="spesialis"
          label="Spesialis hewan (Multiple Choice)"
          value={spesialis}
          onChange={setSpesialis}
          options={JENIS_HEWAN_OPTIONS}
          multiple
        />

        <Input
          id="harga"
          label="Harga (Rp)"
          type="number"
          min={0}
          placeholder="Masukkan tarif untuk praktek mu..."
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          required
        />

        <Select
          id="promo"
          label="Promo"
          value={String(promo)}
          onChange={(v) => setPromo(v === "true")}
          options={[
            { value: "false", label: "Tidak aktif" },
            { value: "true", label: "Aktif" },
          ]}
        />

        {promo && (
          <Input
            id="hargaPromo"
            label="Harga promo (Rp)"
            type="number"
            min={0}
            placeholder="Masukkan harga promo..."
            value={hargaPromo}
            onChange={(e) => setHargaPromo(e.target.value)}
            required
          />
        )}

        <div>
          <p className="mb-1.5 text-sm font-medium text-[#1E3A34]">
            Jadwal praktek
          </p>
          <SchedulePicker value={dateTimes} onChange={setDateTimes} />
        </div>

        {(formError || (isError && message)) && (
          <p
            role="alert"
            className="rounded-xl bg-[#FDECE8] px-3.5 py-2.5 text-sm text-[#C4432E]"
          >
            {formError || message}
          </p>
        )}

        <div className="mt-1 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => navigate("/praktek")}
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

export default KotakPraktekEdit;
