import axios from "axios";
import { apiURL } from "../util/api";
import login from "./api/login";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(e.target.value);
    };

    const handleLogin = (event) => {
        e.preventDefault;
        axios.post("/api/login", { email: email, password: password });
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
