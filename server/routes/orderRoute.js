import express from "express";
import { createOrder, getUserOrders, verifyPayment } from "../controllers/orderControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/createOrder",protectRoute, createOrder);
router.post("/verifyPayment", verifyPayment);
router.get("/myorders", protectRoute, getUserOrders);

export default router;