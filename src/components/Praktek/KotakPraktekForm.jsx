import { useEffect, useState } from "react";
import { usePraktek } from "../../hooks/usePraktek";
import { JENIS_HEWAN_OPTIONS } from "../../utils/jenisHewan";
import { PlusIcon } from "../icon";
import Button from "../UI/Button";
import Input from "../UI/Input";
import SectionCard from "../UI/SectionCard";
import Select from "../UI/Select";
import SchedulePicker from "./SchedulePicker";

const KotakPraktekForm = ({ onSuccess }) => {
  const { addById, isLoading, isError, isSuccess, message } = usePraktek();

  const [dateTimes, setDateTimes] = useState([
    { day: "Minggu", times: [{ start: "00:00", end: "00:00" }] },
  ]);
  const [spesialis, setSpesialis] = useState(["kucing"]);
  const [harga, setHarga] = useState("");
  const [hargaPromo, setHargaPromo] = useState("");
  const [promo, setPromo] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    const days = dateTimes.map((date) => date.day);
    if (new Set(days).size !== days.length) {
      setValidationError("Hari yang dipilih harus berbeda");
      return;
    }
    if (!harga || harga < 30000 || harga > 500000) {
      setValidationError("Harga harus di antara Rp30.000 – Rp500.000");
      return;
    }
    if (promo && (!hargaPromo || Number(hargaPromo) >= Number(harga))) {
      setValidationError(
        "Harga promo harus diisi dan lebih murah dari harga normal",
      );
      return;
    }
    if (spesialis.length === 0) {
      setValidationError("Pilih minimal satu spesialis");
      return;
    }

    try {
      await addById({
        spesialis,
        harga: parseInt(harga, 10),
        harga_promo: promo ? parseInt(hargaPromo, 10) : null,
        promo,
        jadwal_waktu: dateTimes,
      });
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setDateTimes([
        { day: "Minggu", times: [{ start: "00:00", end: "00:00" }] },
      ]);
      setSpesialis("kucing");
      setHarga("");
      setHargaPromo("");
      setPromo(false);
      setValidationError("");
      onSuccess?.();
    }
  }, [isSuccess]);

  return (
    <SectionCard
      icon={PlusIcon}
      title="Daftarkan praktek mu"
      className="font-jakarta"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          placeholder="Contoh: 75000"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          min="30000"
          max="500000"
          required
        />

        <Select
          id="promo"
          label="Promo"
          value={promo ? "aktif" : "tidak"}
          onChange={(v) => setPromo(v === "aktif")}
          options={[
            { value: "tidak", label: "Tidak aktif" },
            { value: "aktif", label: "Aktif" },
          ]}
        />

        {promo && (
          <Input
            id="harga-promo"
            label="Harga promo (Rp)"
            type="number"
            placeholder="Contoh: 50000"
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

        {(validationError || isError) && (
          <p
            role="alert"
            className="rounded-xl bg-[#FDECE8] px-3.5 py-2.5 text-sm text-[#C4432E]"
          >
            {validationError || message}
          </p>
        )}

        {isSuccess && !validationError && (
          <p
            role="status"
            className="rounded-xl bg-[#E6F4EC] px-3.5 py-2.5 text-sm text-[#1F7A4D]"
          >
            {message}
          </p>
        )}

        <Button type="submit" isLoading={isLoading} className="mt-1">
          Simpan
        </Button>
      </form>
    </SectionCard>
  );
};

export default KotakPraktekForm;
