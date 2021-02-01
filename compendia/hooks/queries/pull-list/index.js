import axios from "axios"
import { useQuery } from "react-query"
import { format } from "date-fns"

export function usePullList(comicDay) {
    return useQuery(["pull-list", format(comicDay, "MM-dd-yyyy")], async () => {
        const { data } = await axios.get(
            `/api/collection/pull-list/comics?comicDay=${format(comicDay, "MM-dd-yyyy")}`
        )
        return data
    })
}

export function usePullListComic(comicID) {
    return useQuery(
        ["pull-list-comics", comicID],
        async () => {
            const { data } = await axios.get(`/api/collection/pull-list/comics/${comicID}`)
            return data
        },
        { staleTime: Infinity }
    )
}

export function usePullListSeries(seriesID) {
    return useQuery(
        ["pull-list-series", seriesID],
        async () => {
            const { data } = await axios.get(`/api/collection/pull-list/series/${seriesID}`)
            return data
        },
        { staleTime: Infinity }
    )
}
