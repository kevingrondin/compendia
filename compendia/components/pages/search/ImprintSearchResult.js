import PropTypes from "prop-types"
import { PageLink } from "@components/common/PageLink"
import { SearchResult } from "@components/pages/search/SearchResult"

export function ImprintSearchResult({ imprint }) {
    return (
        <SearchResult key={`${imprint.type}${imprint.id}`} type={imprint.type}>
            <PageLink href={`/publishers/${imprint.id}`} linkText={`${imprint.name}`} />
        </SearchResult>
    )
}
ImprintSearchResult.propTypes = {
    imprint: PropTypes.object.isRequired,
}
