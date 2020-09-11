import axios from "axios";
import { useState } from "react";
import styles from "../styles/SignUp.module.scss";
import Link from "next/link";

export default function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

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
                email: email,
                password: password,
                passwordConfirm: passwordConfirm,
            });
            props.setAuthToken(res.data.token);
        } catch (e) {
            //TODO handle error
            console.log(e);
        }
    };

    return (
        <div className={styles.signUpContainer}>
            <h1>Sign Up</h1>
            <form className={styles.signUpForm}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>

                <div>
                    <label htmlFor="passwordConfirm">Password (again):</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                    />
                </div>

                <button onClick={handleSignUp}>Sign Up</button>

                <div>
                    <p>Already have an account?</p>
                    <Link href="/Login">
                        <a>Login!</a>
                    </Link>
                </div>
            </form>
        </div>
    );
}
