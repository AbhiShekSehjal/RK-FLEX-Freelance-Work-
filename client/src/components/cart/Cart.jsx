import { useNavigate } from "react-router-dom";
import { useWallsStore } from "../../store/useAllWallpapers.js";
// import { useOrders } from "../../store/useOrders.js";
import "./Cart.css";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios.js";
import { useOrders } from "../../store/useOrders.js";

function Cart({ className, onClose, handleRefresh, refreshTrigger }) {

    const { productCard, selectedProductCard, cartItems, setCartItems } = useWallsStore();
    const { handler } = useOrders();

    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.wallPrice, 0);
    const formattedTotalPrice = totalPrice.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);


    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, [refreshTrigger, setCartItems]);

    const handleShowProductCard2 = (id) => {
        onClose();
        productCard(id.id);
        if (selectedProductCard) {
            navigate(`/walls/${id.id}`);
        }
    }

    const handleRemoveProductFromCart = (product) => {
        try {
            const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

            const updatedCart = currentCart.filter(item => item._id !== product);

            localStorage.setItem("cart", JSON.stringify(updatedCart))

            setCartItems(updatedCart);

            toast.success("Product removed removed cart");

        } catch {
            toast.error("Failed to removed product from cart");
        }
    }

    async function CheckoutButton() {

        if (cartItems.length === 0) return;

        try {
            const amount = totalPrice;

            const res = await axiosInstance.post("/order/createOrder", {
                amount: amount,
                currency: "INR",
                products: cartItems,
            });

            const order = res.data;

            if (!order.id) {
                toast.error("Failed to create Razorpay order");
                return;
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "RK Flex",
                description: "Wallpaper Purchase",
                image: "https://your-logo-url.png",
                order_id: order.id,
                handler: handler, // from zustand
                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            toast.error("Something went wrong during checkout");
            console.error(error);
        }
    }


    return (
        <div className={className}>

            <div className="cartOtherBtns">

                <div className="close-cart-btn" onClick={onClose}>
                    &times;
                </div>

                <button className="bookmarkBtn" onClick={handleRefresh}>
                    <span className="IconContainer">
                        <div className="svg-wrapper">
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.793 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L14.086 7H12.5C8.952 7 6 9.952 6 13.5S8.952 20 12.5 20s6.5-2.952 6.5-6.5a1 1 0 1 1 2 0c0 4.652-3.848 8.5-8.5 8.5S4 18.152 4 13.5 7.848 5 12.5 5h1.586l-1.293-1.293a1 1 0 0 1 0-1.414z" fill="#0D0D0D" /></svg>
                        </div>
                    </span>
                    <p className="text">Refresh</p>
                </button>
            </div>


            <div className="selectedProducts">
                {cartItems.length === 0 ? (
                    <div className="noProductInCart">
                        <img src="https://res.cloudinary.com/dtotogjvb/image/upload/v1750660993/empty-cart_ozyrcf.png" alt="" width={400} />
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div key={item._id} className="cartItem">
                            <img
                                src={item.wallImages[0].url}
                                alt={item.wallImages[0].altText}
                                width={100}
                            />
                            <div className="productInfo">
                                <h4 onClick={() => handleShowProductCard2({ id: item._id })} >{item.wallName}</h4>
                                <p>Design: {item.wallDesignType}</p>
                                <p>Rating : {item.wallRating} stars</p>
                                <p>Colour : {item.wallColorType}</p>
                                <p>Design : {item.wallDesignType}</p>
                                <p>Room type : {item.wallRoomType}</p>
                                <p>length : {cartItems.length}</p>
                            </div>
                            <div className="removeFromCart" onClick={() => handleRemoveProductFromCart(item._id)}>
                                <button>Remove</button>
                            </div>

                            <div className="ProductPrice">
                                <p>Price: Rs. {item.wallPrice.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    ))
                )}



                {cartItems.length !== 0 && (
                    <div className="totalPriceContainer">

                        <div className="totalPriceTopContainer">
                            <b className="totalPriceText">Total Price</b>
                            <b className="totalPrice">{formattedTotalPrice}</b>
                        </div>

                        <div className="totalPriceBottomContainer" onClick={CheckoutButton}>
                            <p>Check out</p>
                        </div>

                    </div>
                )}

            </div>


        </div>
    );
}

export default Cart;
