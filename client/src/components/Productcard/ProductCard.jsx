import "./ProductCard.css";
import { useWallsStore } from "../../store/useAllWallpapers.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios.js";

function ProductCard() {
  const navigate = useNavigate();
  const { selectedProductCard, allWall, productCard, setCartItems } = useWallsStore();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoomBackground, setZoomBackground] = useState({
    image: "",
    position: "center",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false); // NEW

  const handleShowProductCard = (wall) => {
    productCard(wall._id);
    navigate(`/walls/${wall._id}`);
  };

  const handleOnClickAddOnCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyInCart = existingCart.find((item) => item._id === product._id);

    if (!isAlreadyInCart) {
      const updatedCart = [product, ...existingCart];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      toast.success("Product added to cart");
    } else {
      toast.error("Product already in cart");
    }
  };

  const handleWhatsappOrder = () => {
    const {
      wallName,
      wallPrice,
      wallColorType,
      wallDesignType,
      wallRoomType,
    } = selectedProductCard;

    const message = `Hello, I want to place an order. Here are the product details:
  
*Product ID:* ${selectedProductCard._id}
*Wallpaper Name:* ${wallName}
*Price:* Rs. ${wallPrice}
*Color Type:* ${wallColorType}
*Design Type:* ${wallDesignType}
*Room Type:* ${wallRoomType}

Please assist me with the order.`;

    const phoneNumber = "917888339203";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const CheckoutButton = async () => {
    if (!selectedProductCard) return;
    try {
      setLoadingPayment(true); // start loading
      const amount = selectedProductCard.wallPrice;
      const res = await axiosInstance.post("/order/createOrder", {
        amount: amount,
        currency: "INR",
        products: [selectedProductCard],
      });

      const order = res.data;
      if (!order.id) {
        toast.error("Failed to create Razorpay order");
        setLoadingPayment(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "RK Flex",
        description: "Wallpaper Purchase",
        image:
          "https://res.cloudinary.com/dtotogjvb/image/upload/v1755250721/Firefly_we_have_a_business_for_designing_walls_with_wallpaper__designing_wallpapers___so_for__3976922-removebg-preview_1_1_cfdioi.png",
        order_id: order.id,
        handler: function (response) {
          toast.success("Payment successful!");
          console.log("Payment response:", response);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
        modal: {
          ondismiss: function () {
            setLoadingPayment(false); // stop loading if closed
          },
        },
      };

      const rzp = new window.Razorpay(options);
      setLoadingPayment(false); // stop loading before opening
      rzp.open();
    } catch (error) {
      toast.error("Something went wrong during checkout");
      console.error(error);
      setLoadingPayment(false);
    }
  };

  const handleBuyClick = () => {
    setShowConfirm(true);
  };

  if (!selectedProductCard) {
    return (
      <div className="productCard">
        <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
      </div>
    );
  }

  const handleShopMoreBtn = () => {
    navigate("/shopWalls")
  }

  return (
    <>
      {/* Loading Overlay */}
      {loadingPayment && (
        <div className="loading-overlay">
          <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
          <p>Preparing payment...</p>
        </div>
      )}

      {showConfirm && (
        <div className="confirm-popup">
          <h2>Confirm Order</h2>
          <p>Do you want to confirm this order?</p>
          <div className="confirm-buttons">
            <button
              className="btn-confirm"
              onClick={() => {
                CheckoutButton();
                setShowConfirm(false);
              }}
            >
              Yes, Confirm
            </button>
            <button
              className="btn-shop-more"
              onClick={() => handleShopMoreBtn()}
            >
              Shop More
            </button>
            <button
              className="btn-cancel"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="productCard responsiveCardWrapper">
        <div
          className="leftSideCard"
          onPointerMove={(e) => {
            const bounds = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            const percentX = (x / bounds.width) * 100;
            const percentY = (y / bounds.height) * 100;

            setPosition({ x, y });
            setZoomBackground({
              image: selectedProductCard.wallImages[0]?.url || "",
              position: `${percentX}% ${percentY}%`,
            });
          }}
        >
          {selectedProductCard.wallImages ? (
            selectedProductCard.wallImages.map((image) => (
              <img
                src={image.url}
                alt={image.altText}
                key={image._id}
                className="selectedProductCardWallImage"
              />
            ))
          ) : (
            <div>
              <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
            </div>
          )}

          <div
            className="zoomOutBox"
            style={{
              left: position.x - 100,
              top: position.y - 100,
              backgroundImage: `url(${zoomBackground.image})`,
              backgroundPosition: zoomBackground.position,
            }}
          ></div>
        </div>

        <div className="rightSideCard">
          <div className="rightSideCardWallName">
            {selectedProductCard.wallName}
          </div>
          <div className="rightSideCardWallPrice">
            <span>Price : </span>Rs. {selectedProductCard.wallPrice}
          </div>
          <div className="rightSideCardWallRating">
            <span>Rating : </span>
            {selectedProductCard.wallRating} stars
          </div>
          <div className="rightSideCardWallDiscription">
            {selectedProductCard.wallDiscription}
          </div>
          <div className="rightSideCardWallColorType">
            <span>Colour : </span>
            {selectedProductCard.wallColorType}
          </div>
          <div className="rightSideCardWallDesignType">
            <span>Design type : </span>
            {selectedProductCard.wallDesignType}
          </div>
          <div className="rightSideCardWallRoomType">
            <span>Room type : </span>
            {selectedProductCard.wallRoomType}
          </div>
          <br />

          <div className="buyOrAddCart2">
            <button className="buyWall2" onClick={handleBuyClick}>
              Buy
            </button>
            <button
              className="addOnCartWall2"
              onClick={() => handleOnClickAddOnCart(selectedProductCard)}
            >
              Add on Cart
            </button>
            or
            <button className="orderOnWhatsapp" onClick={handleWhatsappOrder}>
              <img
                src="https://res.cloudinary.com/dtotogjvb/image/upload/v1753626440/whatsapp-logo-png-2263_ffxi2d.png"
                alt="whatsapp_logo"
              />
              <p>Order on Whatsapp</p>
            </button>
          </div>
        </div>
      </div>

      <div className="haedingTextforShopWallsPage">
        Special design Wallpapers
        <p className="results-count">
          <b>Found : </b>
          {allWall.length} results
        </p>
      </div>

      <hr />
      <br />
      <br />

      <div className="walls">
        {allWall && allWall.length > 0 ? (
          allWall.map((wall) => (
            <div className="wallCard" key={wall._id}>
              <div
                className="wallImage"
                onClick={() => handleShowProductCard(wall)}
              >
                <img
                  src={wall.wallImages[0]?.url}
                  alt={wall.wallImages[0]?.altText || "Wallpaper"}
                />
              </div>

              <div className="moreInfo">
                <div className="wallName">{wall.wallName}</div>
                <div className="wallPrice">
                  Rs. {wall.wallPrice.toLocaleString("en-IN")}
                </div>
                <div className="wallRating">
                  {wall.wallRating} stars &#9733;
                </div>
                <div className="buyOrAddCart">
                  <button
                    className="addOnCartWall"
                    onClick={() => handleOnClickAddOnCart(wall)}
                  >
                    Add on Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <i class="fa-solid fa-spinner" style="color: #fafafa;"></i>
        )}
      </div>
    </>
  );
}

export default ProductCard;
