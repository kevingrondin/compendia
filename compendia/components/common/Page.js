import Head from "next/head"
import PropTypes from "prop-types"
import { Header } from "@components/app/Header"

export function Page({ title, children }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col justify-start h-screen">
                <Header />
                <div className="p-6 overflow-x-hidden flex-grow flex flex-col">{children}</div>
            </div>
        </>
    )
}
Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}
