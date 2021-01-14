import Head from "next/head"

import PropTypes from "prop-types"

import Header from "./Header"

const Page = ({ title, children }) => (
    <>
        <Header />
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-11/12 my-0 mx-auto py-10">{children}</div>
    </>
)

export default Page

Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}
