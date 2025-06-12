import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useWallsStore = create((set) => ({
    allWall: null,
    selectedWallByDesign: null,

    allAllWalls: async () => {
        try {
            const res = await axiosInstance.get("/home/allWalls");
            set({ allWall: res.data });
            // console.log("Fetched data:", res.data);
        } catch (error) {
            console.error("Error in allAllWalls:", error);
        }
    },

    selectedColor: async (color) => {
        try {
            const res = await axiosInstance.get("/home/selectByColor/colors", {
                params: { color }
            });
            console.log(res.data);

        } catch (error) {
            console.error("Error in selectedColor:", error);

        }
    },

    selectedByRoom: async (room) => {
        try {
            const res = await axiosInstance.get("/home/selectByRoomType/rooms", {
                params: { room }
            });
            console.log(res.data);
        } catch (error) {
            console.error("Error in selectedByRoom:", error);

        }
    },

    selectByDesign: async (design) => {
        try {
            const res = await axiosInstance.get("/home/selectByDesignType/designs", {
                params: { design }
            });
            set({ selectedWallByDesign: res.data })
            console.log(res.data);

        } catch (error) {
            console.error("Error in seletByDesign:", error);
        }
    }
}));
