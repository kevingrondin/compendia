import PrimaryHeader from "./PrimaryHeader"
import Head from "next/head"

export default function PrimaryPage(props) {
    return (
        <>
            <PrimaryHeader />
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-11/12 my-0 mx-auto pb-20">{props.children}</div>
        </>
    )
}
