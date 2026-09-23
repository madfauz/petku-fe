import { useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

export function usePelanggan() {
  const [pelangganList, setPelangganList] = useState([]);
  const [pelangganListPaging, setPelangganListPaging] = useState(null);
  const [pelanggan, setPelanggan] = useState(null);
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

  const getAll = useCallback(async ({ page = 1, size = 10 } = {}) => {
    start();
    try {
      const response = await axiosClient.get("/customers", {
        params: { page, size },
      });
      setPelangganList(response.data.data);
      setPelangganListPaging(response.data.paging);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setMessage(extractErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getById = useCallback(async (id) => {
    start();
    try {
      const response = await axiosClient.get(`/customers/${id}`);
      setPelanggan(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setMessage(extractErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const editById = useCallback(async (id, payload = {}, imageFile) => {
    start();
    try {
      const formData = new FormData();
      if (payload.username) formData.append("username", payload.username);
      if (payload.kontak) formData.append("kontak", payload.kontak);
      if (payload.alamat) formData.append("alamat", payload.alamat);
      if (payload.url_photo) formData.append("url_photo", payload.url_photo);
      if (imageFile) formData.append("image", imageFile);

      const response = await axiosClient.patch(`/customers/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPelanggan(response.data.data);
      setIsSuccess(true);
      setMessage(response.data.message);
      return response.data.data;
    } catch (error) {
      setIsError(true);
      setMessage(extractErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    pelangganList,
    pelangganListPaging,
    pelanggan,
    isLoading,
    isError,
    isSuccess,
    message,
    getAll,
    getById,
    editById,
  };
}
