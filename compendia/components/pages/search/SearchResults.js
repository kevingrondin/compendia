import PropTypes from "prop-types"
import { DisappearedLoading } from "react-loadingg"
import { ComicSearchResults } from "./ComicSearchResults"
import { CreatorSearchResults } from "./CreatorSearchResults"
import { ImprintSearchResults } from "./ImprintSearchResults"
import { PublisherSearchResults } from "./PublisherSearchResults"
import { SeriesSearchResults } from "./SeriesSearchResults"

function hasNoResults(results) {
    return (
        results.comics.length < 1 &&
        results.series.length < 1 &&
        results.publishers.length < 1 &&
        results.imprints.length < 1 &&
        results.creators.length < 1
    )
}

export function SearchResults({ results, isLoading }) {
    if (isLoading) return <DisappearedLoading />
    else if (!results || hasNoResults(results))
        return <p className="text-gray-600 text-center mt-20">No results...</p>
    else
        return (
            <div className="grid grid-cols-1 gap-10 mt-4">
                <ComicSearchResults comics={results.comics} />
                <SeriesSearchResults series={results.series} />
                <PublisherSearchResults publishers={results.publishers} />
                <ImprintSearchResults imprints={results.imprints} />
                <CreatorSearchResults creators={results.creators} />
            </div>
        )
}
SearchResults.propTypes = {
    results: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
}
