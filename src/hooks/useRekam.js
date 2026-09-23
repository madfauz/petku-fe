import { useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

export function useRekam() {
  const [rekamList, setRekamList] = useState([]);
  const [rekamListPaging, setRekamListPaging] = useState(null);
  const [dokterRekam, setDokterRekam] = useState(null);
  const [pelangganRekam, setPelangganRekam] = useState(null);
  const [praktekRekam, setPraktekRekam] = useState(null);
  const [rekam, setRekam] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const start = () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setMessage("");
  };

  const fail = (error) => {
    setIsError(true);
    setMessage(extractErrorMessage(error));
  };

  const updateRekam = useCallback(async (payload) => {
    start();
    try {
      const response = await axiosClient.post("/rekam", {
        id_temu: payload.id_temu,
        komentar: payload.komentar,
        rating: payload.rating,
      });
      setRekam(response.data.data);
      setIsSuccess(true);
      setMessage(response.data.message);
      return response.data.data;
    } catch (error) {
      fail(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCatatanPasien = useCallback(async (payload) => {
    start();
    try {
      const response = await axiosClient.post("/rekam/catatan-pasien", {
        id_temu: payload.id_temu,
        catatan_pasien: payload.catatan_pasien,
      });
      setRekam(response.data.data);
      setIsSuccess(true);
      setMessage(response.data.message);
      return response.data.data;
    } catch (error) {
      fail(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getByDokter = useCallback(async (id, { page = 1, size = 10 } = {}) => {
    start();
    try {
      const response = await axiosClient.get(`/rekam/dokter/${id}`, {
        params: { page, size },
      });
      setDokterRekam(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getByPelanggan = useCallback(
    async (id, { page = 1, size = 10 } = {}) => {
      start();
      try {
        const response = await axiosClient.get(`/rekam/pelanggan/${id}`, {
          params: { page, size },
        });
        setPelangganRekam(response.data.data);
        setIsSuccess(true);
      } catch (error) {
        fail(error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const getByPraktek = useCallback(async (id, { page = 1, size = 10 } = {}) => {
    start();
    try {
      const response = await axiosClient.get(`/rekam/praktek/${id}`, {
        params: { page, size },
      });
      setPraktekRekam(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAll = useCallback(async ({ page = 1, size = 10 } = {}) => {
    start();
    try {
      const response = await axiosClient.get("/rekam", {
        params: { page, size },
      });
      setRekamList(response.data.data.data);
      setRekamListPaging(response.data.data.paging);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteById = useCallback(async (id) => {
    start();
    try {
      const response = await axiosClient.delete(`/rekam/${id}`);
      setIsSuccess(true);
      setMessage(response.data.message);
      return response.data.data;
    } catch (error) {
      fail(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    rekamList,
    rekamListPaging,
    dokterRekam,
    pelangganRekam,
    praktekRekam,
    rekam,
    isLoading,
    isError,
    isSuccess,
    message,
    updateRekam,
    updateCatatanPasien,
    getByDokter,
    getByPelanggan,
    getByPraktek,
    getAll,
    deleteById,
  };
}
