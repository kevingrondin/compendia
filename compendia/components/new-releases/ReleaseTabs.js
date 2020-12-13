import AllReleasesIcon from "../utils/AllReleasesIcon"
import PullListIcon from "../utils/PullListIcon"

export default function ReleaseTabs({ activeTab, setActiveTab }) {
    return (
        <div className="mt-4 bg-gray-200 text-xl font-bold text-gray-500 leading-none rounded-full inline-flex">
            <button
                className={`inline-flex items-center outline-none rounded-l-full px-4 py-2  ${
                    activeTab === "pull list" && "bg-blue-primary-200 text-white"
                }`}
                onClick={() => setActiveTab("pull list")}
            >
                <PullListIcon isActive={activeTab === "pull list"} />
                <span>Pull List</span>
            </button>
            <button
                className={`inline-flex items-center outline-none rounded-r-full px-4 py-2  ${
                    activeTab === "all releases" && "bg-blue-primary-200 text-white"
                }`}
                onClick={() => setActiveTab("all releases")}
            >
                <AllReleasesIcon isActive={activeTab === "all releases"} />
                <span>All Releases</span>
            </button>
        </div>
    )
}
