import { useQuery } from "react-query"
import ComicCover from "../ComicCover"
import axios from "axios"
import { format } from "date-fns"

function usePullList(comicDay) {
    return useQuery(
        ["pull-list", format(comicDay, "MM-dd-yyyy")],
        async () => {
            const { data } = await axios.get(
                `/api/pull-list?comicDay=${format(comicDay, "MM-dd-yyyy")}`
            )
            return data
        },
        { staleTime: 600000 }
    )
}

export default function PullList({ comicDay }) {
    const { status, error, data } = usePullList(comicDay)

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
