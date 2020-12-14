import { useQuery } from "react-query"
import ComicCover from "../ComicCover"
import axios from "axios"

function usePullList() {
    return useQuery("pull-list", async () => {
        const { data } = await axios.get("/api/pull-list")
        return data
    })
}

export default function PullList() {
    const { status, error, data } = usePullList()

    return (
        <>
            <div className="flex flex-row flex-wrap mt-10">
                {status === "loading" ? (
                    <div>Loading ...</div>
                ) : status === "error" ? (
                    <div>Error: {error.message}</div>
                ) : (
                    data.map((comic, index) => (
                        <ComicCover key={comic.id} comic={comic} index={index} />
                    ))
                )}
            </div>
        </>
    )
}
