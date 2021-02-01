import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useUser } from "@hooks/magic"
import { SettingsIcon } from "@icons/Settings"

export function Header() {
    const router = useRouter()
    const user = useUser()

    useEffect(() => {
        router.prefetch("/settings")
    })

    return (
        <header className="flex flex-initial justify-between items-center w-full h-full p-2 bg-gradient-to-r from-blue-primary-200 to bg-blue-primary-50 shadow-sm border-b-2 border-blue-primary-300">
            <Link href="/" passHref>
                <a>
                    <img src="/CompendiaLogo.svg" alt="Compendia Logo" className="w-12" />
                </a>
            </Link>

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
