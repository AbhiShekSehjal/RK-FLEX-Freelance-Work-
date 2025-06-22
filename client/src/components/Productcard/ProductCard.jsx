import "./ProductCard.css"
import { useWallsStore } from "../../store/useAllWallpapers.js"
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useState } from "react";

function ProductCard() {

  const navigate = useNavigate();
  const { selectedProductCard, allWall, productCard } = useWallsStore();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoomBackground, setZoomBackground] = useState({
    image: "",
    position: "center",
  });

  const handleShowProductCard = (id) => {
    productCard(id.id);
    if (selectedProductCard) {
      navigate(`/walls/${id.id}`);
    }
  }

  if (!selectedProductCard) {
    return <div className="productCard"><i className="fa-solid fa-spinner fa-spin fa-2xl"></i></div>;
  }

  const handleOnClickAddOnCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAllreadyInCart = existingCart.find(item => item._id == product._id);

    if (!isAllreadyInCart) {
      const updatedCart = [product, ...existingCart];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Product added to cart");
    } else {
      toast.error("Product already in cart");
    }
  }

  const handleWhatsappOrder = () => {
    const { wallName, wallPrice, wallColorType, wallDesignType, wallRoomType } = selectedProductCard;

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
  }

  return (
    <>
      <div className="productCard responsiveCardWrapper">

        <div className="leftSideCard"
          onPointerMove={(e) => {
            const bounds = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            const percentX = (x / bounds.width) * 100;
            const percentY = (y / bounds.height) * 100;

            setPosition({ x, y });
            setZoomBackground({
              image: selectedProductCard.wallImages[0]?.url || "",
              position: `${percentX}% ${percentY}%`
            });
          }}

        >
          {selectedProductCard.wallImages ? (
            selectedProductCard.wallImages.map((image) => (
              <img src={image.url} alt={image.altText} key={image._id} className="selectedProductCardWallImage" />
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
              backgroundSize: "800%",
              opacity: 1,
            }}
          ></div>
        </div>

        <div className="rightSideCard">
          <div className="rightSideCardWallName">{selectedProductCard.wallName}</div>
          <div className="rightSideCardWallPrice"><span>Price : </span>Rs. {selectedProductCard.wallPrice}</div>
          <div className="rightSideCardWallRating"><span>Rating : </span>{selectedProductCard.wallRating} stars</div>
          <div className="rightSideCardWallDiscription">{selectedProductCard.wallDiscription}</div>
          <div className="rightSideCardWallColorType"><span>Colour : </span>{selectedProductCard.wallColorType}</div>
          <div className="rightSideCardWallDesignType"><span>Design type : </span>{selectedProductCard.wallDesignType}</div>
          <div className="rightSideCardWallRoomType"><span>Room type : </span>{selectedProductCard.wallRoomType}</div>
          <br />

          <div className="buyOrAddCart2">
            <button className='buyWall2'>Buy</button>
            <button className='addOnCartWall2' onClick={() => handleOnClickAddOnCart(selectedProductCard)}>Add on Cart</button>
            or
            <button className='orderOnWhatsapp' onClick={handleWhatsappOrder}>
              <img
                src="https://res.cloudinary.com/dtotogjvb/image/upload/v1749883648/whatsapp_k92ryi.png"
                alt="whatsapp_logo"
              />
              <p>Order on Whatsapp</p>
            </button>
          </div>
        </div>

      </div>

      <div className="haedingTextforShopWallsPage">
        Special design Wallpapers
        <p style={{ fontSize: "14px", margin: "30px 0px" }}>
          <b>Found : </b>{allWall.length} results
        </p>
      </div>

      <hr />
      <br /><br />

      <div className="walls">
        {allWall && allWall.length > 0 ? (
          allWall.map((wall) => (
            <div className="wallCard" key={wall._id}>
              <div className="wallImage" onClick={() => handleShowProductCard({ id: wall._id })}>
                <img
                  src={wall.wallImages[0]?.url}
                  alt={wall.wallImages[0]?.altText || "Wallpaper"}
                />
              </div>

              <div className="moreInfo">
                <div className="wallName">{wall.wallName}</div>
                <div className="wallPrice">Rs. {wall.wallPrice.toLocaleString('en-IN')}</div>
                <div className="wallRating">{wall.wallRating} stars &#9733;</div>

                <div className="buyOrAddCart">
                  <button className='addOnCartWall' onClick={() => handleOnClickAddOnCart(wall)}>Add on Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
        )}
      </div>
    </>
  )
}

export default ProductCard;