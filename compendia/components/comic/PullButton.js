import { useMutation, useQuery, useQueryClient } from "react-query"
import PropTypes from "prop-types"
import axios from "axios"

import ActionButton from "../utils/ActionButton"

const getPullListComic = (comicID) =>
    useQuery(
        ["pull-list-comics", comicID],
        async () => {
            const { data } = await axios.get(`/api/collection/pull-list/comics/${comicID}`)
            return data
        },
        { staleTime: Infinity }
    )

export default function PullButton({ comicID, className, marginClass }) {
    const queryClient = useQueryClient()
    const { isLoading, isError, error, data } = getPullListComic(comicID)

    const addComicToPullList = useMutation(
        () => axios.post(`/api/collection/pull-list/comics/${comicID}`),
        {
            onSuccess: () => {
                queryClient.setQueryData(["pull-list-comics", comicID], { isComicPulled: true })
            },
        }
    )

    const removeComicFromPullList = useMutation(
        () => axios.delete(`/api/collection/pull-list/comics/${comicID}`),
        {
            onSuccess: () => {
                queryClient.setQueryData(["pull-list-comics", comicID], { isComicPulled: false })
            },
        }
    )

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else
        return (
            <ActionButton
                addText="Pull"
                removeText="Pulled"
                isActive={data.isComicPulled}
                onAdd={addComicToPullList}
                onRemove={removeComicFromPullList}
                className={className}
                marginClass={marginClass}
            />
        )
}

PullButton.propTypes = {
    comicID: PropTypes.number.isRequired,
    className: PropTypes.string,
    marginClass: PropTypes.string,
}
