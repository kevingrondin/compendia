import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { CoverListGrid } from "@components/common/CoverListGrid"

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
                <p className="text-center text-xl mt-12 mb-20">No releases in this series...</p>
            )}
        </>
    )
}

SeriesEntriesList.propTypes = {
    entries: PropTypes.array.isRequired,
}
