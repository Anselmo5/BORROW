import axios from "axios";
import { getToken } from "../../utils/storage";

export const api = axios.create({
  baseURL: "https://borrow-7gma.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});