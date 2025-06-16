import { useState } from "react";
import { userAuthStore } from "../store/useAuthUser.js";
import "../pages/Login.css";

function LogIn() {

    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: ""
    });

    const { logIn, isLogingIn } = userAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        logIn(formData);

        setFormData({
            userEmail: "",
            userPassword: ""
        })
    }

    return (
        <div className="loginPage">
            <h1 className="loginText">Login with Email</h1>

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
                    {isLogingIn ? <i className="fa-solid fa-spinner fa-spin fa-2xl"></i> : "Login"}
                </button>
            </form>
        </div>
    )
}

export default LogIn
