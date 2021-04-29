import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { Category } from "@components/common/Category"
import { CoverListGrid } from "@components/common/CoverListGrid"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"

export function CreatorComicsList({ comics, creatorID }) {
    return (
        <>
            {comics && comics.length > 0 ? (
                <CoverListGrid>
                    {comics.map((comic) => (
                        <li key={comic.id}>
                            <ComicCover
                                comicID={comic.id}
                                cover={comic.cover}
                                title={`${comic.title} ${comic.itemNumber}`}
                                footer={
                                    <ul className="flex flex-wrap justify-center">
                                        {comic.creatorTypes.map((type, index) => (
                                            <li
                                                key={`${creatorID}-${comic.id}-${type}`}
                                                className="flex mt-2"
                                            >
                                                <Category size="SM">{type}</Category>
                                                {index !== comic.creatorTypes.length - 1 && (
                                                    <span className="text-2xl mx-1 text-blue-primary-200">
                                                        /
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                }
                            />
                        </li>
                    ))}
                </CoverListGrid>
            ) : (
                <EmptyResultsMessage>No comics by this creator...</EmptyResultsMessage>
            )}
        </>
    )
}

CreatorComicsList.propTypes = {
    comics: PropTypes.array.isRequired,
    creatorID: PropTypes.string.isRequired,
}
