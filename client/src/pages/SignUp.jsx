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

    const { signUp, isSigningUp } = userAuthStore();

    const validateForm = () => {
        if (!formData.userName.trim()) return toast.error("Full name is required");
        if (!formData.userEmail.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.userEmail)) return toast.error("Invalid email format");
        if (!formData.userPassword) return toast.error("Password is required");
        if (formData.userPassword.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // setFormData(formData);

        const success = validateForm();

        if (success == true) {
            signUp(formData);
        }

        // setFormData({
        //     userName: "",
        //     userEmail: "",
        //     userPassword: ""
        // });

    }

    return (
        <div className="signUpPage">
            <h1 className="signUpText">Create Account</h1>

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
                <input
                    type="password"
                    value={formData.userPassword}
                    id="userPassword"
                    className="inputField"
                    placeholder="eg. 123456"
                    onChange={(e) => setFormData({ ...formData, userPassword: e.target.value })}
                />
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
