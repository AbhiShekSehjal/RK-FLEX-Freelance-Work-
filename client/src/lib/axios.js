import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://rk-flex.onrender.com",
    withCredentials: true
});