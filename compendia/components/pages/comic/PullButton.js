import PropTypes from "prop-types"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Button } from "@components/common/buttons/Button"

const getPullListComic = (comicID) =>
    useQuery(
        ["pull-list-comics", comicID],
        async () => {
            const { data } = await axios.get(`/api/collection/pull-list/comics/${comicID}`)
            return data
        },
        { staleTime: Infinity }
    )

export function PullButton({ comicID, className, marginClass }) {
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
