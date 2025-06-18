import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const userAuthStore = create((set) => ({
    authUser: null,
    isLogingIn: false,
    isSigningUp: false,


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth");
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in checkAuth at userAuthStore : ", error);
            // toast.error(error.response.data.message)
            set({ authUser: null })
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signUp", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            
        } catch (error) {
            console.log("Error in signUp at userAuthStore : ", error);
            toast.error(error.response.data.message)
        }finally{
            set({ isSigningUp: false });
        }
    },

    logIn: async (data) => {
        set({ isLogingIn: true });
        try {
            const res = await axiosInstance.post("/auth/logIn", data);
            set({ authUser: res.data });
            toast.success("Login successfully");
        } catch (error) {
            console.log("Error in logIn at userAuthStore : ", error);
            toast.error(error.response.data.message)
        } finally {
            set({ isLogingIn: false });
        }
    },

    logOut: async () => {
        try {
            await axiosInstance.post("/auth/logOut");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            console.log("Error in logOut at userAuthStore : ", error);
            toast.error(error.response.data.message)
        }
    },
}))