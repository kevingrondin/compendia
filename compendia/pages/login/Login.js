import axios from "axios";
import { apiURL } from "../../util/api";
import login from "../api/login";
import { useState } from "react";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("/api/login", { email: email, password: password });
            props.setAuthToken(res.data.token);
        } catch (e) {
            //TODO handle error
            console.log(e);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button onClick={handleLogin}>Login</button>
            </form>
        </>
    );
}
