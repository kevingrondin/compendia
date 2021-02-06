import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { Category } from "@components/common/Category"

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
                                    footer={
                                        <div className="flex justify-center mt-2">
                                            <Category size="SM">
                                                {comic.variantType ? comic.variantType : "Other"}
                                            </Category>
                                        </div>
                                    }
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
