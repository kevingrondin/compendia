import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Global, css } from "@emotion/core";

export const UserContext = React.createContext({
    token: "",
    username: "",
    email: "",
    signIn: "",
    signOut: "",
});

const globalStyles = css`
    html,
    body {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
`;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [authToken, setAuthToken] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setAuthToken(localStorage.getItem("authToken"));
        setUsername(localStorage.getItem("username"));
        setEmail(localStorage.getItem("email"));
        if (authToken) router.prefetch("/");
        else router.prefetch("/login");
    });

    const authorizeUser = (token, username, email) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        setAuthToken(token);
        router.push("/");
    };

    const clearAuthorizedUser = () => {
        localStorage.setItem("authToken", "");
        localStorage.setItem("username", "");
        localStorage.setItem("email", "");
        setAuthToken("");
        router.push("/auth/login", "/login");
    };

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
            <Global styles={globalStyles} />
            <Component {...pageProps} />
        </UserContext.Provider>
    );
}

export default App;
