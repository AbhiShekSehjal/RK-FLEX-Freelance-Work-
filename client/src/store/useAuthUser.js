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
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth at userAuthStore : ", error);
            set({ authUser: null });
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
            toast.error(error.response.data.message);
        } finally {
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
            toast.error(error.response.data.message);
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
            toast.error(error.response.data.message);
        }
    },

    updateProfilePic: async (userId, userProfilePic) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile-pic", {
                userId,
                userProfilePic,
            });
            set((state) => ({
                authUser: { ...state.authUser, userProfilePic: res.data.userProfilePic },
            }));
            // toast.success("Profile picture updated successfully");
        } catch (error) {
            console.log("Error in updateProfilePic at userAuthStore : ", error);
            toast.error(error.response?.data?.message || "Failed to update profile picture");
            throw error; // Rethrow to handle in component
        }
    },

    updateAddress: async (userId, address) => {
        try {
            const res = await axiosInstance.put("/auth/update-address", {
                userId,
                address,
            });
            set((state) => ({
                authUser: { ...state.authUser, address: res.data.address },
            }));
            toast.success("Address updated successfully");
        } catch (error) {
            console.log("Error in updateAddress at userAuthStore:", error);
            toast.error(error.response?.data?.message || "Failed to update address");
            throw error;
        }
    },

}));