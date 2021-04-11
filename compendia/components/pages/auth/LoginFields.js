import { Button } from "@components/common/buttons/Button"
import { validateEmail } from "@util/validateEmail"
import Router from "next/router"
import { useState, useEffect } from "react"
import { OAuthExtension } from "@magic-ext/oauth"
import { Magic } from "magic-sdk"
import PropTypes from "prop-types"

function EmailLabel({ email, setEmail }) {
    return (
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
    )
}
EmailLabel.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
}

function LoginSignUpButton({ email, disabled, setDisabled, handleLogin }) {
    return (
        <Button
            type="submit"
            disabled={disabled}
            onClick={(e) => {
                e.preventDefault()
                email && validateEmail(email) && handleLogin(email, setDisabled)
            }}
        >
            Login / Sign Up
        </Button>
    )
}
LoginSignUpButton.propTypes = {
    email: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    setDisabled: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
}

export function LoginFields() {
    const [magic, setMagic] = useState(null)
    const [email, setEmail] = useState("")
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        !magic &&
            setMagic(
                new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
                    extensions: [new OAuthExtension()],
                })
            )
        magic?.preload()
    }, [magic])

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

    async function handleLogin() {
        try {
            setDisabled(true)
            const didToken = await magic.auth.loginWithMagicLink({
                email,
                redirectURI: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/callback`,
            })
            await authenticateWithServer(didToken)
        } catch (error) {
            setDisabled(false)
            console.log(error)
        }
    }

    return (
        <div className="p-2">
            <form className="flex flex-col">
                <EmailLabel email={email} setEmail={setEmail} />
                <LoginSignUpButton
                    email={email}
                    disabled={disabled}
                    setDisabled={setDisabled}
                    handleLogin={handleLogin}
                />
            </form>
        </div>
    )
}
