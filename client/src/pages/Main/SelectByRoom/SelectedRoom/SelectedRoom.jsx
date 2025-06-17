import { useWallsStore } from "../../../../store/useAllWallpapers.js"
import { useNavigate } from 'react-router-dom';
import "./SelectedRoom.css"
import toast from "react-hot-toast";

function SelectedRoom() {

    const navigate = useNavigate();

    const { productCard, selectedProductCard, selectedRoomType, selectedRoom } = useWallsStore();

    const handleShowProductCard = (id) => {
        productCard(id);
        if (selectedProductCard) {
            navigate(`/productCard/${id.id}`);
        }
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
            <div className="haedingTextforSelectedRoom">
                Wallpapers for {selectedRoomType}
                <p style={{ fontSize: "14px", margin: "20px 0px" }}><b>Found : </b>{selectedRoom.length} results</p>
            </div>

            <hr />
            <br />
            <br />

            <div className="ourAllWallsforSelectedRoom">

                <div className="wallsforSelectedRoom">
                    {selectedRoom && selectedRoom.length > 0 ? (
                        selectedRoom.map((wall) => (
                            <div className="wallCardforSelectedRoom" key={wall._id}>
                                <div className="wallImageforSelectedRoom" onClick={() => handleShowProductCard({ id: wall._id })}>
                                    <img
                                        src={wall.wallImages[1]?.url}
                                        alt={wall.wallImages[1]?.altText || "Wallpaper"}
                                    />
                                </div>

                                <div className="moreInfoforSelectedRoom">
                                    <div className="wallNameforSelectedRoom"><b>{wall.wallName}</b></div>
                                    <div className="wallDiscriptionforSelectedRoom">{wall.wallDiscription}</div>
                                    <div className="wallPriceforSelectedRoom">Rs. {wall.wallPrice}</div>
                                    <div className="wallRatingforSelectedRoom">{wall.wallRating} stars</div>

                                    <div className="buyOrAddCartforSelectedRoom">
                                        <button className='buyWallforSelectedRoom'>Buy</button>
                                        <button className='addOnCartWallforSelectedRoom' onClick={() => handleOnClickAddOnCart(wall)}>Add on Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="emptyTextForPage">No wallpaper yet, coming soon are wallpapers for {selectedRoom}</div>
                    )}
                </div>

            </div >
        </>
    )
}

export default SelectedRoom
