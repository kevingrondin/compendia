import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

export function useAddCollectedComic(comicID) {
    const queryClient = useQueryClient()

    return useMutation(() => axios.post(`/api/collection/comics/${comicID}`), {
        onSuccess: () => {
            const currComic = queryClient.getQueryData(["comic-detail", comicID])
            const updatedComic = { ...currComic }
            updatedComic.isCollected = true
            queryClient.setQueryData(["comic-detail", comicID], updatedComic)
        },
    })
}

export function useRemoveCollectedComic(comicID) {
    const queryClient = useQueryClient()

    return useMutation(() => axios.delete(`/api/collection/comics/${comicID}`), {
        onSuccess: () => {
            const currComic = queryClient.getQueryData(["comic-detail", comicID])
            const updatedComic = { ...currComic }
            updatedComic.isCollected = false
            queryClient.setQueryData(["comic-detail", comicID], updatedComic)
        },
    })
}

export function useUpdateCollectionFields(comicID, setIsEditMode) {
    const queryClient = useQueryClient()

    return useMutation((data) => axios.put(`/api/collection/comics/${comicID}`, data), {
        onSuccess: (res) => {
            setIsEditMode(false)
            queryClient.setQueryData(["collected-comic-detail", comicID], { ...res.data })
        },
    })
}
