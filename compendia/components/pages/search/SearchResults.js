import PropTypes from "prop-types"
import { DisappearedLoading } from "react-loadingg"
import { ComicSearchResult } from "./ComicSearchResult"
import { SeriesSearchResult } from "./SeriesSearchResult"
import { CreatorSearchResult } from "./CreatorSearchResult"
import { ImprintSearchResult } from "./ImprintSearchResult"
import { PublisherSearchResult } from "./PublisherSearchResult"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"

export function SearchResults({ results, isLoading }) {
    if (isLoading) return <DisappearedLoading />
    else if (!results || results.length < 1)
        return <EmptyResultsMessage>No results...</EmptyResultsMessage>
    else {
        const resultListItems = results.map((result) => {
            if (result.type === "Publisher") return <PublisherSearchResult publisher={result} />
            if (result.type === "Imprint") return <ImprintSearchResult imprint={result} />
            if (result.type === "Series") return <SeriesSearchResult series={result} />
            if (result.type === "Creator") return <CreatorSearchResult creator={result} />
            if (result.type === "Comic") return <ComicSearchResult comic={result} />
        })
        return <ul className="flex flex-col overflow-x-scroll sm:max-w-xl">{resultListItems}</ul>
    }
}
SearchResults.propTypes = {
    results: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
}
