import PropTypes from "prop-types"
import { PageLink } from "@components/common/PageLink"
import { SearchResult } from "@components/pages/search/SearchResult"

export function CreatorSearchResult({ creator }) {
    return (
        <SearchResult key={`${creator.type}${creator.id}`} type={creator.type}>
            <PageLink href={`/creators/${creator.id}`} linkText={`${creator.name}`} />
        </SearchResult>
    )
}
CreatorSearchResult.propTypes = {
    creator: PropTypes.object.isRequired,
}
