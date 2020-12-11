import { useState } from "react"
import PrimaryPage from "../components/PrimaryPage"
import Head from "next/head"
import ComicWeekSelector from "../components/new-releases/ComicWeekSelector.js"
import ReleaseTabs from "../components/new-releases/ReleaseTabs"
import AllReleases from "../components/new-releases/PullList"
import PullList from "../components/new-releases/AllReleases"

export default function Releases() {
    const [activeTab, setActiveTab] = useState("pull list")

    return (
        <PrimaryPage>
            <Head>
                <title>Compendia</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ComicWeekSelector />
            <ReleaseTabs setActiveTab={setActiveTab} activeTab={activeTab} />
            <section className="pt-5">
                <AllReleases activeTab={activeTab} />
                <PullList activeTab={activeTab} />
            </section>
        </PrimaryPage>
    )
}
