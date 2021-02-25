import PropTypes from "prop-types"
import { Category } from "@components/common/Category"
import { PageLink } from "@components/common/PageLink"

export function ComicSearchResults({ comics }) {
    return (
        <>
            {comics && comics.length > 0 ? (
                <div>
                    <Category size="MD">Comics</Category>
                    <ul>
                        {comics.map((comic) => (
                            <li key={comic.id}>
                                <PageLink
                                    href={`/comics/${comic.id}`}
                                    linkText={`${comic.title} ${comic.itemNumber}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}
ComicSearchResults.propTypes = {
    comics: PropTypes.array.isRequired,
}
