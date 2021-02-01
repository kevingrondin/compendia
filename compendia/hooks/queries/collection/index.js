import axios from "axios"
import { useQuery } from "react-query"

export function useCollectedComic(id) {
    return useQuery(
        ["collected-comic-detail", id],
        async () => {
            const { data } = await axios.get(`/api/collection/comics/${id}`)
            return data
        },
        { staleTime: Infinity }
    )
}
