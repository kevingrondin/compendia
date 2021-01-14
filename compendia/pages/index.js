import { useEffect } from "react"
import { useRouter } from "next/router"

import { useUser } from "../hooks/magic"

export default function Home() {
    const router = useRouter()
    const user = useUser()

    useEffect(() => {
        router.prefetch("/releases")
        router.prefetch("/auth/login")

        user ? router.push("/releases") : router.push("/auth/login")
    }, [])

    return <></>
}
