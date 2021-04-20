import PropTypes from "prop-types"
import { DisappearedLoading } from "react-loadingg"
import { ComicSearchResult } from "./ComicSearchResult"
import { SeriesSearchResult } from "./SeriesSearchResult"
import { CreatorSearchResult } from "./CreatorSearchResult"
import { ImprintSearchResult } from "./ImprintSearchResult"
import { PublisherSearchResult } from "./PublisherSearchResult"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"

export function SearchResults({ pages, isLoading }) {
    if (isLoading) return <DisappearedLoading />
    else if (pages?.length < 1 || (pages?.length > 0 && pages[0]?.data?.results?.length < 1))
        return <EmptyResultsMessage>No results...</EmptyResultsMessage>
    else {
        return (
            <ul className="flex flex-col mt-4 sm:max-w-xl">
                {pages.map((page) =>
                    page.data.results.map((result) => {
                        if (result.type === "Publisher")
                            return (
                                <PublisherSearchResult
                                    key={`${result.type}${result.id}`}
                                    publisher={result}
                                />
                            )
                        if (result.type === "Imprint")
                            return (
                                <ImprintSearchResult
                                    key={`${result.type}${result.id}`}
                                    imprint={result}
                                />
                            )
                        if (result.type === "Series")
                            return (
                                <SeriesSearchResult
                                    key={`${result.type}${result.id}`}
                                    series={result}
                                />
                            )
                        if (result.type === "Creator")
                            return (
                                <CreatorSearchResult
                                    key={`${result.type}${result.id}`}
                                    creator={result}
                                />
                            )
                        if (result.type === "Comic")
                            return (
                                <ComicSearchResult
                                    key={`${result.type}${result.id}`}
                                    comic={result}
                                />
                            )
                    })
                )}
            </ul>
        )
    }
}
SearchResults.propTypes = {
    pages: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
}
