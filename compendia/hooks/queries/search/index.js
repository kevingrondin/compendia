import axios from "axios"
import { useInfiniteQuery } from "react-query"

export function useSearch(query) {
    const getSearchResults = async ({ pageParam = 0 }) =>
        await axios.get(`/api/search?searchQuery=${query}&cursor=${pageParam}`)
    return useInfiniteQuery(["search", query], getSearchResults, {
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    })
}
