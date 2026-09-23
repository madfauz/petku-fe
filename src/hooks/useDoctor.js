import { useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

export function useDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [doctorsPaging, setDoctorsPaging] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchPaging, setSearchPaging] = useState(null);
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
      const response = await axiosClient.get("/doctors", {
        params: { page, size },
      });
      setDoctors(response.data.data.data);
      setDoctorsPaging(response.data.data.paging);
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
      const response = await axiosClient.get(`/doctors/${id}`);
      setDoctor(response.data.data);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setMessage(extractErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const search = useCallback(
    async ({ search_query = "", page = 1, size = 10 } = {}) => {
      start();
      try {
        const response = await axiosClient.get("/doctors/search", {
          params: { search_query, page, size },
        });
        setSearchResults(response.data.data);
        setSearchPaging(response.data.paging);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
        setMessage(extractErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const editById = useCallback(async (id, payload = {}, imageFile) => {
    start();
    try {
      const formData = new FormData();
      if (payload.username) formData.append("username", payload.username);
      if (payload.kontak) formData.append("kontak", payload.kontak);
      if (payload.pengalaman !== undefined && payload.pengalaman !== null) {
        formData.append("pengalaman", payload.pengalaman);
      }
      if (payload.alamat) formData.append("alamat", payload.alamat);
      if (payload.nama_klinik)
        formData.append("nama_klinik", payload.nama_klinik);
      if (imageFile) formData.append("image", imageFile);

      const response = await axiosClient.patch(`/doctors/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setDoctor(response.data.data);
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
    doctors,
    doctorsPaging,
    doctor,
    searchResults,
    searchPaging,
    isLoading,
    isError,
    isSuccess,
    message,
    getAll,
    getById,
    search,
    editById,
  };
}
