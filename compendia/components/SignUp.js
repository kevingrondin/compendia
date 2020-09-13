import axios from "axios";
import { useState } from "react";
import styles from "../styles/SignUp.module.scss";
import { authTypes } from "../util/auth";

export default function SignUp(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("/api/signUp", {
                username: username,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm,
            });
            if (res.data.token) {
                props.authorizeUser(res.data.token, res.data.username, res.data.email);
            }
        } catch (e) {
            //TODO handle error
            console.log(e);
        }
    };

    return (
        <>
            <h1 className={styles.authHeading}>Sign Up</h1>

            <form className={styles.authForm}>
                <div className={styles.group}>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        className={styles.input}
                        required
                    />
                    <span className={styles.highlighter}></span>
                    <span className={styles.bar}></span>
                    <label className={styles.label}>Username</label>
                </div>

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
                </div>

                <div className={styles.group}>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                        className={styles.input}
                        required
                    />
                    <span className={styles.highlight}></span>
                    <span className={styles.bar}></span>
                    <label className={styles.label}>Password (again)</label>
                </div>

                <button className={styles.authPrimaryButton} onClick={handleSignUp}>
                    Sign Up
                </button>

                <div className={styles.authSecondary}>
                    <p className={styles.authSecondaryPrompt}>Already have an account?</p>
                    <a
                        onClick={() => props.setAuthType(authTypes.LOGIN)}
                        className={styles.authSecondaryLink}
                    >
                        Login!
                    </a>
                </div>
            </form>
        </>
    );
}
