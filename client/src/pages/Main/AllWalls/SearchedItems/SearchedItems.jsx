import { useWallsStore } from '../../../../store/useAllWallpapers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
            <div className="haedingText">
                <i>Your search results for "{searchedInput}"</i>
                <p style={{ fontFamily: "Style Script , cursive" }}>Wallpapers for {searchedInput}</p>
                <p style={{ fontSize: "14px", margin: "20px 0px" }}><b>Found : </b>{searchedItemInput.length} results</p>
            </div>

            <hr />
            <br />
            <br />

            <div className="walls">
                {searchedItemInput && searchedItemInput.length > 0 ?
                    searchedItemInput.map((wall) => (

                        <div className="wallCard" key={wall._id} >
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
                    // <i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
                    <div className="emptyPageForNoRooms">There is wallpaper for {searchedInput}
                        <br />
                        <a href="/"><b>Go to home</b></a>
                    </div>
                }
            </div>
        </>
    )
}

export default SearchedItems
