import { useMutation, useQueryClient } from "react-query"
import PropTypes from "prop-types"
import axios from "axios"

import ActionButton from "../utils/ButtonAction"

export default function PullComicButton({ comicID, isPulled }) {
    const queryClient = useQueryClient()

    const addToPullList = () => {}

    const removeFromPullList = () => {}

    return (
        <ActionButton
            addText="Pull"
            removeText="Pulled"
            isActive={isPulled}
            onAdd={addToPullList}
            onRemove={removeFromPullList}
        />
    )
}

PullComicButton.propTypes = {
    comicID: PropTypes.number.isRequired,
    isPulled: PropTypes.bool.isRequired,
}
