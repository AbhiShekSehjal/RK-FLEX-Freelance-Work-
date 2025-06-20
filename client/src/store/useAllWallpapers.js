import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useWallsStore = create((set) => ({
    allWall: null,
    selectedWallByDesign: null,

    searchedItemInput: null,
    searchedInput: null,

    selectedProductCard: null,

    selectedRoom: [],
    selectedRoomType: null,

    selectedColorType: null,
    selectedColorWalls: [],

    cartItems: [],

    allAllWalls: async () => {
        try {
            const res = await axiosInstance.get("/walls");
            set({ allWall: res.data });
            // console.log("Fetched data:", res.data);
        } catch (error) {
            console.error("Error in allAllWalls:", error);
        }
    },

    selectedColor: async (color) => {
        try {
            const res = await axiosInstance.get(`/walls/color`, {
                params: { color }
            });
            set({ selectedColorType: color });
            set({ selectedColorWalls: res.data });

        } catch (error) {
            console.error("Error in selectedColor:", error);

        }
    },

    selectedByRoom: async (room) => {
        try {
            const res = await axiosInstance.get(`/walls/room/`, {
                params: { room }
            });
            set({ selectedRoom: res.data });
            set({ selectedRoomType: room });
        } catch (error) {
            console.error("Error in selectedByRoom:", error);

        }
    },

    selectByDesign: async (design) => {
        try {
            const res = await axiosInstance.get("/walls/design", {
                params: { design }
            });
            set({ selectedWallByDesign: res.data });
            if (design) {
                // console.log(res.data);
            }

        } catch (error) {
            console.error("Error in seletByDesign:", error);
        }
    },

    searchedItem: async (item) => {
        try {
            set({ searchedInput: item });
            const res = await axiosInstance.get(`/walls/search?item=${item}`)
            set({ searchedItemInput: res.data });
        } catch (error) {
            console.error("Error in searchedItem:", error);
        }
    },

    productCard: async (productId) => {
        try {
            const res = await axiosInstance.get(`/walls/${productId}`);
            if (res) {
                set({ selectedProductCard: res.data });
            }
            console.log(res.data);
        } catch (error) {
            console.error("Error in productCard:", error);
        }
    },

    setCartItems: async (product) => {
        try {
            set({ cartItems: product })
        } catch (error) {
            console.error("Error in setCartItems:", error);
        }
    }
}));
