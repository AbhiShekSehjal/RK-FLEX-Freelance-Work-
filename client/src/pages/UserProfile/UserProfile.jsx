import { useState, useEffect } from "react";
import { useWallsStore } from "../../store/useAllWallpapers.js";
import { userAuthStore } from "../../store/useAuthUser.js";
import "./UserProfile.css";
import axios from "axios";
import toast from "react-hot-toast";

function UserProfile() {
    const { authUser, logOut, updateProfilePic, updateAddress } = userAuthStore();
    const { cartItems, setCartItems } = useWallsStore();
    const [isUploading, setIsUploading] = useState(false); // loading state

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

    const handleSelectFile = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            try {
                setIsUploading(true); // start loading

                // 1️⃣ Create an image object
                const img = document.createElement("img");
                img.src = URL.createObjectURL(file);

                await new Promise((resolve) => {
                    img.onload = resolve;
                });

                // 2️⃣ Create a canvas and resize
                const canvas = document.createElement("canvas");
                const maxSize = 400; // max width/height
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height = Math.round((height *= maxSize / width));
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width = Math.round((width *= maxSize / height));
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                // 3️⃣ Convert canvas to blob (JPEG, 0.8 quality)
                const compressedBlob = await new Promise((resolve) => {
                    canvas.toBlob(
                        (blob) => resolve(blob),
                        "image/jpeg",
                        0.8
                    );
                });

                // 4️⃣ Upload to Cloudinary
                const formData = new FormData();
                formData.append("file", compressedBlob, "profile-pic.jpg");
                formData.append("upload_preset", "my_unsigned_preset"); // your preset

                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dtotogjvb/image/upload", // your cloud name
                    formData
                );

                const imageUrl = response.data.secure_url;
                await updateProfilePic(authUser._id, imageUrl);

                toast.success("Profile picture updated!");
            } catch (err) {
                console.error("Error uploading image:", err);
                toast.error("Failed to update profile picture. Please try again.");
            } finally {
                setIsUploading(false);
            }
        }
    };


    return (
        <>
            <div className="haedingTextforUserProfile">Welcome, {authUser.userName}</div>
            <br /><br />
            <div className="userProfilePage">
                <div className="userProfileContainer">
                    <div className="sideOptionsContainer">
                        <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerInfoBox")}>
                            <i className="fa-solid fa-user"></i><span>Profile</span>
                        </div>
                        <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerOrdersBox")}>
                            <i className="fa-solid fa-cart-shopping"></i><span>Orders</span>
                        </div>
                        <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerAddressBox")}>
                            <i className="fa-solid fa-location-dot"></i><span>Address</span>
                        </div>
                        <div className="sideOptionsContainerIcon" onClick={() => handeShiftBox("authUserInfoContainerLogoutBox")}>
                            <i className="fa-solid fa-right-from-bracket"></i><span>Logout</span>
                        </div>
                    </div>

                    <div className="authUserInfoContainer">
                        <div className="authUserInfoContainerInfoBox">
                            <h2 className="sectionTitle">Your Profile</h2>
                            <div className="profilePicBox">
                                {isUploading ? (
                                    <div className="loadingSpinner"></div>
                                ) : (
                                    <img
                                        src={authUser.userProfilePic ? authUser.userProfilePic : "https://res.cloudinary.com/dtotogjvb/image/upload/v1755250084/userDefault_oqp2r4.png"}
                                        alt=""
                                        className="userProfile"
                                    />
                                )}
                                <div
                                    className="addNewProfilePic"
                                    onClick={() => document.getElementById("fileInputProfile").click()}
                                >
                                    +
                                </div>
                                <input
                                    type="file"
                                    id="fileInputProfile"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleSelectFile}
                                />
                            </div>
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
                            <p>{authUser.address || "No address added yet."}</p>

                            <button
                                className="luxuryAddAddressBtn"
                                onClick={() => {
                                    const newAddress = prompt("Enter your new address:");
                                    if (newAddress && newAddress.trim() !== "") {
                                        updateAddress(authUser._id, newAddress);
                                    }
                                }}
                            >
                                Add / Update Address
                            </button>
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
        </>
    );
}

export default UserProfile;
