import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  // baseURL: localStorage.getItem("userService") || API_BASE_URL,
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add token to request headers if stored
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
