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
            <Header />
            <div className="p-8 overflow-x-hidden flex flex-col flex-auto h-full">{children}</div>
        </>
    )
}
Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}
