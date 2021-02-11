import PropTypes from "prop-types"
import { ComicCover } from "../comic/ComicCover"
import { CoverListGrid } from "@components/common/CoverListGrid"

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
                <p className="text-center text-xl mt-12 mb-20">No comics by this publisher...</p>
            )}
        </>
    )
}

PublisherComicsList.propTypes = {
    comicsList: PropTypes.array.isRequired,
}
