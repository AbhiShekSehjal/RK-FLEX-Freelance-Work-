import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useWallsStore = create((set) => ({
    allWall: null,

    allAllWalls: async () => {
        try {
            const res = await axiosInstance.get("/home/allWalls");
            set({ allWall: res.data });
            console.log("Fetched data:", res.data);
        } catch (error) {
            console.error("Error in allAllWalls:", error);
        }
    }
}));
