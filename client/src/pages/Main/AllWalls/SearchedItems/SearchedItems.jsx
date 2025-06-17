import { useWallsStore } from '../../../../store/useAllWallpapers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./SearchedItems.css"

function SearchedItems() {

    const navigate = useNavigate();

    const { productCard, selectedProductCard, searchedItemInput, searchedInput } = useWallsStore();

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
            <div className="haedingTextforSearchedItem">
                <i>Your search results for "{searchedInput}"</i>
                <p style={{ margin: "20px 0px" }}>Wallpapers for {searchedInput}</p>
                <p style={{ fontSize: "14px", margin: "20px 0px" }}><b>Found : </b>{searchedItemInput.length} results</p>
            </div>

            <hr />
            <br />
            <br />

            <div className="ourAllWallsforSearchedItems">

                <div className="wallsforSearchedItems">
                    {searchedItemInput && searchedItemInput.length > 0 ? (
                        searchedItemInput.map((wall) => (
                            <div className="wallCardforSearchedItems" key={wall._id}>
                                <div className="wallImageforSearchedItems" onClick={() => handleShowProductCard({ id: wall._id })}>
                                    <img
                                        src={wall.wallImages[1]?.url}
                                        alt={wall.wallImages[1]?.altText || "Wallpaper"}
                                    />
                                </div>

                                <div className="moreInfoforSearchedItems">
                                    <div className="wallNameforSearchedItems"><b>{wall.wallName}</b></div>
                                    <div className="wallDiscriptionforSearchedItems">{wall.wallDiscription}</div>
                                    <div className="wallPriceforSearchedItems">Rs. {wall.wallPrice}</div>
                                    <div className="wallRatingforSearchedItems">{wall.wallRating} stars</div>

                                    <div className="buyOrAddCartforSearchedItems">
                                        <button className='buyWallforSearchedItems'>Buy</button>
                                        <button className='addOnCartWallforSearchedItems' onClick={() => handleOnClickAddOnCart(wall)}>Add on Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="emptyTextForPage">No wallpaper yet, coming soon are wallpapers for {searchedInput}</div>
                    )}
                </div>

            </div >
        </>
    )
}

export default SearchedItems
