import PropTypes from "prop-types"
import { ComicCover } from "../comic/ComicCover"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"
import { CoverListSideScroller } from "@components/common/CoverListSideScroller"

export function PublisherComicsList({ comicsList }) {
    return (
        <div className="flex">
            {comicsList && comicsList.length > 0 ? (
                <CoverListSideScroller>
                    {comicsList.map((comic) => (
                        <li key={comic.id}>
                            <ComicCover
                                comicID={comic.id}
                                cover={comic.cover}
                                title={`${comic.title} ${comic.itemNumber}`}
                            />
                        </li>
                    ))}
                </CoverListSideScroller>
            ) : (
                <EmptyResultsMessage>No comics by this publisher...</EmptyResultsMessage>
            )}
        </div>
    )
}

PublisherComicsList.propTypes = {
    comicsList: PropTypes.array.isRequired,
}
