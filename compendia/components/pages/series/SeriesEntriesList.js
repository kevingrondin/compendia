import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { CoverListGrid } from "@components/common/CoverListGrid"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"

export function SeriesEntriesList({ entries }) {
    return (
        <>
            {entries && entries.length > 0 ? (
                <CoverListGrid>
                    {entries.map((comic) => (
                        <li key={comic.id}>
                            <ComicCover
                                comicID={comic.id}
                                cover={comic.cover}
                                title={`${comic.title} ${comic.itemNumber}`}
                            />
                        </li>
                    ))}
                </CoverListGrid>
            ) : (
                <EmptyResultsMessage>No comics in this series...</EmptyResultsMessage>
            )}
        </>
    )
}

SeriesEntriesList.propTypes = {
    entries: PropTypes.array.isRequired,
}
