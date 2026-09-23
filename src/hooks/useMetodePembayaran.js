import { useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

export function useMetodePembayaran() {
  const [metodeList, setMetodeList] = useState([]);
  const [metode, setMetode] = useState(null);
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

  const getAll = useCallback(async () => {
    start();
    try {
      const response = await axiosClient.get("/metode-pembayaran");
      setMetodeList(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadMetode = useCallback(async (payload) => {
    start();
    try {
      const response = await axiosClient.post("/metode-pembayaran", {
        nama: payload.nama,
        pajak: payload.pajak,
      });
      setMetode(response.data.data);
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
    metodeList,
    metode,
    isLoading,
    isError,
    isSuccess,
    message,
    getAll,
    uploadMetode,
  };
}
