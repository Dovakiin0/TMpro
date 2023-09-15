import axios, { AxiosInstance } from "axios";

export const client: AxiosInstance = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
