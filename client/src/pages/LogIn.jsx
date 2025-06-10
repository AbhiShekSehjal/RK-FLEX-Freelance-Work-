import { useState } from "react"
import { userAuthStore } from "../store/useAuthUser.js";

function LogIn() {

    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: ""
    });

    const { logIn } = userAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        logIn(formData);

        setFormData({
            userEmail: "",
            userPassword: ""
        })
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userEmail">Email : </label>
                <input
                    type="email"
                    value={formData.userEmail}
                    id="userEmail"
                    onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                />
                <br />
                <br />
                <label htmlFor="userPassword">Password : </label>
                <input
                    type="password"
                    value={formData.userPassword}
                    id="userPassword"
                    onChange={(e) => setFormData({ ...formData, userPassword: e.target.value })}
                />
                <br />
                <br />
                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}

export default LogIn
