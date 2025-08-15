import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://rk-flex-frontend.onrender.com",
    withCredentials: true
});