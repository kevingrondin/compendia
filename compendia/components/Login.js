import axios from "axios";
import { useState } from "react";
import styles from "../styles/Login.module.scss";
import { authTypes } from "../util/auth";

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
            if (res.data.token) {
                console.log("Got the token: " + res.data.token);
                props.authorizeUser(res.data.token, res.data.username, res.data.email);
            }
        } catch (e) {
            //TODO handle error
            console.log(e);
        }
    };

    return (
        <>
            <h1 className={styles.authHeading}>Login</h1>

            <form className={styles.authForm}>
                <div className={styles.group}>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={styles.input}
                        required
                    />
                    <span className={styles.highlighter}></span>
                    <span className={styles.bar}></span>
                    <label className={styles.label}>Email</label>
                </div>

                <div className={styles.group}>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={styles.input}
                        required
                    />
                    <span className={styles.highlight}></span>
                    <span className={styles.bar}></span>
                    <label className={styles.label}>Password</label>
                    <a
                        className={styles.forgotPassword}
                        onClick={() => props.setAuthType(authTypes.FORGOT_PASS)}
                    >
                        Forgot Password?
                    </a>
                </div>

                <button className={styles.authPrimaryButton} onClick={handleLogin}>
                    Login
                </button>

                <div className={styles.authSecondary}>
                    <p className={styles.authSecondaryPrompt}>Don't have an account?</p>
                    <a
                        onClick={() => props.setAuthType(authTypes.SIGNUP)}
                        className={styles.authSecondaryLink}
                    >
                        Sign Up!
                    </a>
                </div>
            </form>
        </>
    );
}
