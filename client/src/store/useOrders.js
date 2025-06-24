import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useWallsStore } from "./useAllWallpapers.js";

export const useOrders = create(() => ({

    handler: async function (response) {
        toast.success("Payment successful!");

        const verifyRes = await axiosInstance.post("/order/verifyPayment", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
        });

        if (verifyRes.data.success) {
            toast.success("Payment verified and order marked as paid!");
            // Optional: navigate to thank you page
            localStorage.removeItem("cart");
            useWallsStore.getState().clearCart();
        } else {
            toast.error("Payment verification failed!");
        }
    }


}))