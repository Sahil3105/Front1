import axios from "axios";
import { getToken } from "../auth";

export const Base_Url = 'http://23.22.237.221:8081'; // Updated backend IP and port

export const myAxios = axios.create({
  baseURL: Base_Url
});

export const privateAxios = axios.create({
  baseURL: Base_Url
});

// Attach token to privateAxios requests
privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log("Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Always return config
  },
  (error) => Promise.reject(error)
);

