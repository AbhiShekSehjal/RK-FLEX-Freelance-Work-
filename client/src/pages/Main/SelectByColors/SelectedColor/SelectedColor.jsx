import { useWallsStore } from "../../../../store/useAllWallpapers.js";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import "./SelectedColor.css"

function SelectedColor() {

    const navigate = useNavigate();

    const { productCard, selectedProductCard, selectedColorType, selectedColorWalls } = useWallsStore();

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
            <div className="haedingTextforSelectedColor">
                Wallpapers in {selectedColorType}
                <p style={{ fontSize: "14px", margin: "20px 0px" }}><b>Found : </b>{selectedColorWalls.length} results</p>
            </div>

            <hr />
            <br />
            <br />

            <div className="ourAllWallsforSelectedColor">

                <div className="wallsforSelectedColor">
                    {selectedColorWalls && selectedColorWalls.length > 0 ? (
                        selectedColorWalls.map((wall) => (
                            <div className="wallCardforSelectedColor" key={wall._id}>
                                <div className="wallImageforSelectedColor" onClick={() => handleShowProductCard({ id: wall._id })}>
                                    <img
                                        src={wall.wallImages[1]?.url}
                                        alt={wall.wallImages[1]?.altText || "Wallpaper"}
                                    />
                                </div>

                                <div className="moreInfoforSelectedColor">
                                    <div className="wallNameforSelectedColor"><b>{wall.wallName}</b></div>
                                    <div className="wallDiscriptionforSelectedColor">{wall.wallDiscription}</div>
                                    <div className="wallPriceforSelectedColor">Rs. {wall.wallPrice}</div>
                                    <div className="wallRatingforSelectedColor">{wall.wallRating} stars</div>

                                    <div className="buyOrAddCartforSelectedColor">
                                        <button className='buyWallforSelectedColor'>Buy</button>
                                        <button className='addOnCartWallforSelectedColor' onClick={() => handleOnClickAddOnCart(wall)}>Add on Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="emptyTextForPage">No wallpaper yet, coming soon are wallpapers for {selectedColorType}</div>
                    )}
                </div>

            </div >
        </>
    )
}

export default SelectedColor
