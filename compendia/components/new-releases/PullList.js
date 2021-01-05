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
        <div className="">
            {status === "loading" ? (
                <div>Loading ...</div>
            ) : status === "error" ? (
                <div>Error: {error.message}</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-y-6 sm:gap-8 ">
                    {data ? (
                        data.map((comic, index) => (
                            <ComicCover key={comic._id} comic={comic} index={index} />
                        ))
                    ) : (
                        <p>Your Pull List is empty...</p>
                    )}
                </div>
            )}
        </div>
    )
}
