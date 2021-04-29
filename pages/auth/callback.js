import Router, { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { Magic } from "magic-sdk"
import { OAuthExtension } from "@magic-ext/oauth"
import DisappearedLoading from "react-loadingg/lib/DisappearedLoading"

export default function Callback() {
    const [magic, setMagic] = useState(null)
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
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

    async function finishEmailRedirectLogin() {
        if (router.query.magic_credential) {
            try {
                const didToken = await magic.auth.loginWithCredential()
                setIsLoading(true)
                await authenticateWithServer(didToken)
            } catch (error) {
                console.log(error)
                setErrorMsg("Error logging in. Please try again.")
            }
        }
    }

    async function authenticateWithServer(didToken) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${didToken}`,
            },
        })
        res.status === 200 && Router.push("/")
    }

    if (errorMsg) return <div className="text-red-500">{errorMsg}</div>
    else return <DisappearedLoading />
}
