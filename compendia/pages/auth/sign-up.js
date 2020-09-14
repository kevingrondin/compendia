import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthPage from "../../components/AuthPage";
import { UserContext } from "../_app";
import styles from "../../styles/components/auth/auth-page/AuthPage.module.scss";

export default function SignUp() {
    const router = useRouter();
    const { signIn } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    useEffect(() => {
        router.prefetch("/login");
    });

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
                signIn(res.data.token, res.data.username, res.data.email);
            }
        } catch (e) {
            //TODO handle error
            console.log(e);
        }
    };

    return (
        <AuthPage pageTitle="Sign Up">
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
                        onClick={() => router.push("/auth/login", "/login")}
                        className={styles.authSecondaryLink}
                    >
                        Login!
                    </a>
                </div>
            </form>
        </AuthPage>
    );
}
