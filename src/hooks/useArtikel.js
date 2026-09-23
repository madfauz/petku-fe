import { useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

export function useArtikel() {
  const [artikelList, setArtikelList] = useState([]);
  const [artikelListPaging, setArtikelListPaging] = useState(null);
  const [latestArtikel, setLatestArtikel] = useState([]);
  const [artikel, setArtikel] = useState(null);
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
      const response = await axiosClient.get("/articles", {
        params: { page, size },
      });
      setArtikelList(response.data.data.data);
      setArtikelListPaging(response.data.data.paging);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getLatest = useCallback(async ({ limit = 5 } = {}) => {
    start();
    try {
      const response = await axiosClient.get("/articles/latest", {
        params: { limit },
      });
      setLatestArtikel(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getByKategori = useCallback(
    async (kategori, { page = 1, size = 10 } = {}) => {
      start();
      try {
        const response = await axiosClient.get(
          `/articles/category/${kategori}`,
          {
            params: { page, size },
          },
        );
        setArtikelList(response.data.data.data);
        setArtikelListPaging(response.data.data.paging);
        setIsSuccess(true);
      } catch (error) {
        fail(error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const getById = useCallback(async (id) => {
    start();
    try {
      const response = await axiosClient.get(`/articles/${id}`);
      setArtikel(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      fail(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const create = useCallback(async (payload) => {
    start();
    try {
      const response = await axiosClient.post("/articles", {
        judul: payload.judul,
        konten: payload.konten,
        kategori: payload.kategori,
        meta_deskripsi: payload.meta_deskripsi || null,
      });
      setArtikel(response.data.data);
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

  const update = useCallback(async (id, payload) => {
    start();
    try {
      const response = await axiosClient.patch(`/articles/${id}`, {
        judul: payload.judul,
        konten: payload.konten,
        kategori: payload.kategori,
        meta_deskripsi: payload.meta_deskripsi,
      });
      setArtikel(response.data.data);
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
      const response = await axiosClient.delete(`/articles/${id}`);
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
    artikelList,
    artikelListPaging,
    latestArtikel,
    artikel,
    isLoading,
    isError,
    isSuccess,
    message,
    getAll,
    getLatest,
    getByKategori,
    getById,
    create,
    update,
    deleteById,
  };
}
