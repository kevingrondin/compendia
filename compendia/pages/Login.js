import axios from "axios";
import { useState } from "react";
import styles from "../styles/Login.module.scss";
import Link from "next/link";
import LoginHeader from "../components/LoginHeader";

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
        <div className={styles.loginBackground}>
            <div className={styles.loginLayout}>
                <LoginHeader />
                <div className={styles.loginContainer}>
                    <h1 className={styles.loginHeading}>Login</h1>

                    <form className={styles.loginForm}>
                        <div class="group">
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Email</label>
                        </div>

                        <div class="group">
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Password</label>
                        </div>
                    </form>

                    {/* <form>
                        <div>
                            <label htmlFor="email" className={styles.loginInputLabel}>
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={styles.loginInputField}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className={styles.loginInputLabel}>
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={styles.loginInputField}
                            />
                            <br />
                            <button>Forgot Password</button>
                        </div>

                        <button onClick={handleLogin}>Login</button>

                        <div>
                            <p>Don't have an account?</p>
                            <Link href="/SignUp">
                                <a>Sign Up!</a>
                            </Link>
                        </div>
                    </form> */}
                </div>
            </div>
        </div>
    );
}
