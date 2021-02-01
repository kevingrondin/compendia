import axios from "axios"
import { useQuery } from "react-query"
import { format } from "date-fns"

export function useAllReleases(comicDay) {
    return useQuery(
        `all-releases-${format(comicDay, "yyyy-MM-dd")}`,
        async () => {
            const { data } = await axios.get(
                `/api/releases?comicDay=${format(comicDay, "yyyy-MM-dd")}`
            )
            return data
        },
        { staleTime: 600000 }
    )
}
