import { useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useUser } from "../hooks/magic"

export default function Header() {
    const router = useRouter()
    const user = useUser()

    useEffect(() => {
        router.prefetch("/settings")
    })

    return (
        <header className="flex justify-between w-full p-2 bg-gradient-to-r from-blue-primary-200 to bg-blue-primary-50 shadow-sm">
            <img src="/CompendiaLogo.svg" alt="Compendia Logo" className="w-12" />
            {user && (
                <Link href="/settings">
                    <img src="/Settings.svg" alt="Settings" className="w-8 cursor-pointer" />
                </Link>
            )}
        </header>
    )
}