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
            <div className="haedingText">
                Wallpapers for {selectedRoomType}
                <p style={{ fontSize: "14px", margin: "20px 0px" }}><b>Found : </b>{selectedRoom.length} results</p>
            </div>

            <hr />
            <br />
            <br />

            <div className="walls">
                {selectedRoom && selectedRoom.length > 0 ?
                    selectedRoom.map((wall) => (

                        <div className="wallCard" key={wall._id}>
                            <div className="wallImage" onClick={() => handleShowProductCard({ id: wall._id })}>
                                <img
                                    src={wall.wallImages[1].url}
                                    alt={wall.wallImages[1].altText}
                                />
                            </div>

                            <div className="moreInfo">
                                <div className="wallName"><b>{wall.wallName}</b></div>
                                <div className="wallDiscription">{wall.wallDiscription}</div>
                                <div className="wallPrice">Rs. {wall.wallPrice}</div>
                                <div className="wallDesign">{wall.wallDesignType}</div>

                                <div className="buyOrAddCart">
                                    <button className='buyWall'>Buy</button>
                                    <button className='addOnCartWall' onClick={() => handleOnClickAddOnCart(wall)} >Add on Cart</button>
                                </div>
                            </div>

                        </div>
                    ))
                    :
                    <div className="emptyPageForNoRooms">No wallpaper yet, coming soon are wallpapers for {selectedRoomType}</div>
                }
            </div>
        </>
    )
}

export default SelectedRoom
