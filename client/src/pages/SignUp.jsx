import { useState } from "react"
import { userAuthStore } from "../store/useAuthUser.js";
import "./SignUp.css"
import toast from "react-hot-toast";

function SignUp() {
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPassword: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false); // <-- Add this

    const { signUp, isSigningUp } = userAuthStore();

    const validateForm = () => {
        if (!formData.userName.trim()) return "Full name is required";
        if (!formData.userEmail.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.userEmail)) return "Invalid email format";
        if (!formData.userPassword) return "Password is required";
        if (formData.userPassword.length < 6) return "Password must be at least 6 characters";
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateForm();
        if (validation !== true) {
            setErrorMsg(validation);
            toast.error(validation);
            return;
        }
        try {
            await signUp(formData);
            setErrorMsg("");
        } catch (error) {
            setErrorMsg(error?.response?.data?.message || "Sign up failed. Please try again.");
        }
    };

    return (
        <div className="signUpPage">
            <h1 className="signupText">Create an account</h1>
            <br />
            {errorMsg && (
                <div className="popupError">
                    {errorMsg}
                </div>
            )}
            <div className="redirectLink">Already have an account? <a href="/login">Login</a></div>

            <form onSubmit={handleSubmit} className="signUpForm">
                <label htmlFor="userName" className="lableName">Name <i className="fa-solid fa-user"></i></label>
                <input
                    type="text"
                    value={formData.userName}
                    id="userName"
                    className="inputField"
                    placeholder="eg. John Doe"
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                />
                <br />
                <br />


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
                    {isSigningUp ? <i className="fa-solid fa-spinner fa-spin fa-xl"></i> : "Sign up"}
                </button>
            </form>
        </div>
    )
}

export default SignUp
