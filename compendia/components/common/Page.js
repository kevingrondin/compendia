import Head from "next/head"
import PropTypes from "prop-types"
import { Header } from "@components/app/Header"
import { BottomNav } from "@components/app/BottomNav"

export function Page({ title, children }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col justify-start h-screen">
                <Header />
                <div className="p-6 mb-16 sm:mb-0 overflow-x-hidden flex-grow flex flex-col">
                    {children}
                </div>
                <BottomNav />
            </div>
        </>
    )
}
Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}
