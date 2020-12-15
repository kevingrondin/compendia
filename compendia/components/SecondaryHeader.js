import { useRouter } from "next/router"

export default function SecondaryHeader(props) {
    const router = useRouter()
    return (
        <header className="flex justify-between w-full p-2 bg-gradient-to-r from-blue-primary-200 to bg-blue-primary-50 shadow-sm">
            <img
                src="/arrowLeft.svg"
                className="w-12"
                alt="Go back"
                onClick={() => router.back()}
            />
            <h1 className="relative text-center self-center w-full text-lg">{props.pageTitle}</h1>
        </header>
    )
}
