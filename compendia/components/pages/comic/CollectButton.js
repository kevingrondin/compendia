import { useMutation, useQueryClient } from "react-query"
import PropTypes from "prop-types"
import axios from "axios"

import Button from "../../buttons/Button"

export default function CollectButton({ comicID, isCollected, className, marginClass }) {
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
            },
        }
    )

    return (
        <Button
            primaryText="Collect"
            secondaryText="Collected"
            isActive={isCollected}
            onPrimaryClick={addToCollection}
            onSecondaryClick={removeFromCollection}
            className={className}
            marginClass={marginClass}
        />
    )
}

CollectButton.propTypes = {
    comicID: PropTypes.number.isRequired,
    isCollected: PropTypes.bool.isRequired,
    className: PropTypes.string,
    marginClass: PropTypes.string,
}
