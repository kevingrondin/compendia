import Releases from "./releases"
import Login from "./auth/login"
import { useUser } from "../hooks/magic"

export default function Home() {
    const user = useUser()

    return <>{user ? <Releases /> : <Login />}</>
}
