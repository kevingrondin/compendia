import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../_app";
import styles from "../../styles/components/auth/auth-page/AuthPage.module.scss";
import AuthPage from "../../components/AuthPage";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    const { signIn } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        router.prefetch("/sign-up");
    });

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
                signIn(res.data.token, res.data.username, res.data.email);
            }
        } catch (e) {
            //TODO handle error
            console.log(e);
        }
    };

    return (
        <AuthPage pageTitle="Login">
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
                    <a className={styles.forgotPassword} onClick={/*TODO*/ () => router.push("/")}>
                        Forgot Password?
                    </a>
                </div>

                <button className={styles.authPrimaryButton} onClick={handleLogin}>
                    Login
                </button>

                <div className={styles.authSecondary}>
                    <p className={styles.authSecondaryPrompt}>Don't have an account?</p>
                    <a
                        onClick={() => router.push("/auth/sign-up", "/signup")}
                        className={styles.authSecondaryLink}
                    >
                        Sign Up!
                    </a>
                </div>
            </form>
        </AuthPage>
    );
}
