import axios from "axios";
import { domain } from "../config/domain";

const axiosClient = axios.create({ baseURL: domain });

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
