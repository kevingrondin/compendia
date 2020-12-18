import { useState } from "react"
import Page from "../components/Page"
import ReleaseTabs from "../components/new-releases/ReleaseTabs"
import AllReleases from "../components/new-releases/AllReleases"
import PullList from "../components/new-releases/PullList"
import ReleasesHeading from "../components/new-releases/ReleasesHeading"
import ReleaseDaySelector from "../components/new-releases/ReleaseDaySelector"
import useComicDay from "../hooks/useComicDay"

export default function Releases() {
    const [activeTab, setActiveTab] = useState("pull list")
    const [comicDay, setComicDay] = useState(useComicDay("current", new Date()))

    return (
        <Page title="Compendia - Releases">
            <ReleasesHeading comicDay={comicDay} />
            <menu className="flex flex-wrap-reverse justify-center items-center p-0 sm:flex-nowrap md:justify-start">
                <ReleaseTabs setActiveTab={setActiveTab} activeTab={activeTab} />
                <ReleaseDaySelector
                    getNextComicDay={() => setComicDay(useComicDay("next", comicDay))}
                    getPrevComicDay={() => setComicDay(useComicDay("prev", comicDay))}
                    comicDay={comicDay}
                />
            </menu>
            {activeTab === "pull list" ? (
                <PullList comicDay={comicDay} />
            ) : (
                <AllReleases comicDay={comicDay} />
            )}
        </Page>
    )
}
