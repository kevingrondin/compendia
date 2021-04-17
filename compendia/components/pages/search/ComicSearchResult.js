import PropTypes from "prop-types"
import { PageLink } from "@components/common/PageLink"
import { SearchResult } from "@components/pages/search/SearchResult"

export function ComicSearchResult({ comic }) {
    return (
        <SearchResult key={`${comic.type}${comic.id}`} type={`${comic.type} - ${comic.format}`}>
            <PageLink
                href={`/comics/${comic.id}`}
                linkText={`${comic.title} ${comic.itemNumber}${
                    comic.coverLetter || comic.variantDescription
                        ? ` -${comic.coverLetter ? ` Cover ${comic.coverLetter}` : ""} ${
                              comic.variantDescription ? comic.variantDescription : ""
                          }`
                        : ``
                }`}
            />
        </SearchResult>
    )
}
ComicSearchResult.propTypes = {
    comic: PropTypes.object.isRequired,
}
