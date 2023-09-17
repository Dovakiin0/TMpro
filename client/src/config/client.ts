import axios, { AxiosInstance } from "axios";

export const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
