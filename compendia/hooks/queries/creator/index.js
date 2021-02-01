import { useQuery } from "react-query"
import axios from "axios"

export const useCreatorDetail = (creatorID) =>
    useQuery(
        ["creator-detail", creatorID],
        async () => {
            const { data } = await axios.get(`/api/creators/${creatorID}`)
            return data
        },
        { enabled: false, staleTime: Infinity }
    )

export const useCreatorComics = (creatorID, types) =>
    useQuery(
        ["creator-comics", creatorID, types.join("/")],
        async () => {
            const { data } = await axios.get(`/api/creators/${creatorID}/comics`, {
                params: {
                    types: types.join("/"),
                },
            })
            return data
        },
        { enabled: false, staleTime: Infinity }
    )
