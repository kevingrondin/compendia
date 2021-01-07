import { useState, useEffect } from "react"
import { Magic } from "magic-sdk"
import { OAuthExtension } from "@magic-ext/oauth"
import Router, { useRouter } from "next/router"

export default function Callback() {
    const [magic, setMagic] = useState(null)
    const [errorMsg, setErrorMsg] = useState("")
    const [showValidatingToken, setShowValidatingToken] = useState(false)
    const router = useRouter()

    useEffect(() => {
        !magic &&
            setMagic(
                new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
                    extensions: [new OAuthExtension()],
                })
            )
        magic && finishEmailRedirectLogin()
    }, [magic, router.query])

    const finishEmailRedirectLogin = async () => {
        if (router.query.magic_credential) {
            try {
                let didToken = await magic.auth.loginWithCredential()
                setShowValidatingToken(true)
                await authenticateWithServer(didToken)
            } catch (error) {
                console.log(error)
                setErrorMsg("Error logging in. Please try again.")
            }
        }
    }

    const authenticateWithServer = async (didToken) => {
        let res = await fetch("/api/auth/login", {
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
            {errorMsg ? (
                <div className="text-red-500">{errorMsg}</div>
            ) : (
                <div className="w-full text-center">
                    <div className="my-4 mx-0">Retrieving auth token...</div>
                    {showValidatingToken && <div className="my-4 mx-0">Validating token...</div>}
                </div>
            )}
        </>
    )
}
