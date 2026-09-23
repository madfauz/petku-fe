import { useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { useMidtransSnap } from "./useMidtransSnap";

export function useTransaksi() {
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const { isLoaded: isSnapLoaded, snapPay } = useMidtransSnap();

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

  const createTransaction = useCallback(async (id_temu) => {
    start();
    try {
      const response = await axiosClient.post("/transaction", { id_temu });
      setTransaction(response.data.data);
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

  const pay = useCallback(
    (token, callbacks = {}) => {
      if (!isSnapLoaded) {
        setIsError(true);
        setMessage("Sistem pembayaran Midtrans sedang dimuat, harap tunggu.");
        return;
      }

      snapPay(token, callbacks);
    },
    [isSnapLoaded, snapPay],
  );

  const verify = useCallback(async (id_temu) => {
    try {
      const response = await axiosClient.patch(
        `/transaction/${id_temu}/verify`,
      );
      return response.data;
    } catch (error) {
      console.error("Gagal memperbarui status pembayaran:", error);
      throw error;
    }
  }, []);

  return {
    transaction,
    isLoading,
    isError,
    isSuccess,
    message,
    createTransaction,
    pay,
    verify,
  };
}
