import { useState } from "react";
import { userAuthStore } from "../store/useAuthUser.js";
import "../pages/Login.css";

function LogIn() {
    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false); // <-- Add this

    const { logIn, isLogingIn } = userAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logIn(formData);
            setErrorMsg("");
        } catch (error) {
            setErrorMsg(error?.response?.data?.message || "Login failed. Please try again.");
        }
        setFormData({
            userEmail: "",
            userPassword: ""
        });
    };

    return (
        <div className="loginPage">
            <h1 className="loginText">Login with Email</h1>
            {errorMsg && (
                <div className="popupError">
                    {errorMsg}
                </div>
            )}
            <form onSubmit={handleSubmit} className="loginForm">
                <label htmlFor="userEmail" className="lableName">Email <i className="fa-solid fa-envelope"></i></label>
                <input
                    type="email"
                    value={formData.userEmail}
                    id="userEmail"
                    className="inputField"
                    placeholder="eg. abc@gmail.com"
                    onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                />
                <br />
                <br />

                <label htmlFor="userPassword" className="lableName">Password <i className="fa-solid fa-lock"></i></label>
                <div style={{ position: "relative" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={formData.userPassword}
                        id="userPassword"
                        className="inputField"
                        placeholder="eg. 123456"
                        onChange={(e) => setFormData({ ...formData, userPassword: e.target.value })}
                    />
                    <span
                        className="eye-btn"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                </div>
                <br />
                <br />

                <button type="submit" className="authBtn">
                    {isLogingIn ? <i className="fa-solid fa-spinner fa-spin fa-2xl"></i> : "Login"}
                </button>
            </form>

            <div className="redirectLink">Don’t have an account? <a href="/signup">Join</a></div>
        </div>
    )
}

export default LogIn
