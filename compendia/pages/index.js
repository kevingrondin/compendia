import Store from "../components/auth/Store"
import Releases from "./releases"

export default function Home() {
    return (
        <Store>
            <Releases />
        </Store>
    )
}
