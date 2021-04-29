import PropTypes from "prop-types"
import { AllReleasesIcon } from "@icons/AllReleases"
import { PullListIcon } from "@icons/PullList"

function Tab({ icon, title, side, isActive, onClick }) {
    return (
        <button
            className={`inline-flex items-center outline-none px-4 py-2
            ${isActive ? "bg-blue-primary-200 text-white" : ""}
            ${side === "left" ? "rounded-l-full" : "rounded-r-full"}`}
            onClick={onClick}
        >
            {icon}
            <span>{title}</span>
        </button>
    )
}
Tab.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

export function ReleasesTypeTabs({ activeTab, onTabClick }) {
    return (
        <div className="bg-gray-200 text-xl text-gray-500 leading-none rounded-full inline-flex">
            <Tab
                icon={
                    <AllReleasesIcon
                        color={activeTab === "all releases" ? "text-white" : "text-gray-500"}
                        width="w-6"
                        height="h-6"
                        className="mr-2"
                    />
                }
                title="All Releases"
                side="left"
                isActive={activeTab === "all releases"}
                onClick={() => onTabClick("all releases")}
            />
            <Tab
                icon={
                    <PullListIcon
                        color={activeTab === "pull list" ? "text-white" : "text-gray-500"}
                        width="w-6"
                        height="h-6"
                        className="mr-2"
                    />
                }
                title="Pull List"
                side="right"
                isActive={activeTab === "pull list"}
                onClick={() => onTabClick("pull list")}
            />
        </div>
    )
}
ReleasesTypeTabs.propTypes = {
    activeTab: PropTypes.oneOf(["all releases", "pull list"]).isRequired,
    onTabClick: PropTypes.func.isRequired,
}
