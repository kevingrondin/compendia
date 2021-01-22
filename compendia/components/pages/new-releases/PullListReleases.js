import { useQuery } from "react-query"
import PropTypes from "prop-types"
import { format } from "date-fns"
import axios from "axios"

import ComicCover from "../comic/ComicCover"

function usePullList(comicDay) {
    return useQuery(
        ["pull-list", format(comicDay, "MM-dd-yyyy")],
        async () => {
            const { data } = await axios.get(
                `/api/collection/pull-list?comicDay=${format(comicDay, "MM-dd-yyyy")}`
            )
            return data
        },
        { staleTime: 600000 }
    )
}

export default function PullListReleases({ comicDay }) {
    const { isLoading, isError, error, data: comics } = usePullList(comicDay)

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else if (comics && comics.length > 0)
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-y-6 sm:gap-8 ">
                {comics.map((comic) => (
                    <ComicCover comicID={comic.id} title={`${comic.seriesName} ${comic.title}`} />
                ))}
            </div>
        )
    else return <p>Your Pull List is empty this week...</p>
}

PullListReleases.propTypes = {
    comicDay: PropTypes.instanceOf(Date).isRequired,
}
