import { useState, useEffect } from "react"
import Router from "next/router"
import { Magic } from "magic-sdk"
import { OAuthExtension } from "@magic-ext/oauth"
import { useUser } from "../../hooks/magic"
import { validateEmail } from "../../util/validateEmail"
import AuthPage from "../../components/AuthPage"
import Button from "../../components/utils/Button"

export default function Login() {
    useUser({ redirectTo: "/", redirectIfFound: true })
    const [magic, setMagic] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [email, setEmail] = useState("")

    useEffect(() => {
        !magic &&
            setMagic(
                new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
                    extensions: [new OAuthExtension()],
                })
            )
        magic?.preload()
    }, [magic])

    async function handleLoginWithEmail(email) {
        try {
            setDisabled(true) // disable login button to prevent multiple emails from being triggered
            let didToken = await magic.auth.loginWithMagicLink({
                email,
                redirectURI: `${process.env.NEXT_PUBLIC_SERVER_URL}/callback`,
            })
            authenticateWithServer(didToken)
        } catch (error) {
            setDisabled(false) // re-enable login button - user may have requested to edit their email
            console.log(error)
        }
    }

    async function authenticateWithServer(didToken) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + didToken,
            },
        })
        res.status === 200 && Router.push("/")
    }

    return (
        <AuthPage title="Login">
            <div className="p-2">
                <form>
                    <label className="p-5">
                        <input
                            className=""
                            type="email"
                            value={email}
                            required
                            placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </label>
                    <Button
                        type="submit"
                        disabled={disabled}
                        onClick={(e) => {
                            e.preventDefault()
                            email && validateEmail(email) && handleLoginWithEmail(email)
                        }}
                    >
                        Send Magic Link
                    </Button>
                </form>
            </div>
        </AuthPage>
    )
}
