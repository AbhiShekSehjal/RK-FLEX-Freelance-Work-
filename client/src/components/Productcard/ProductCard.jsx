import "./ProductCard.css"
import { useWallsStore } from "../../store/useAllWallpapers.js"
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


function ProductCard() {

  const navigate = useNavigate();
  const { selectedProductCard, allWall, productCard } = useWallsStore();



  const handleShowProductCard = (id) => {
    productCard(id);
    if (selectedProductCard) {
      navigate(`/productCard/${id.id}`);
    }
  }

  if (!selectedProductCard) {
    return <div className="productCard"><i className="fa-solid fa-spinner fa-spin fa-2xl"></i></div>; // Or a spinner
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

  return (
    <>
      <div className="productCard">

        <div className="leftSideCard">
          {selectedProductCard.wallImages ?

            selectedProductCard.wallImages.map((image) => (
              <img src={image.url} alt={image.altText} key={image._id} className="selectedProductCardWallImage" />
            ))
            :
            <div>
              <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
            </div>
          }

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
            <button className='orderOnWhatsapp'>
              <img
                src="https://res.cloudinary.com/dtotogjvb/image/upload/v1749883648/whatsapp_k92ryi.png"
                alt="whatsapp_logo"
                style={{ marginRight: "1rem" }}
              />
              <p>Order on Whatsapp</p></button>
          </div>

        </div>


      </div>



      <div className="ourAllWallsAtProductCart">
      <div className="haedingText">You will also like these wallpapers</div>

        <div className="wallsAtProductCart">
          {allWall && allWall.length > 0 ? (
            allWall.map((wall) => (
              <div className="wallCardAtProductCart" key={wall._id}>
                <div className="wallImageAtProductCart" onClick={() => handleShowProductCard({ id: wall._id })}>
                  <img
                    src={wall.wallImages[1]?.url}
                    alt={wall.wallImages[1]?.altText || "Wallpaper"}
                  />
                </div>

                <div className="moreInfoAtProductCart">
                  <div className="wallNameAtProductCart"><b>{wall.wallName}</b></div>
                  <div className="wallDiscriptionAtProductCart">{wall.wallDiscription}</div>
                  <div className="wallPriceAtProductCart">Rs. {wall.wallPrice}</div>
                  <div className="wallRatingAtProductCart">{wall.wallRating} stars</div>

                  <div className="buyOrAddCartAtProductCart">
                    <button className='buyWallAtProductCart'>Buy</button>
                    <button className='addOnCartWallAtProductCart' onClick={() => handleOnClickAddOnCart(wall)}>Add on Cart</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
          )}
        </div>

      </div >

    </>
  )
}

export default ProductCard
