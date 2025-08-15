import { useRef, useEffect, useState } from "react";
import { userAuthStore } from "../../store/useAuthUser.js";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';
import { useWallsStore } from "../../store/useAllWallpapers.js";
import Cart from "../cart/Cart.jsx";

function Navbar() {
    const navigate = useNavigate();

    const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const { searchedItem, searchedItemInput, productCard } = useWallsStore();

    const [searchItem, setSearchItem] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                setIsCartOpen(false);
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    useEffect(() => {
        if (searchItem.length > 0) {
            searchedItem(searchItem);
        }
    }, [searchItem, searchedItem]);

    const { authUser } = userAuthStore();

    const handleHamburger = () => {
        let line2 = document.getElementById("line2");
        let line1 = document.getElementById("line1");
        let line3 = document.getElementById("line3");
        let sidebar = document.getElementById("sidebar");

        if (sidebar.style.display === "flex") {
            line2.style.width = "40px";
            line1.style.width = "28px";
            line3.style.width = "15px";
            sidebar.style.display = "none";
        } else {
            line2.style.width = "10px";
            line1.style.width = "20px";
            line3.style.width = "35px";
            sidebar.style.display = "flex";
        }
    };

    const closeSideNavabar = () => {
        let sidebar = document.getElementById("sidebar");
        sidebar.style.display = sidebar.style.display === "flex" ? "none" : "flex";
    };

    const openSearchBox = () => {
        setIsOpenSearchBar(true);
        setTimeout(() => {
            const search = document.querySelector(".search");
            if (search) search.focus();
        }, 100);
    };

    const closeSearchBox = (e) => {
        e.stopPropagation();
        setIsOpenSearchBar(false);
        setSearchItem("");
    };

    const handleSearchItem = (e) => {
        e.stopPropagation();
        if (e.key === "Enter" && searchItem.trim() !== "") {
            navigate(`/walls/search?query=${encodeURIComponent(searchItem)}`);
            setIsOpenSearchBar(false);
            setSearchItem("");
        }
    };

    const handleOnClickCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const handleRefresh = () => {
        setRefresh(prev => !prev);
    };

    const handleCartLinkClick = () => {
        navigate("/cartPage");
    };

    const handleProfileLinkClick = () => {
        navigate("/userProfile");
    };

    const handleShowProductCardNav = (id) => {
        console.log("Clicked product details:", id);
        productCard(id.id);
        // if (selectedProductCard) {
        navigate(`/walls/${id.id}`);
        // }
        setIsOpenSearchBar(false);
    }

    return (
        <>
            <nav className="navbar" id="navbar">
                <div className="logo" onClick={() => navigate("/")}></div>

                <div
                    className="search-box"
                    onClick={openSearchBox}
                    style={{
                        width: isOpenSearchBar ? "35%" : "25%",
                        borderRadius: isOpenSearchBar ? "0px" : "30px"
                    }}
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        className="search"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        onKeyDown={handleSearchItem}
                    />

                    {isOpenSearchBar && (
                        <i
                            className="fa-solid fa-xmark fa-lg crossMark"
                            onClick={closeSearchBox}
                        ></i>
                    )}
                </div>

                {searchItem.trim() !== "" && searchedItemInput && searchedItemInput.length > 0 && (
                    <ul className="wallCard2">
                        {searchedItemInput.map((wall) => {
                            const regex = new RegExp(`(${searchItem})`, "i");
                            const wallName = wall.wallName.split(regex);
                            const wallColorType = wall.wallColorType.split(regex);
                            const wallDesignType = wall.wallDesignType.split(regex);
                            const wallRoomType = wall.wallRoomType.split(regex);

                            return (
                                <li
                                    key={wall._id}
                                    className="listItem"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        handleShowProductCardNav({ id: wall._id })
                                        setSearchItem("");
                                        setIsOpenSearchBar(false);
                                    }}
                                >
                                    {wallName.map((part, index) =>
                                        regex.test(part) ? (
                                            <mark key={index}>{part}</mark>
                                        ) : (
                                            <span key={index}>{part}</span>
                                        )
                                    )}
                                    {wallColorType.map((part, index) =>
                                        regex.test(part) ? (
                                            <mark key={index}>{part}</mark>
                                        ) : (
                                            <span key={index}>{part}</span>
                                        )
                                    )}
                                    {wallDesignType.map((part, index) =>
                                        regex.test(part) ? (
                                            <mark key={index}>{part}</mark>
                                        ) : (
                                            <span key={index}>{part}</span>
                                        )
                                    )}
                                    {wallRoomType.map((part, index) =>
                                        regex.test(part) ? (
                                            <mark key={index}>{part}</mark>
                                        ) : (
                                            <span key={index}>{part}</span>
                                        )
                                    )}
                                    <img
                                        src={wall.wallImages[0].url}
                                        alt={wall.wallImages[0].altText}
                                        width={60}
                                        style={{ marginLeft: "10px" }}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}

                <ul className="nav-links" id="navLinks">
                    <li><a onClick={() => navigate("/")}>Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/ourworks">Our works</a></li>
                    <li><a onClick={() => navigate("/myOrders")}>History</a></li>
                </ul>

                <div className="authUserSection">
                    <div className="authUser">
                        {authUser && (
                            <i
                                className="fa-regular fa-circle-user fa-2xl"
                                onClick={() => navigate("/userProfile")}
                            ></i>
                        )}
                    </div>

                    <div className="userCart">
                        <i
                            className="fa-solid fa-cart-shopping fa-2xl"
                            onClick={handleOnClickCart}
                        ></i>
                    </div>
                </div>

                <div className="hamburger" onClick={handleHamburger}>
                    <span className="line1" id="line1"></span>
                    <span className="line2" id="line2"></span>
                    <span className="line3" id="line3"></span>
                </div>

                <div className="sidebar" id="sidebar">
                    <ul className="sidebar-nav-links">
                        <li onClick={closeSideNavabar}><a onClick={() => navigate("/")}>Home</a></li>
                        <li onClick={closeSideNavabar}><a href="#about" id="link">About</a></li>
                        <li onClick={closeSideNavabar}><a href="#ourworks" id="link">Our works</a></li>
                        <li onClick={closeSideNavabar}><a onClick={() => navigate("/myOrders")}>History</a></li>
                        <li onClick={() => { handleCartLinkClick(); closeSideNavabar(); }}>
                            <a>Cart</a>
                        </li>
                        <li onClick={() => { handleProfileLinkClick(); closeSideNavabar(); }}>
                            <a>Profile</a>
                        </li>
                    </ul>
                    <div className="crossbtn" id="crossbtn" onClick={closeSideNavabar}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>

                {isCartOpen && (
                    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}></div>
                )}

                <Cart
                    className={isCartOpen ? "cart open" : "cart"}
                    onClose={() => setIsCartOpen(false)}
                    refreshTrigger={refresh}
                    handleRefresh={handleRefresh}
                />
            </nav>
        </>
    );
}

export default Navbar;
