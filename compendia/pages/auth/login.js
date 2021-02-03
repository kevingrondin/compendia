import Head from "next/head"
import Router from "next/router"
import { useState, useEffect } from "react"
import { OAuthExtension } from "@magic-ext/oauth"
import { Magic } from "magic-sdk"
import { useUser } from "@hooks/magic"
import { validateEmail } from "@util/validateEmail"
import { Button } from "@components/common/buttons/Button"

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

    // TODO move these functions outside of the component and pass in whatever they need

    async function handleLoginWithEmail(email) {
        try {
            setDisabled(true)
            let didToken = await magic.auth.loginWithMagicLink({
                email,
                redirectURI: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/callback`,
            })
            await authenticateWithServer(didToken)
        } catch (error) {
            setDisabled(false)
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
        <>
            <Head>
                <title>Compendia - Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="border border-solid border-gray-500 w-screen h-screen bg-gradient-to-r from-blue-primary-200 to bg-blue-primary-50">
                <div className="flex flex-col h-full">
                    <div className="flex justify-center h-1/5">
                        <img src="/CompendiaLogo.svg" />
                    </div>
                    <div className="bg-white flex flex-col justify-center items-center content-center h-2/3 rounded-tl-4xl">
                        <h1 className="p-10 text-blue-primary-100 text-5xl font-bold">
                            Welcome to Compendia!
                        </h1>

                        <div className="p-2">
                            <form className="flex flex-col">
                                <label className="p-5">
                                    <input
                                        className="rounded-full"
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
                                    Login / Sign Up
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
