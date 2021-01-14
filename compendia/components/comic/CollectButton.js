import { useMutation, useQueryClient } from "react-query"
import PropTypes from "prop-types"
import axios from "axios"

import ActionButton from "../utils/ActionButton"

export default function CollectButton({ comicID, isCollected }) {
    const queryClient = useQueryClient()

    const addToCollection = useMutation(() => axios.post(`/api/collection/comics/${comicID}`), {
        onSuccess: () => {
            const currComic = queryClient.getQueryData(["comic-detail", comicID])
            const updatedComic = { ...currComic }
            updatedComic.isCollected = true
            queryClient.setQueryData(["comic-detail", comicID], updatedComic)
        },
    })

    const removeFromCollection = useMutation(
        () => axios.delete(`/api/collection/comics/${comicID}`),
        {
            onSuccess: () => {
                const currComic = queryClient.getQueryData(["comic-detail", comicID])
                const updatedComic = { ...currComic }
                updatedComic.isCollected = false
                queryClient.setQueryData(["comic-detail", comicID], updatedComic)
                queryClient.refetchQueries(["collected-comic-detail", comicID])
            },
        }
    )

    return (
        <ActionButton
            addText="Collect"
            removeText="Collected"
            isActive={isCollected}
            onAdd={addToCollection}
            onRemove={removeFromCollection}
        />
    )
}

CollectButton.propTypes = {
    comicID: PropTypes.number.isRequired,
    isCollected: PropTypes.bool.isRequired,
}
