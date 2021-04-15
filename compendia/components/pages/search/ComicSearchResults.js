import PropTypes from "prop-types"
import { Category } from "@components/common/Category"
import { PageLink } from "@components/common/PageLink"

export function ComicSearchResults({ comics }) {
    return (
        <>
            {comics && comics.length > 0 ? (
                <div>
                    <Category size="MD" className="mb-4">
                        Comics
                    </Category>
                    <ul>
                        {comics.map((comic) => (
                            <li key={comic.id} className="flex">
                                <PageLink
                                    href={`/comics/${comic.id}`}
                                    linkText={`${comic.title} ${comic.itemNumber}${
                                        comic.coverLetter || comic.variantDescription
                                            ? ` -${
                                                  comic.coverLetter
                                                      ? ` Cover ${comic.coverLetter}`
                                                      : ""
                                              } ${
                                                  comic.variantDescription
                                                      ? comic.variantDescription
                                                      : ""
                                              }`
                                            : ``
                                    }`}
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
