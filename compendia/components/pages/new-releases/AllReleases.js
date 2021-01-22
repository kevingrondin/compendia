import PropTypes from "prop-types"
import { useQuery } from "react-query"
import { format } from "date-fns"
import axios from "axios"

import ComicCover from "../comic/ComicCover"
import Category from "../Category"

function useAllReleases(comicDay) {
    return useQuery(
        `all-releases-${format(comicDay, "yyyy-MM-dd")}`,
        async () => {
            const { data } = await axios.get(
                `/api/releases?comicDay=${format(comicDay, "yyyy-MM-dd")}`
            )
            return data
        },
        { staleTime: 600000 }
    )
}

export default function AllReleases({ comicDay }) {
    const { isLoading, isError, error, data: releasesByPublisher } = useAllReleases(comicDay)

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else if (releasesByPublisher && releasesByPublisher.length > 0)
        return (
            <ul>
                {releasesByPublisher.map((publisher) => (
                    <li className="mt-10" key={publisher.id}>
                        <Category size="LG">{publisher.name}</Category>
                        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-y-10 sm:gap-y-16 sm:gap-x-0 ">
                            {publisher.releases.map((comic) => (
                                <li key={comic.id}>
                                    <ComicCover
                                        comicID={comic.id}
                                        title={`${comic.seriesName} ${comic.title}`}
                                        cover={comic.cover}
                                    />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        )
    else return <p>There are no releases this week...</p>
}

AllReleases.propTypes = {
    comicDay: PropTypes.instanceOf(Date).isRequired,
}
