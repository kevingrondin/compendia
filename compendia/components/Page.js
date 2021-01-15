import Head from "next/head"

import PropTypes from "prop-types"

import Header from "./Header"

const Page = ({ title, children }) => (
    <>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className="p-8 overflow-x-hidden">{children}</div>
    </>
)

export default Page

Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}
