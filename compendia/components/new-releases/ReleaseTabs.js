export default function ReleaseTabs({ activeTab, setActiveTab }) {
    return (
        <div className="flex justify-evenly border-b-1 border-b-black border-b-solid pt-4">
            <h3
                className={`bg-white p-3 hover:text-blue-500 active:text-blue-500 ${
                    activeTab === "pull list" && "bg-yellow-200"
                }`}
                onClick={() => setActiveTab("pull list")}
            >
                My Pull List
            </h3>
            <h3
                className={`bg-white p-3 hover:text-blue-500 active:text-blue-500 ${
                    activeTab === "all releases" && "bg-yellow-200"
                }`}
                onClick={() => setActiveTab("all releases")}
            >
                All Releases
            </h3>
        </div>
    )
}
