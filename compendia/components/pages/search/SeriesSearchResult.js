import PropTypes from "prop-types"
import { PageLink } from "@components/common/PageLink"
import { SearchResult } from "@components/pages/search/SearchResult"

export function SeriesSearchResult({ series }) {
    return (
        <SearchResult type={series.type}>
            <PageLink href={`/series/${series.id}`} linkText={`${series.name}`} />
        </SearchResult>
    )
}
SeriesSearchResult.propTypes = {
    series: PropTypes.object.isRequired,
}
