import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { usePullList } from "@hooks/queries/pull-list"

export function PullListReleases({ comicDay }) {
    const { isLoading, isError, error, data: comics } = usePullList(comicDay)

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else if (comics && comics.length > 0)
        return (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-y-6 sm:gap-8 ">
                {comics.map((comic) => (
                    <li key={comic.id}>
                        <ComicCover
                            comicID={comic.id}
                            title={`${comic.title} ${comic.itemNumber}`}
                            cover={comic.cover}
                        />
                    </li>
                ))}
            </ul>
        )
    else return <p>Your Pull List is empty this week...</p>
}
PullListReleases.propTypes = {
    comicDay: PropTypes.instanceOf(Date).isRequired,
}
