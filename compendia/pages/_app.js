import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import "tailwindcss/tailwind.css"

export const UserContext = React.createContext({
    token: "",
    username: "",
    email: "",
    signIn: "",
    signOut: "",
})

function App({ Component, pageProps }) {
    const router = useRouter()
    const [authToken, setAuthToken] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        setAuthToken(localStorage.getItem("authToken"))
        setUsername(localStorage.getItem("username"))
        setEmail(localStorage.getItem("email"))
        if (authToken) router.prefetch("/")
        else router.prefetch("/login")
    })

    const authorizeUser = (token, username, email) => {
        localStorage.setItem("authToken", token)
        localStorage.setItem("username", username)
        localStorage.setItem("email", email)
        setAuthToken(token)
        router.push("/")
    }

    const clearAuthorizedUser = () => {
        localStorage.setItem("authToken", "")
        localStorage.setItem("username", "")
        localStorage.setItem("email", "")
        setAuthToken("")
        router.push("/auth/login", "/login")
    }

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
            <Component {...pageProps} />
        </UserContext.Provider>
    )
}

export default App
