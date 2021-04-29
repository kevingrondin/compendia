import axios from "axios"
import { useInfiniteQuery } from "react-query"

export function useSearch(query) {
    const getSearchResults = async ({ pageParam = 0 }) =>
        await axios.get(`/api/search?searchQuery=${query}&pageNum=${pageParam}`)
    return useInfiniteQuery(["search", query], getSearchResults, {
        getNextPageParam: (lastPage, pages) => {
            const next =
                lastPage?.data?.results?.length > 0
                    ? parseInt(lastPage.data.pageNum) + 1
                    : undefined
            return next
        },
    })
}
