import razorpay from "razorpay";
import dotenv from "dotenv";
import Order from "../models/orderModel.js";
import crypto from "crypto";
import User from "../models/userModel.js";

dotenv.config();

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createOrder = async (req, res) => {
    const { amount, currency, receipt, products } = req.body;

    const options = {
        amount: amount * 100,
        currency: currency || 'INR',
        receipt: receipt || `receipt${Date.now()}`,
    };

    try {
        const order = await razorpayInstance.orders.create(options);

        await Order.create({
            razorpayOrderId: order.id,
            userId: req.user?._id,
            amount: order.amount,
            currency: order.currency,
            status: order.status,
            products: req.body.products,
            orderedAt: new Date()
        });

        res.json(order);
    } catch (error) {
        console.error('Razorpay Order creation failed:', error);
        res.status(500).json({ error: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        await Order.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            {
                status: "Paid",
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                paidAt: new Date()
            }
        );

        return res.status(200).json({ success: true });
    } else {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }
};


export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        const orders = await Order.find({ userId }).sort({ orderedAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

