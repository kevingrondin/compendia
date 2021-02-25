import PropTypes from "prop-types"
import { DisappearedLoading } from "react-loadingg"
import { ComicSearchResults } from "./ComicSearchResults"
import { CreatorSearchResults } from "./CreatorSearchResults"
import { ImprintSearchResults } from "./ImprintSearchResults"
import { PublisherSearchResults } from "./PublisherSearchResults"
import { SeriesSearchResults } from "./SeriesSearchResults"

export function SearchResults({ results, isLoading }) {
    if (isLoading) return <DisappearedLoading />
    else if (!results) return <></>
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
