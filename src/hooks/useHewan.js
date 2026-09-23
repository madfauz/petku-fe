import { useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

export function useHewan() {
  const [hewanList, setHewanList] = useState([]);
  const [hewanListPaging, setHewanListPaging] = useState(null);
  const [hewanByJenis, setHewanByJenis] = useState([]);
  const [myHewan, setMyHewan] = useState([]);
  const [hewan, setHewan] = useState(null);
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
      const response = await axiosClient.post("/animals", {
        nama: payload.nama,
        jenis_hewan: payload.jenis_hewan,
      });
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
      const response = await axiosClient.get("/animals", {
        params: { page, size },
      });
      setHewanList(response.data.data.data);
      setHewanListPaging(response.data.data.paging);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getByJenis = useCallback(async (jenis) => {
    start();
    try {
      const response = await axiosClient.get(`/animals/jenis/${jenis}`);
      setHewanByJenis(response.data.data);
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
      const response = await axiosClient.get(`/animals/${id}`);
      setHewan(response.data.data);
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
      const response = await axiosClient.get("/animals/me");
      setMyHewan(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateById = useCallback(async (id, payload) => {
    start();
    try {
      const response = await axiosClient.put(`/animals/${id}`, {
        nama: payload.nama,
        jenis_hewan: payload.jenis_hewan,
      });
      setHewan(response.data.data);
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
      const response = await axiosClient.delete(`/animals/${id}`);
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
    hewanList,
    hewanListPaging,
    hewanByJenis,
    myHewan,
    hewan,
    isLoading,
    isError,
    isSuccess,
    message,
    create,
    getAll,
    getByJenis,
    getById,
    getByUser,
    updateById,
    deleteById,
  };
}
