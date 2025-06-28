import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://rk-flex-backend.onrender.com/api",
    withCredentials: true
});