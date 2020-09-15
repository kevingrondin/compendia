/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as styles from "../../styles/components/AuthPage.js";
import * as formStyles from "../../styles/Form.js";
import AuthPage from "../../components/AuthPage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../_app";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
    const router = useRouter();
    const { signIn } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        router.prefetch("/auth/sign-up");
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
            <form css={styles.authForm}>
                <div css={formStyles.group}>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        css={formStyles.input}
                        required
                    />
                    <span css={formStyles.highlight}></span>
                    <span css={formStyles.bar}></span>
                    <label css={formStyles.label}>Email</label>
                </div>

                <div css={formStyles.group}>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        css={formStyles.input}
                        required
                    />
                    <span css={formStyles.highlight}></span>
                    <span css={formStyles.bar}></span>
                    <label css={formStyles.label}>Password</label>
                    <a css={styles.forgotPassword} onClick={/*TODO*/ () => router.push("/")}>
                        Forgot Password?
                    </a>
                </div>

                <button css={styles.authPrimaryButton} onClick={handleLogin}>
                    Login
                </button>

                <div css={styles.authSecondary}>
                    <p css={styles.authSecondaryPrompt}>Don't have an account?</p>
                    <a
                        onClick={() => router.push("/auth/sign-up", "/signup")}
                        css={styles.authSecondaryLink}
                    >
                        Sign Up!
                    </a>
                </div>
            </form>
        </AuthPage>
    );
}
