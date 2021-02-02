import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"

export function ComicVersionsList({ comics }) {
    return (
        <>
            {comics && comics.length > 0 ? (
                <div className="flex flex-wrap">
                    <ul>
                        {comics.map((comic) => (
                            <li key={comic.id}>
                                <ComicCover
                                    comicID={comic.id}
                                    cover={comic.cover}
                                    title={comic.title}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-xl mt-12 mb-20">No other versions...</p>
            )}
        </>
    )
}

ComicVersionsList.propTypes = {
    comics: PropTypes.array.isRequired,
}
