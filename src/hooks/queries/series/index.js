import axios from "axios"
import { useQuery } from "react-query"

export function useSeries(seriesID) {
    return useQuery(
        ["series-detail", seriesID],
        async () => {
            const { data } = await axios.get(`/api/series/${seriesID}`)
            return data
        },
        { staleTime: Infinity }
    )
}
