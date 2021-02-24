import Link from "next/link"
import { PullListIcon } from "@components/icons/PullList"
import { SearchIcon } from "@components/icons/Search"
import { CollectionIcon } from "@components/icons/Collection"

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

export function BottomNav() {
    return (
        <nav className="sm:hidden flex justify-center items-center absolute bottom-0 w-full shadow-sm border-t-2 border-blue-primary-300 bg-gradient-to-r from-blue-primary-200 to-blue-primary-50">
            <ul className="flex justify-evenly items-center">
                {icons.map((icon) => {
                    return (
                        <li key={icon.name} className="list-none py-2 px-7 text-sm">
                            <Link href={icon.href} passHref>
                                <div className="flex flex-col justify-center items-center cursor-pointer">
                                    <a>{icon.img}</a>
                                    <span className="text-blue-primary-400">{icon.name}</span>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
