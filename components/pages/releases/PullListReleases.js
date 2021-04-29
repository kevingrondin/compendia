import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { usePullList } from "@hooks/queries/pull-list"
import { CoverListGrid } from "@components/common/CoverListGrid"
import { DisappearedLoading } from "react-loadingg"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"

export function PullListReleases({ comicDay }) {
    const { isLoading, isError, error, data: comics } = usePullList(comicDay)

    if (isLoading) return <DisappearedLoading />
    else if (isError) return <div>Error: {error.message}</div>
    else if (comics && comics.length > 0)
        return (
            <CoverListGrid>
                {comics.map((comic) => (
                    <li key={comic.id}>
                        <ComicCover
                            comicID={comic.id}
                            title={`${comic.title} ${comic.itemNumber}`}
                            cover={comic.cover}
                        />
                    </li>
                ))}
            </CoverListGrid>
        )
    else return <EmptyResultsMessage>Your Pull List is empty this week...</EmptyResultsMessage>
}
PullListReleases.propTypes = {
    comicDay: PropTypes.instanceOf(Date).isRequired,
}
