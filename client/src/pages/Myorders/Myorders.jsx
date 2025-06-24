import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios.js";
import "./Myorders.css"
import { userAuthStore } from "../../store/useAuthUser.js";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const { authUser } = userAuthStore();

    useEffect(() => {
        axiosInstance.get("/order/myorders").then(res => {
            console.log("Fetched Orders: ", res.data);
            setOrders(res.data);
        }).catch(err => {
            console.error("Failed to fetch orders", err);
        });
    }, []);

    return (
        <div className="my-orders-container">
            <br />
            <div className="haedingText">{authUser.userName}'s Orders</div>
            <br />

            {orders && orders.length > 0 ?
                orders.map((order, idx) => (
                    <div key={idx} className="order-card">
                        <p><span>Order ID:</span> {order.razorpayOrderId}</p>
                        <p><span>Status:</span> <span className="status">{order.status}</span></p>
                        <p><span>Total:</span> ₹{(order.amount / 100).toFixed(2)}</p>
                        <p><span>Date:</span> <span className="date">{new Date(order.orderedAt).toLocaleString()}</span></p>
                    </div>
                )) : <div className="emptyImage"></div>
            }

        </div>
    );
}

export default MyOrders;
