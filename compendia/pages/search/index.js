import PropTypes from "prop-types"
import { Page } from "@components/common/Page"
import { PageHeading } from "@components/common/PageHeading"
import { SearchResults } from "@components/pages/search/SearchResults"
import { useSearch } from "@hooks/queries/search"
import { useState } from "react"
import { SearchIcon } from "@components/icons/Search"

function SearchBar({ onSubmit }) {
    const [search, setSearch] = useState("")

    return (
        <div className="flex items-center justify-center">
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSubmit(search)
                }}
                className="rounded-full h-10 w-60 sm:w-96 border-2 my-2 bg-white border-blue-primary-200"
            />
            <button onClick={() => onSubmit(search)}>
                <SearchIcon
                    color="text-blue-primary-200 hover:text-blue-primary-300"
                    width="w-8"
                    className="ml-2"
                />
            </button>
        </div>
    )
}
SearchBar.propTypes = { onSubmit: PropTypes.func.isRequired }

export default function Search() {
    const [query, setQuery] = useState("")
    const { data, error, fetchNextPage, hasNextPage, isFetching } = useSearch(query)

    return (
        <Page title="Compendia Search" paddingY={"py-0"}>
            <PageHeading
                heading="Search"
                paddingTop={"pt-6"}
                controls={<SearchBar onSubmit={(search) => setQuery(search)} />}
            />
            <div className="flex flex-col items-center">
                {data && data.pages ? (
                    <SearchResults pages={data.pages} isLoading={isFetching} />
                ) : (
                    <></>
                )}
            </div>
        </Page>
    )
}
