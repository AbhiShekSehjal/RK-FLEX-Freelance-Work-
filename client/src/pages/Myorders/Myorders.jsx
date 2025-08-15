import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios.js";
import "./Myorders.css";
import { userAuthStore } from "../../store/useAuthUser.js";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const { authUser } = userAuthStore();

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    useEffect(() => {
        axiosInstance.get("/order/myorders")
            .then(res => {
                console.log("Fetched Orders: ", res.data);
                setOrders(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch orders", err);
            });
    }, []);

    // Calculate the current orders for the page
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Total pages
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    return (
        <div className="my-orders-container">
            <br />
            <div className="haedingText">{authUser.userName}'s Orders</div>
            <br />

            {currentOrders && currentOrders.length > 0 ? (
                currentOrders.map((order, idx) => (
                    <div key={idx} className="order-card">
                        <p><span>Order ID:</span> {order.razorpayOrderId}</p>
                        <p><span>Status:</span> <span className="status">{order.status}</span></p>
                        <p><span>Total:</span> ₹{(order.amount / 100).toFixed(2)}</p>
                        <p><span>Date:</span> <span className="date">{new Date(order.orderedAt).toLocaleString()}</span></p>
                    </div>
                ))
            ) : (
                <div className="emptyImage"></div>
            )}

            {/* Pagination Controls */}
            {orders.length > ordersPerPage && (
                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyOrders;
