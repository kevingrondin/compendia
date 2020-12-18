import Header from "./Header"
import Head from "next/head"

export default function Page(props) {
    return (
        <>
            <Header />
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-11/12 my-0 mx-auto py-10">{props.children}</div>
        </>
    )
}
