import { useMutation, useQueryClient } from "react-query"
import PropTypes from "prop-types"
import axios from "axios"

import ActionButton from "../utils/ActionButton"

export default function PullComicButton({ comicID, isPulled, className }) {
    const queryClient = useQueryClient()

    const addToPullList = useMutation(
        () => axios.post(`/api/collection/pull-list/comics/${comicID}`),
        {
            onSuccess: () => {
                const currComic = queryClient.getQueryData(["comic-detail", comicID])
                const updatedComic = { ...currComic }
                updatedComic.isPulled = true
                queryClient.setQueryData(["comic-detail", comicID], updatedComic)
            },
        }
    )

    const removeFromPullList = useMutation(
        () => axios.delete(`/api/collection/pull-list/comics/${comicID}`),
        {
            onSuccess: () => {
                const currComic = queryClient.getQueryData(["comic-detail", comicID])
                const updatedComic = { ...currComic }
                updatedComic.isPulled = false
                queryClient.setQueryData(["comic-detail", comicID], updatedComic)
            },
        }
    )

    return (
        <ActionButton
            addText="Pull"
            removeText="Pulled"
            isActive={isPulled}
            onAdd={addToPullList}
            onRemove={removeFromPullList}
            className={className}
            isOptionsButton={true}
        />
    )
}

PullComicButton.propTypes = {
    comicID: PropTypes.number.isRequired,
    isPulled: PropTypes.bool.isRequired,
    className: PropTypes.string,
}
