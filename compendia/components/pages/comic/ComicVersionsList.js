import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { Category } from "@components/common/Category"
import { CoverListGrid } from "@components/common/CoverListGrid"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"

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
                <EmptyResultsMessage>No other versions of this comic...</EmptyResultsMessage>
            )}
        </>
    )
}

ComicVersionsList.propTypes = {
    comics: PropTypes.array.isRequired,
}
