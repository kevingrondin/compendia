export default function PullList({ activeTab }) {
    {
        if (activeTab === "pull list")
            return (
                <div className="flex-auto flex-row">
                    <p>PULL LIST!</p>
                </div>
            )
        else return null
    }
}
