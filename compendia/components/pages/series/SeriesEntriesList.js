import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"

export function SeriesEntriesList({ entries }) {
    return (
        <>
            {entries && entries.length > 0 ? (
                <div className="flex flex-wrap">
                    <ul>
                        {entries.map((comic) => (
                            <li key={comic.id}>
                                <ComicCover
                                    comicID={comic.id}
                                    cover={comic.cover}
                                    title={`${comic.title} ${comic.itemNumber}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-xl mt-12 mb-20">No entries in this series...</p>
            )}
        </>
    )
}

SeriesEntriesList.propTypes = {
    entries: PropTypes.array.isRequired,
}
