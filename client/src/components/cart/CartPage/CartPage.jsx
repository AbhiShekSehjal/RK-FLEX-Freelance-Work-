import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useWallsStore } from '../../../store/useAllWallpapers.js';
import { useEffect } from 'react';
import './CartPage.css';
import { axiosInstance } from '../../../lib/axios.js';
import { useOrders } from '../../../store/useOrders.js';

function CartPage() {
    const { productCard, selectedProductCard, cartItems, setCartItems } = useWallsStore();
    const { handler } = useOrders();
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.wallPrice, 0);
    const formattedTotalPrice = totalPrice.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, [setCartItems]);

    const handleShowProduct = (id) => {
        productCard(id.id);
        if (selectedProductCard) {
            navigate(`/walls/${id.id}`);
        }
    };

    const removeFromCart = (id) => {
        try {
            const updatedCart = cartItems.filter(item => item._id !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCartItems(updatedCart);
            toast.success("Product removed from cart");
        } catch {
            toast.error("Failed to remove product");
        }
    };

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
                image: "https://res.cloudinary.com/dtotogjvb/image/upload/v1755250721/Firefly_we_have_a_business_for_designing_walls_with_wallpaper__designing_wallpapers___so_for__3976922-removebg-preview_1_1_cfdioi.png",
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
        <>

            <div className="cart-container">
                <div className="haedingTextforCartPage">Your Cart</div>
                <br />
                <hr />
                <br />
                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <img
                            src="https://res.cloudinary.com/dtotogjvb/image/upload/v1750660993/empty-cart_ozyrcf.png"
                            alt="Empty Cart"
                            className="empty-image"
                        />
                    </div>
                ) : (
                    <div className="cart-list">
                        {cartItems.map((item) => (
                            <div className="cart-card" key={item._id}>
                                <img
                                    src={item.wallImages[0]?.url}
                                    alt={item.wallImages[0]?.altText || 'wallpaper'}
                                    className="cart-image"
                                />
                                <div className="cart-details">
                                    <h3 className="cart-title" onClick={() => handleShowProduct({ id: item._id })}>
                                        {item.wallName}
                                    </h3>
                                    <p>Design: {item.wallDesignType}</p>
                                    <p>Rating: {item.wallRating} &#9733;</p>
                                    <p>Color: {item.wallColorType}</p>
                                    <p>Room: {item.wallRoomType}</p>
                                </div>
                                <div className="cart-actions">
                                    <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                                        Remove
                                    </button>
                                    <p className="price">₹{item.wallPrice.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        ))}

                        <div className="cart-summary">
                            <div className="summary-header">
                                <h4>Total</h4>
                                <h4>{formattedTotalPrice}</h4>
                            </div>
                            <button className="checkout-btn" onClick={CheckoutButton}>Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartPage;
