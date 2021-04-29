import axios from "axios"
import { useQuery } from "react-query"

export function usePublisher(publisherID) {
    return useQuery(
        ["publisher-detail", publisherID],
        async () => {
            const { data } = await axios.get(`/api/publishers/${publisherID}`)
            return data
        },
        { staleTime: Infinity }
    )
}
