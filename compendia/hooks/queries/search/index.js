import axios from "axios"
import { useQuery } from "react-query"

export function useSearch(searchQuery) {
    return useQuery(
        ["search", searchQuery],
        async () => {
            const { data } = await axios.get(`/api/search?searchQuery=${searchQuery}`)
            return data
        },
        { staleTime: 600000, enabled: false }
    )
}
