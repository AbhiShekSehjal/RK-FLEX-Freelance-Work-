import { useState } from "react"
import { userAuthStore } from "../store/useAuthUser.js";

function SignUp() {

    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPassword: ""
    });

    const { signUp } = userAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormData(formData);

        signUp(formData);

        // console.log(formData);
        setFormData({
            userName: "",
            userEmail: "",
            userPassword: ""
        });

    }

    return (
        <div>
            <h1>SignIn Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Name : </label>
                <input
                    type="text"
                    value={formData.userName}
                    id="userName"
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                />
                <br />
                <br />
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

export default SignUp
