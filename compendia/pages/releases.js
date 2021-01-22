import { useState } from "react"

import useComicDay from "../hooks/useComicDay"

import Page from "../components/pages/Page"
import ReleasesTypeTabs from "../components/pages/new-releases/ReleasesTypeTabs"
import AllReleases from "../components/pages/new-releases/AllReleases"
import PullListReleases from "../components/pages/new-releases/PullListReleases"
import ReleasesHeading from "../components/pages/new-releases/ReleasesHeading"
import ReleaseDaySelector from "../components/pages/new-releases/ReleaseDaySelector"

export default function Releases() {
    const [activeTab, setActiveTab] = useState("pull list")
    const [comicDay, setComicDay] = useState(useComicDay("current", new Date()))

    return (
        <Page title="Compendia - Releases">
            <ReleasesHeading comicDay={comicDay} />

            <menu className="flex flex-wrap-reverse justify-center items-center p-0 sm:flex-nowrap md:justify-start">
                <ReleasesTypeTabs onTabClick={setActiveTab} activeTab={activeTab} />

                <ReleaseDaySelector
                    getNextComicDay={() => setComicDay(useComicDay("next", comicDay))}
                    getPrevComicDay={() => setComicDay(useComicDay("prev", comicDay))}
                    comicDay={comicDay}
                />
            </menu>

            {activeTab === "pull list" ? (
                <PullListReleases comicDay={comicDay} />
            ) : (
                <AllReleases comicDay={comicDay} />
            )}
        </Page>
    )
}
