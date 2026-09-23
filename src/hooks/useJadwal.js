import { useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

export function useJadwal() {
  const [jadwalList, setJadwalList] = useState([]);
  const [jadwalListPaging, setJadwalListPaging] = useState(null);
  const [myJadwal, setMyJadwal] = useState([]);
  const [jadwal, setJadwal] = useState(null);
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

  const create = useCallback(async (payload) => {
    start();
    try {
      const response = await axiosClient.post("/jadwal", {
        id_praktek: payload.id_praktek,
        id_dokter: payload.id_dokter,
        id_metode_pembayaran: payload.id_metode_pembayaran,
        id_hewan: payload.id_hewan,
        waktu_dipilih_pelanggan: payload.waktu_dipilih_pelanggan,
      });
      setJadwal(response.data.data);
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

  const getAll = useCallback(async ({ page = 1, size = 10 } = {}) => {
    start();
    try {
      const response = await axiosClient.get("/jadwal", {
        params: { page, size },
      });
      setJadwalList(response.data.data.data);
      setJadwalListPaging(response.data.data.paging);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getById = useCallback(async (id) => {
    start();
    try {
      const response = await axiosClient.get(`/jadwal/${id}`);
      setJadwal(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getByUser = useCallback(async () => {
    start();
    try {
      const response = await axiosClient.get("/jadwal/me");
      setMyJadwal(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const update = useCallback(async (id, payload) => {
    start();
    try {
      const response = await axiosClient.put(`/jadwal/${id}`, {
        id_praktek: payload.id_praktek,
        id_dokter: payload.id_dokter,
        id_metode_pembayaran: payload.id_metode_pembayaran,
        id_hewan: payload.id_hewan,
        waktu_dipilih_pelanggan: payload.waktu_dipilih_pelanggan,
      });
      setJadwal(response.data.data);
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

  const deleteById = useCallback(async (id) => {
    start();
    try {
      const response = await axiosClient.delete(`/jadwal/${id}`);
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

  const updateStatusByDokter = useCallback(async (id, status) => {
    start();
    try {
      const response = await axiosClient.patch(`/jadwal/${id}/status`, {
        status,
      });
      setJadwal(response.data.data);
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
    jadwalList,
    jadwalListPaging,
    myJadwal,
    jadwal,
    isLoading,
    isError,
    isSuccess,
    message,
    create,
    getAll,
    getById,
    getByUser,
    update,
    deleteById,
    updateStatusByDokter,
  };
}
