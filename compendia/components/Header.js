import { useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import { useUser } from "../hooks/magic"

import SettingsIcon from "./utils/icons/Settings"

export default function Header() {
    const router = useRouter()
    const user = useUser()

    useEffect(() => {
        router.prefetch("/settings")
    })

    return (
        <header className="flex justify-between items-center w-full p-2 bg-gradient-to-r from-blue-primary-200 to bg-blue-primary-50 shadow-sm">
            <img src="/CompendiaLogo.svg" alt="Compendia Logo" className="w-12" />
            {user && (
                <Link href="/settings" passHref>
                    <a>
                        <SettingsIcon />
                    </a>
                </Link>
            )}
        </header>
    )
}
