import { useState, useEffect } from 'react';
import "./AllWalls.css";
import { useWallsStore } from '../../../store/useAllWallpapers.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AllWalls() {

    const navigate = useNavigate();

    const [selectDesign, setSelectDesign] = useState(false);
    const [priceRange, setPriceRange] = useState(2500);

    const { allWall, allAllWalls, selectByDesign, selectedWallByDesign, productCard, selectedProductCard } = useWallsStore();

    useEffect(() => {
        allAllWalls();
        selectByDesign();
    }, [allAllWalls, selectByDesign]);

    const selectedDesign = (design) => {
        if (design) {
            if (!selectDesign) {
                setSelectDesign(false);
                selectByDesign(design);
            } else {
                setSelectDesign(false);
            }
        }
    }

    const handleShowProductCard = (id) => {
        productCard(id);
        if (selectedProductCard) {
            navigate(`/productCard/${id.id}`);
        }
    }

    const handleOnClickAddOnCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const isAllreadyInCart = existingCart.find(item => item._id === product._id);

        if (!isAllreadyInCart) {
            const updatedCart = [product, ...existingCart];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            toast.success("Product added to cart");
        } else {
            toast.error("Product already in cart");
        }
    }

    const filteredWalls = (selectedWallByDesign && selectedWallByDesign.length > 0
        ? selectedWallByDesign
        : allWall
    )?.filter(wall => wall.wallPrice <= priceRange);

    return (
        <>
            <div className="haedingText">Special design Wallpapers</div>
            <div className="ourAllWalls">

                <div className="sideFilterBar">
                    <div className="filterByText">
                        <h2 className="filterHeading">Choose Your Style</h2>
                    </div>

                    <div className="byPrice">
                        <h4 className="filterSubHeading">Filter by Price</h4>
                        <input
                            type="range"
                            id="priceRange"
                            min={1100}
                            max={10000}
                            step={100}
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                        />
                        <p className="priceRangeDisplay">Up to ₹{priceRange.toLocaleString()}</p>
                    </div>

                    <hr className="luxuryDivider" />

                    <div className="byDesign">
                        <h4 className="filterSubHeading">Filter by Design</h4>
                        <ul className="selectByDesignList">
                            {[
                                "Botanical", "Solid", "Damask", "Texture", "Stripes",
                                "Metallic", "Minimal", "Gradient", "Marble", "Floral", "Wood"
                            ].map((design) => (
                                <li key={design} className="selectByDesignListItem">
                                    <input
                                        type="checkbox"
                                        id={design}
                                        onChange={(e) => selectedDesign(e.target.checked && design)}
                                    />
                                    <label htmlFor={design}>{design}</label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <hr className="luxuryDivider" />
                </div>

                <div className="walls">
                    {filteredWalls && filteredWalls.length > 0 ? (
                        filteredWalls.map((wall) => (
                            <div className="wallCard" key={wall._id} style={{ boxShadow: "rgba(0, 0, 0, 0.55) 0px 10px 8px -5px" }}>
                                <div className="wallImage" onClick={() => handleShowProductCard({ id: wall._id })}>
                                    <img
                                        src={wall.wallImages[1]?.url}
                                        alt={wall.wallImages[1]?.altText || "Wallpaper"}
                                    />
                                </div>

                                <div className="moreInfo">
                                    <div className="wallName"><b>{wall.wallName}</b></div>
                                    <div className="wallDiscription">{wall.wallDiscription}</div>
                                    <div className="wallPrice">Rs. {wall.wallPrice}</div>
                                    <div className="wallDesign">{wall.wallDesignType}</div>

                                    <div className="buyOrAddCart">
                                        <button className='buyWall'>Buy</button>
                                        <button className='addOnCartWall' onClick={() => handleOnClickAddOnCart(wall)}>Add on Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
                    )}
                </div>
            </div>
        </>
    );
}

export default AllWalls;
