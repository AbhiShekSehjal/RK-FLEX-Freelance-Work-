import "./ShopWalls.css";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useWallsStore } from "../../store/useAllWallpapers";

function ShopWalls() {

    const navigate = useNavigate();

    const { allWall, allAllWalls, selectByDesign, productCard, selectedProductCard } = useWallsStore();

    useEffect(() => {
        allAllWalls();
        selectByDesign()
    }, [allAllWalls, selectByDesign]);

    const handleShowProductCard = (id) => {
        productCard(id);
        if (selectedProductCard) {
            navigate(`/home/productCard/${id.id}`);
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
            <div className="haedingTextforShopWallsPage">Special design Wallpapers
                <p style={{ fontSize: "14px", margin: "30px 0px" }}><b>Found : </b>{allWall.length} results</p>
            </div>

            <hr />
            <br />
            <br />

            <div className="ourAllWallsforShopWalls">

                <div className="wallsforShopWalls">
                    {allWall && allWall.length > 0 ? (
                        allWall.map((wall) => (
                            <div className="wallCardforShopWalls" key={wall._id}>
                                <div className="wallImageforShopWalls" onClick={() => handleShowProductCard({ id: wall._id })}>
                                    <img
                                        src={wall.wallImages[1]?.url}
                                        alt={wall.wallImages[1]?.altText || "Wallpaper"}
                                    />
                                </div>

                                <div className="moreInfoforShopWalls">
                                    <div className="wallNameforShopWalls"><b>{wall.wallName}</b></div>
                                    <div className="wallDiscriptionforShopWalls">{wall.wallDiscription}</div>
                                    <div className="wallPriceforShopWalls">Rs. {wall.wallPrice}</div>
                                    <div className="wallRatingforShopWalls">{wall.wallRating} stars</div>

                                    <div className="buyOrAddCartforShopWalls">
                                        <button className='buyWallforShopWalls'>Buy</button>
                                        <button className='addOnCartWallforShopWalls' onClick={() => handleOnClickAddOnCart(wall)}>Add on Cart</button>
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

export default ShopWalls