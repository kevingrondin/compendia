import { useState } from "react"
import PrimaryPage from "../components/PrimaryPage"
import ComicWeekSelector from "../components/new-releases/ComicWeekSelector.js"
import ReleaseTabs from "../components/new-releases/ReleaseTabs"
import AllReleases from "../components/new-releases/AllReleases"
import PullList from "../components/new-releases/PullList"

export default function Releases() {
    const [activeTab, setActiveTab] = useState("pull list")

    return (
        <PrimaryPage title="Compendia - Releases">
            <ComicWeekSelector />
            <ReleaseTabs setActiveTab={setActiveTab} activeTab={activeTab} />
            <section className="pt-5">
                {activeTab === "pull list" ? <PullList /> : <AllReleases />}
            </section>
        </PrimaryPage>
    )
}
