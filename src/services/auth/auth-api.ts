import axios from "axios";

import { API_URL } from "../base-api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});
export default api;
