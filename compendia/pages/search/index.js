import {
    PublisherSearchResult,
    CreatorSearchResult,
    ImprintSearchResult,
    SeriesSearchResult,
    ComicSearchResult,
} from "@components/pages/search/Results"
import { Page } from "@components/common/Page"
import { useSearch } from "@hooks/queries/search"
import { Fragment, useRef, useState } from "react"
import { SearchBar } from "@components/pages/Search/SearchBar"
import { Button } from "@components/common/buttons/Button"
import { PageHeading } from "@components/common/PageHeading"
import useIntersectionObserver from "@hooks/useIntersectionObserver"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"
import DisappearedLoading from "react-loadingg/lib/DisappearedLoading"

function getResultsFromPages(pages) {
    return pages.map((page) => {
        return (
            <Fragment key={page.data.pageNum}>
                {page.data.results.map((result) => {
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
                            <ComicSearchResult key={`${result.type}${result.id}`} comic={result} />
                        )
                })}
            </Fragment>
        )
    })
}

export default function Search() {
    const [query, setQuery] = useState("")
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useSearch(query)
    const hasData = data?.pages?.length > 0 && data?.pages[0]?.data?.results?.length > 0
    const loadMoreRef = useRef()
    useIntersectionObserver({
        target: loadMoreRef,
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    })

    return (
        <Page title="Compendia Search" paddingY={"py-0"} paddingX={"px-0"} disableScroll={true}>
            <PageHeading
                heading="Search"
                paddingTop={"pt-6"}
                marginBottom={""}
                controls={<SearchBar onSubmit={(search) => setQuery(search)} />}
            />
            <div className="flex flex-col items-center overflow-y-scroll pt-4">
                <ul className="flex flex-col items-start mb-2 sm:max-w-xl">
                    {isFetching ? (
                        <DisappearedLoading />
                    ) : hasData ? (
                        <>
                            {getResultsFromPages(data.pages)}{" "}
                            {isFetchingNextPage ? <DisappearedLoading /> : <></>}
                            <Button
                                className={`${
                                    data.pages.length > 1 || isFetchingNextPage ? "invisible" : ""
                                }`}
                                ref={loadMoreRef}
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                            >
                                Load More Results
                            </Button>
                        </>
                    ) : (
                        <EmptyResultsMessage>No results...</EmptyResultsMessage>
                    )}
                </ul>
            </div>
        </Page>
    )
}
