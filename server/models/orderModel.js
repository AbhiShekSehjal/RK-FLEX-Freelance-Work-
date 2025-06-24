import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

const orderSchema = new schema({
    razorpayOrderId: String,
    userId: {
        type: schema.Types.ObjectId,
    },
    amount: Number,
    currency: String,
    status: String,
    products: Array,
    orderedAt: {
        type: Date,
        default: Date.now,
    },
});




const Order = mongoose.model("Order", orderSchema);

export default Order;