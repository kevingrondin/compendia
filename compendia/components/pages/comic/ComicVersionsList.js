import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { Category } from "@components/common/Category"
import { CoverListGrid } from "@components/common/CoverListGrid"

export function ComicVersionsList({ comics }) {
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
                                    <div className="flex justify-center mt-2">
                                        <Category size="SM">
                                            {comic.variantType ? comic.variantType : "Other"}
                                        </Category>
                                    </div>
                                }
                            />
                        </li>
                    ))}
                </CoverListGrid>
            ) : (
                <p className="text-center text-xl mt-12 mb-20">No other versions...</p>
            )}
        </>
    )
}

ComicVersionsList.propTypes = {
    comics: PropTypes.array.isRequired,
}
