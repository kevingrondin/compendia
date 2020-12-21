/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as formStyles from "../../styles/Form.js"
import AuthPage from "../../components/AuthPage"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Button from "../../components/utils/Button.js"
import { MagicContext, LoggedInContext, LoadingContext } from "./Store"
import Router from "next/router"
import Link from "next/link"

export default function Login() {
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext)
    const [isLoading, setIsLoading] = useContext(LoadingContext)
    const [email, setEmail] = useState("")
    const [magic] = useContext(MagicContext)
    const [errorMsg, setErrorMsg] = useState("")
    const [disableLogin, setDisableLogin] = useState(false)

    // useEffect(() => {
    //     router.prefetch("/auth/sign-up")
    // })

    const authenticateWithDb = async (DIDT) => {
        /* Pass the Decentralized ID token in the Authorization header to the database */
        let res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, {
            method: "POST",
            headers: new Headers({
                Authorization: "Bearer " + DIDT,
            }),
        })

        let data = await res.json()

        /* If the user is authorized, return an object containing the user properties (issuer, publicAddress, email) */
        /* Else, the login was not successful and return false */
        return data.authorized ? data.user : false
    }

    const handleLogin = async () => {
        try {
            /* disable the login button to prevent users from clicking it multiple times, triggering mutliple emails */
            setDisableLogin(true)

            /* Get DID Token returned from when the email link is clicked */
            const DIDT = await magic.auth.loginWithMagicLink({ email })

            /* `user` will be the user object returned from the db, or `false` if the login failed */
            let user = await authenticateWithDb(DIDT)

            if (user) {
                setLoggedIn(user.email)
                Router.push("/")
            }
        } catch (err) {
            /* If the user clicked "cancel", allow them to click the login again */
            setDisableLogin(false)

            /* Handle error (which can occur if the user clicks `Cancel` on the modal after submitting their email) */
            console.log(`Error logging in with Magic, ${err}`)
        }
    }

    return (
        <>
            {isLoading ? ( // if fetching data, show a loading symbol
                <img
                    className="loading-gif"
                    src="/loading.gif"
                    alt="loading..."
                    height="35px"
                    alt="Loading..."
                />
            ) : loggedIn ? ( // If the user is logged in, show a link to the home page
                <>
                    You're already logged in! Click <Link href="/">here</Link> to view your Todos.
                </>
            ) : (
                <AuthPage title="Login">
                    <form className="flex flex-col items-center justify-center">
                        <div className="relative mb-7">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setErrorMsg("") // remove error msg
                                    setEmail(e.target.value)
                                }}
                                css={formStyles.input}
                                required
                            />
                            <span css={formStyles.highlight}></span>
                            <span css={formStyles.bar}></span>
                            <label css={formStyles.label}>Email</label>
                        </div>

                        <div className="relative mb-7">
                            <div>{errorMsg}</div>

                            <Button
                                isFullWidth={true}
                                disabled={disableLogin}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (!email) return setErrorMsg("Email cannot be empty.")
                                    handleLogin()
                                }}
                            >
                                Login
                            </Button>
                        </div>

                        <div className="flex flex-col justify-center p-8">
                            <p className="block mb-2">Don't have an account?</p>
                            <a
                                onClick={() => router.push("/auth/sign-up", "/signup")}
                                className="text-blue-primary-100 underline text-xl text-center cursor-pointer hover:text-blue-primary-200"
                            >
                                Sign Up!
                            </a>
                        </div>
                    </form>
                </AuthPage>
            )}
        </>
    )
}
