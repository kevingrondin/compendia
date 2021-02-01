import { useEffect } from "react"
import { useRouter } from "next/router"
import { useUser } from "@hooks/magic"

export default function Settings() {
    const router = useRouter()
    const user = useUser({ redirectTo: "/auth/login" })

    useEffect(() => {
        router.prefetch("/")
    })

    return (
        <div className="flex flex-col items-center p-8">
            <h2>Account</h2>
            <div className="p-2">
                <p className="text-left list-none">Email: {user && user.email}</p>

                <div className="flex flex-col justify-center items-center">
                    <a className="w-32" href="/api/auth/logout">
                        Log Out
                    </a>
                </div>
            </div>
        </div>
    )
}
