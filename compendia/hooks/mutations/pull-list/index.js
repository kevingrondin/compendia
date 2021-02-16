import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

export function useAddComicToPullList(comicID) {
    const queryClient = useQueryClient()

    return useMutation(() => axios.post(`/api/collection/pull-list/comics/${comicID}`), {
        onSuccess: () => {
            queryClient.setQueryData(["pull-list-comics", comicID], { isComicPulled: true })
        },
    })
}

export function useRemoveComicFromPullList(comicID) {
    const queryClient = useQueryClient()

    return useMutation(() => axios.delete(`/api/collection/pull-list/comics/${comicID}`), {
        onSuccess: () => {
            queryClient.setQueryData(["pull-list-comics", comicID], { isComicPulled: false })
        },
    })
}

export function useSubscribeToSeries(seriesID, comicID) {
    const queryClient = useQueryClient()

    return useMutation(() => axios.post(`/api/collection/pull-list/series/${seriesID}`), {
        onSuccess: (seriesDetails) => {
            queryClient.setQueryData(["pull-list-series", seriesID], { ...seriesDetails.data })
            if (comicID) queryClient.refetchQueries(["pull-list-comics", comicID])
        },
    })
}

export function useUnsubscribeFromSeries(seriesID, comicID) {
    const queryClient = useQueryClient()

    return useMutation(() => axios.delete(`/api/collection/pull-list/series/${seriesID}`), {
        onSuccess: () => {
            queryClient.setQueryData(["pull-list-series", seriesID], { isSubscribed: false })
            if (comicID) queryClient.refetchQueries(["pull-list-comics", comicID])
        },
    })
}

export function useUpdatePullListDetails(seriesID) {
    const queryClient = useQueryClient()

    return useMutation(
        (details) => axios.put(`/api/collection/pull-list/series/${seriesID}`, details),
        {
            onSuccess: (updatedDetails) => {
                queryClient.setQueryData(["pull-list-series", seriesID], updatedDetails.data)
            },
        }
    )
}
