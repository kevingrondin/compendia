import PropTypes from "prop-types"
import { PageLink } from "@components/common/PageLink"
import { SearchResult } from "@components/pages/search/SearchResult"

export function PublisherSearchResult({ publisher }) {
    return (
        <SearchResult type={publisher.type}>
            <PageLink href={`/publishers/${publisher.id}`} linkText={`${publisher.name}`} />
        </SearchResult>
    )
}
PublisherSearchResult.propTypes = {
    publisher: PropTypes.object.isRequired,
}
