import PropTypes from "prop-types"
import { ComicCover } from "../comic/ComicCover"
import { CoverListGrid } from "@components/common/CoverListGrid"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"

export function PublisherComicsList({ comicsList }) {
    return (
        <>
            {comicsList && comicsList.length > 0 ? (
                <CoverListGrid>
                    {comicsList.map((comic) => (
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
                <EmptyResultsMessage>No comics by this publisher...</EmptyResultsMessage>
            )}
        </>
    )
}

PublisherComicsList.propTypes = {
    comicsList: PropTypes.array.isRequired,
}
