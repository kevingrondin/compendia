import axios from "axios"
import { useQuery } from "react-query"

export function useComicLists(comicID) {
    return useQuery(
        ["comic-lists", comicID],
        async () => {
            const { data } = await axios.get(`/api/comics/${comicID}/lists`)
            return data
        },
        { staleTime: Infinity }
    )
}

export function useComic(comicID) {
    return useQuery(
        ["comic-detail", comicID],
        async () => {
            const { data } = await axios.get(`/api/comics/${comicID}`)
            return data
        },
        { enabled: false, staleTime: Infinity }
    )
}

export function useComicVersions(comicID) {
    return useQuery(
        ["comic-versions", comicID],
        async () => {
            const { data } = await axios.get(`/api/comics/${comicID}/versions`)
            return data
        },
        { staleTime: Infinity }
    )
}
