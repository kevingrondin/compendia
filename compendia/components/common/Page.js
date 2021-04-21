import Head from "next/head"
import PropTypes from "prop-types"
import { Header } from "@components/app/Header"
import { BottomNav } from "@components/app/BottomNav"

export function Page({ title, children, paddingX = "", paddingY = "", disableScroll = false }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`flex flex-col justify-start h-screen`}>
                <Header />
                <div
                    className={`flex flex-col flex-grow p-6 mb-16 sm:mb-0 overflow-x-hidden 
                    ${paddingX} ${paddingY} ${disableScroll ? "overflow-y-hidden" : ""}`}
                >
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
    paddingX: PropTypes.string,
    paddingY: PropTypes.string,
    disableScroll: PropTypes.bool,
}
