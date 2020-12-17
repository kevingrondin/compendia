import { useState } from "react"
import PrimaryPage from "../components/PrimaryPage"
import ReleaseTabs from "../components/new-releases/ReleaseTabs"
import AllReleases from "../components/new-releases/AllReleases"
import PullList from "../components/new-releases/PullList"
import ReleasesHeading from "../components/new-releases/ReleasesHeading"
import ReleaseWeekSelector from "../components/new-releases/ReleaseWeekSelector"
import useComicDay from "../hooks/useComicDay"

export default function Releases() {
    const [activeTab, setActiveTab] = useState("pull list")
    const [comicDay, setComicDay] = useState(useComicDay("current", new Date()))

    return (
        <PrimaryPage title="Compendia - Releases">
            <ReleasesHeading comicDay={comicDay} />
            <menu className="flex flex-nowrap justify-between lg:justify-start items-center p-0">
                <ReleaseTabs setActiveTab={setActiveTab} activeTab={activeTab} />
                <ReleaseWeekSelector
                    getNextComicDay={() => setComicDay(useComicDay("next", comicDay))}
                    getPrevComicDay={() => setComicDay(useComicDay("prev", comicDay))}
                    comicDay={comicDay}
                />
            </menu>
            <section className="pt-5">
                {activeTab === "pull list" ? (
                    <PullList comicDay={comicDay} />
                ) : (
                    <AllReleases comicDay={comicDay} />
                )}
            </section>
        </PrimaryPage>
    )
}
