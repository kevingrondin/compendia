/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as formStyles from "../../styles/Form.js"
import AuthPage from "../../components/AuthPage"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Button from "../../components/utils/Button.js"
// import { useContext, useState } from "react";
// import { MagicContext, LoggedInContext, LoadingContext } from "./Store";
// import Router from "next/router";
// import Link from "next/link";

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        router.prefetch("/auth/sign-up")
    })

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.post("/api/login", { email: email, password: password })
            if (res.data.token) {
                console.log("Got the token: " + res.data.token)
                signIn(res.data.token, res.data.username, res.data.email)
            }
        } catch (e) {
            //TODO handle error
            console.log(e)
        }
    }

    return (
        <AuthPage title="Login">
            <form className="flex flex-col items-center justify-center">
                <div className="relative mb-7">
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

                <div className="relative mb-7">
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
                    <a
                        className="inline-block mt-6 mr-0 mb-1 ml-4 text-gray-400 underline hover:text-black"
                        onClick={/*TODO*/ () => router.push("/")}
                    >
                        Forgot Password?
                    </a>
                </div>

                <Button isFullWidth={true} onClick={handleLogin}>
                    Login
                </Button>

                <div className="flex flex-col justify-center p-8">
                    <p className="block mb-2">Don't have an account?</p>
                    <a
                        onClick={() => router.push("/auth/sign-up", "/signup")}
                        className="text-blue-primary-200 underline text-xl text-center cursor-pointer hover:bg-blue-primary-300"
                    >
                        Sign Up!
                    </a>
                </div>
            </form>
        </AuthPage>
    )
}
