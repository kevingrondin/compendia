import { useState } from "react"
import PrimaryPage from "../components/PrimaryPage"
import ReleaseTabs from "../components/new-releases/ReleaseTabs"
import AllReleases from "../components/new-releases/AllReleases"
import PullList from "../components/new-releases/PullList"
import ReleasesHeading from "../components/new-releases/ReleasesHeading"
import ReleaseWeekSelector from "../components/new-releases/ReleaseWeekSelector"

export default function Releases() {
    const [activeTab, setActiveTab] = useState("pull list")

    return (
        <PrimaryPage title="Compendia - Releases">
            <ReleasesHeading />
            <menu className="flex flex-nowrap justify-between items-center p-0">
                <ReleaseTabs setActiveTab={setActiveTab} activeTab={activeTab} />
                <ReleaseWeekSelector />
            </menu>
            <section className="pt-5">
                {activeTab === "pull list" ? <PullList /> : <AllReleases />}
            </section>
        </PrimaryPage>
    )
}
