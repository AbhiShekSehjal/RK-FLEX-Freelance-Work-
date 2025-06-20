import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useWallsStore } from '../../../store/useAllWallpapers';
import { useEffect } from 'react';
import './CartPage.css';

function CartPage() {
    const { productCard, selectedProductCard, cartItems, setCartItems } = useWallsStore();
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
                            src="https://res.cloudinary.com/dtotogjvb/image/upload/v1750051743/empty-cart_x2vq2d.png"
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
                            <button className="checkout-btn">Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartPage;
