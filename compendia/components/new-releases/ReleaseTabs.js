export default function ReleaseTabs({ activeTab, setActiveTab }) {
    return (
        <div className="flex pt-4">
            <button
                className={`bg-white px-3 m-2 hover:text-blue-500 active:text-blue-500 rounded-xl ${
                    activeTab === "pull list" && "bg-blue-primary"
                }`}
                onClick={() => setActiveTab("pull list")}
            >
                Pull List
            </button>
            <button
                className={`bg-white p-4 m-2 hover:text-blue-500 active:text-blue-500 rounded-xl ${
                    activeTab === "all releases" && "bg-yellow-200"
                }`}
                onClick={() => setActiveTab("all releases")}
            >
                All Releases
            </button>
        </div>
    )
}
