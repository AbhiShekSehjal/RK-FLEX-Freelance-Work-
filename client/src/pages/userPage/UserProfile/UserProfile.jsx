// import Cart from "../../../components/allWallpaers/ProductCard/Cart.js"
import { useWallsStore } from "../../../store/useAllWallpapers.js";
import { userAuthStore } from "../../../store/useAuthUser.js"
import "./UserProfile.css"

function UserProfile() {

    const { authUser } = userAuthStore();
    const { userOrders } = useWallsStore();


    const handeShiftBox = (boxClass) => {

        const allBoxes = document.querySelectorAll('.authUserInfoContainer > div');

        allBoxes.forEach((box) => {
            box.style.display = 'none';
        });
        const box = document.querySelector(`.${boxClass}`)
        if (box) {
            box.style.display = "flex";
        }
    }

    return (
        <div className="userProfilePage">

            <div className="userProfileContainer">

                <div className="sideOptionsContainer">
                    <div className="sideOptionsContainerIcon"
                        onClick={() => handeShiftBox("authUserInfoContainerInfoBox")}>
                        <i className="fa-solid fa-user fa-xl"></i>
                    </div>

                    <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerOrdersBox")}>
                        <i className="fa-solid fa-cart-shopping fa-xl"></i>
                    </div>

                    <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerAddressBox")}>
                        <i className="fa-solid fa-location-dot fa-xl"></i>
                    </div>

                    <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerLogoutBox")}>
                        <i className="fa-solid fa-right-from-bracket fa-xl"></i>
                    </div>
                </div>

                <div className="authUserInfoContainer">

                    <div className="authUserInfoContainerInfoBox">
                        <p><b>Your profile</b></p>
                        <br />
                        <div className="authUserName">Hello {authUser.userName}, Welcome to our web</div>
                        <div className="authUserEmail">{authUser.userEmail}</div>
                    </div>

                    <div className="authUserInfoContainerOrdersBox">
                        <p><b>Your Orders</b></p>
                        <br />
                        {userOrders ? "your orders" : "You haven't placed any orders yet."}
                    </div>

                    <div className="authUserInfoContainerAddressBox">
                        <p><b>Your Address</b></p>
                        <br />
                        <p>userAddress by default India</p>
                    </div>

                    <div className="authUserInfoContainerLogoutBox">
                        <p><b>Logout</b></p>
                        <br />
                        <button>Logout</button>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default UserProfile
