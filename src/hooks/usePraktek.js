import { useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

export function usePraktek() {
  const [praktekList, setPraktekList] = useState([]);
  const [praktekListPaging, setPraktekListPaging] = useState(null);
  const [praktek, setPraktek] = useState(null);
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

  const getAll = useCallback(async ({ page = 1, size = 10 } = {}) => {
    start();
    try {
      const response = await axiosClient.get("/practices", {
        params: { page, size },
      });
      setPraktekList(response.data.data.data);
      setPraktekListPaging(response.data.data.paging);
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
      const response = await axiosClient.get(`/practices/${id}`);
      setPraktek(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addById = useCallback(async (payload) => {
    start();
    try {
      const response = await axiosClient.post("/practices", {
        harga: payload.harga,
        harga_promo: payload.harga_promo,
        spesialis: payload.spesialis,
        jadwal_waktu: payload.jadwal_waktu,
        promo: payload.promo ?? false,
      });
      setPraktek(response.data.data);
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

  const editById = useCallback(async (id, payload = {}) => {
    start();
    try {
      const body = {};
      if (payload.harga !== undefined) body.harga = payload.harga;
      if (payload.harga_promo !== undefined)
        body.harga_promo = payload.harga_promo;
      if (payload.spesialis !== undefined) body.spesialis = payload.spesialis;
      if (payload.jadwal_waktu !== undefined)
        body.jadwal_waktu = payload.jadwal_waktu;
      if (payload.promo !== undefined) body.promo = payload.promo;

      const response = await axiosClient.patch(`/practices/${id}`, body);
      setPraktek(response.data.data);
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
      const response = await axiosClient.delete(`/practices/${id}`);
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
    praktekList,
    praktekListPaging,
    praktek,
    isLoading,
    isError,
    isSuccess,
    message,
    getAll,
    getById,
    addById,
    editById,
    deleteById,
  };
}
