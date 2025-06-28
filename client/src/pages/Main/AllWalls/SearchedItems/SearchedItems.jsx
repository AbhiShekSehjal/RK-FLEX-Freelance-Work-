import { useWallsStore } from '../../../../store/useAllWallpapers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./SearchedItems.css"

function SearchedItems() {

    const navigate = useNavigate();

    const { productCard, selectedProductCard, searchedItemInput, searchedInput } = useWallsStore();

    const handleShowProductCard = (id) => {
        productCard(id.id);
        if (selectedProductCard) {
            navigate(`/walls/${id.id}`);
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

            <div className="walls">
                {searchedItemInput && searchedItemInput.length > 0 ? (
                    searchedItemInput.map((wall) => (
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
                    <div className="emptyTextForPage">No wallpaper yet, coming soon are wallpapers for {searchedInput}</div>
                )}
            </div>
        </>
    )
}

export default SearchedItems
