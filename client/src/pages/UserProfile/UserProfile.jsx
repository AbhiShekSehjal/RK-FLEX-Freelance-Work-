import { useEffect } from "react";
import { useWallsStore } from "../../store/useAllWallpapers.js";
import { userAuthStore } from "../../store/useAuthUser.js";
import "./UserProfile.css";

function UserProfile() {
    const { authUser, logOut } = userAuthStore();
    const { cartItems, setCartItems } = useWallsStore();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, [setCartItems]);

    const handeShiftBox = (boxClass) => {
        const allBoxes = document.querySelectorAll('.authUserInfoContainer > div');
        allBoxes.forEach((box) => box.style.display = 'none');
        const box = document.querySelector(`.${boxClass}`);
        if (box) box.style.display = "flex";
    };

    return (
        <div className="userProfilePage">
            <div className="haedingText">Welcome, {authUser.userName}</div>

            <div className="userProfileContainer">
                <div className="sideOptionsContainer">
                    <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerInfoBox")}>
                        <i className="fa-solid fa-user"></i>
                        <span>Profile</span>
                    </div>
                    <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerOrdersBox")}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>Orders</span>
                    </div>
                    <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerAddressBox")}>
                        <i className="fa-solid fa-location-dot"></i>
                        <span>Address</span>
                    </div>
                    <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerLogoutBox")}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Logout</span>
                    </div>
                </div>

                <div className="authUserInfoContainer">
                    <div className="authUserInfoContainerInfoBox">
                        <h2 className="sectionTitle">Your Profile</h2>
                        <p><strong>Name:</strong> {authUser.userName}</p>
                        <p><strong>Email:</strong> {authUser.userEmail}</p>
                    </div>

                    <div className="authUserInfoContainerOrdersBox">
                        <h2 className="sectionTitle">Your Orders</h2>
                        {cartItems?.length > 0 ? (
                            cartItems.map((item) => (
                                <div className="userOrder" key={item._id}>
                                    <div>
                                        <strong>{item.wallName}</strong>
                                        <p>ID: {item._id}</p>
                                    </div>
                                    <p className="orderPrice">
                                        {item.wallPrice.toLocaleString("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                        })}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="noOrders">You haven't placed any orders yet.</p>
                        )}
                    </div>

                    <div className="authUserInfoContainerAddressBox">
                        <h2 className="sectionTitle">Your Address</h2>
                        <p>Default: India</p>
                    </div>

                    <div className="authUserInfoContainerLogoutBox">
                        <h2 className="sectionTitle">Logout</h2>


                        <button className="luxuryLogoutBtn" onClick={logOut}>
                            <span>Logout</span>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
