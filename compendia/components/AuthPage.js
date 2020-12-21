import AuthHeader from "./AuthHeader"
import Head from "next/head"

export default function AuthPage({ title, children }) {
    return (
        <>
            <Head>
                <title>Compendia - {title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="border border-solid border-gray-500 w-screen h-screen bg-gradient-to-r from-blue-primary-200 to bg-blue-primary-50">
                <div className="flex flex-col">
                    <AuthHeader />
                    <div className="bg-white flex flex-col justify-center items-center content-center h-auto rounded-t">
                        <h1 className="p-8 bg-blue-primary-200">{title}</h1>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
