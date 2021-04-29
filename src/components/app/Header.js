import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useUser } from "@hooks/magic"
import { SettingsIcon } from "@icons/Settings"
import { PullListIcon } from "@components/icons/PullList"
import { SearchIcon } from "@components/icons/Search"
import { CollectionIcon } from "@components/icons/Collection"
import { PageLink } from "@components/common/PageLink"

const icons = [
    {
        name: "Releases",
        img: <PullListIcon color="text-blue-primary-400" width="w-8" height="h-8" />,
        href: "/releases",
    },
    {
        name: "Search",
        img: <SearchIcon color="text-blue-primary-400" width="w-8" height="h-8" />,
        href: "/search",
    },
    {
        name: "Collection",
        img: <CollectionIcon color="text-blue-primary-400" width="w-8" height="h-8" />,
        href: "/collection",
    },
]

export function Header() {
    const router = useRouter()
    const user = useUser()

    useEffect(() => {
        router.prefetch("/settings")
    })

    return (
        <header className="flex justify-between items-center w-full max-h-20 p-2 bg-gradient-to-r from-blue-primary-200 to bg-blue-primary-50 shadow-sm border-b-2 border-blue-primary-300">
            <Link href="/" passHref>
                <a className="flex justify-center">
                    <Image
                        src="/CompendiaLogo.svg"
                        alt="Compendia Logo"
                        height={40}
                        width={40}
                        className="cursor-pointer"
                    />
                </a>
            </Link>
            <div className="flex">
                <nav className="hidden sm:flex justify-center items-center">
                    <ul className="flex justify-evenly items-center">
                        {icons.map((icon) => {
                            return (
                                <li
                                    key={icon.name}
                                    className="list-none py-2 px-7 text-blue-primary-400"
                                >
                                    <PageLink
                                        href={icon.href}
                                        linkText={icon.name}
                                        isDarkMode={true}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {user && (
                    <Link href="/settings" passHref>
                        <a>
                            <SettingsIcon />
                        </a>
                    </Link>
                )}
            </div>
        </header>
    )
}
