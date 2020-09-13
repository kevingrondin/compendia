import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authTypes } from "../util/auth";
import AuthHeader from "../components/AuthHeader";
import Login from "../components/Login";

export const UserContext = React.createContext({
    token: "",
    username: "",
    email: "",
    signIn: "",
    signOut: "",
});

export default function Home() {
    const router = useRouter();
    const [authToken, setAuthToken] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [authType, setAuthType] = useState(authTypes.LOGIN);

    useEffect(() => {
        setAuthToken(localStorage.getItem("authToken"));
        setUsername(localStorage.getItem("username"));
        setEmail(localStorage.getItem("email"));
        router.prefetch("/releases");
    });

    const authorizeUser = (token, username, email) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        setAuthToken(token);
    };

    const clearAuthorizedUser = () => {
        localStorage.setItem("authToken", "");
        localStorage.setItem("username", "");
        localStorage.setItem("email", "");
        setAuthToken("");
    };

    if (authToken) router.push("/releases");

    return (
        <UserContext.Provider
            value={{
                token: authToken,
                username: username,
                email: email,
                signIn: authorizeUser,
                signOut: clearAuthorizedUser,
            }}
        >
            <Head>
                <title>Compendia - Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.authBackground}>
                <div className={styles.authLayout}>
                    <AuthHeader />
                    <div className={styles.authContainer}>
                        {authType === authTypes.LOGIN && <Login setAuthType={setAuthType} />}

                        {authType === authTypes.SIGNUP && <SignUp setAuthType={setAuthType} />}

                        {authType === authTypes.FORGOT_PASS && (
                            <h1></h1>
                            //TODO Forgot Password
                        )}
                    </div>
                </div>
            </div>
        </UserContext.Provider>
    );
}
