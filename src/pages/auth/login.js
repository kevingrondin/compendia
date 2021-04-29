import Head from "next/head"
import Image from "next/image"
import { useUser } from "@hooks/magic"
import { LoginFields } from "@components/pages/auth/LoginFields"

function Logo() {
    return (
        <div className="m-6 mt-10 w-32 h-32 relative">
            <Image
                src="/CompendiaLogo.svg"
                alt="Compendia Logo"
                layout="fill"
                objectFit="contain"
            />
        </div>
    )
}

function LoginHeading() {
    return (
        <div className="px-10">
            <h1 className="pb-2 text-blue-primary-100 text-4xl text-center font-bold">
                Welcome to Compendia
            </h1>
        </div>
    )
}

function LoginArea() {
    return (
        <div className="bg-white flex flex-col pb-32 sm:pb-0 items-center content-center max-w-3xl rounded-md rounded-tl-4xl">
            <Logo />
            <div className="my-10 flex flex-col items-center">
                <LoginHeading />
                <LoginFields />
            </div>
        </div>
    )
}

export default function Login() {
    useUser({ redirectTo: "/", redirectIfFound: true })

    return (
        <>
            <Head>
                <title>Compendia - Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="border border-solid border-gray-500 w-screen h-screen bg-gradient-to-r from-blue-primary-200 to bg-blue-primary-50">
                <div className="flex flex-col justify-end sm:justify-center items-center h-full">
                    <LoginArea />
                </div>
            </div>
        </>
    )
}
