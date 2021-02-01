import PropTypes from "prop-types"
import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { Button } from "@components/common/buttons/Button"
import { usePullListComic } from "@hooks/queries/pull-list"

export function PullButton({ comicID, className, marginClass }) {
    const queryClient = useQueryClient()
    const { isLoading, isError, error, data } = usePullListComic(comicID)

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
            <Button
                primaryText="Pull"
                secondaryText="Pulled"
                isActive={data.isComicPulled}
                onPrimaryClick={addComicToPullList}
                onSecondaryClick={removeComicFromPullList}
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
