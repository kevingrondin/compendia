import PropTypes from "prop-types"
import axios from "axios"
import { useState } from "react"
import { useMutation, useQueryClient, useQuery } from "react-query"
import { OptionsButton } from "@components/common/buttons/OptionsButton"
import { SubscribeOptions } from "@components/pages/comic/SubscribeOptions"

const getPullListSeries = (seriesID) =>
    useQuery(
        ["pull-list-series", seriesID],
        async () => {
            const { data } = await axios.get(`/api/collection/pull-list/series/${seriesID}`)
            return data
        },
        { staleTime: Infinity }
    )

export function SubscribeButton({ seriesID, comicID, className, marginClass }) {
    const queryClient = useQueryClient()
    const { isLoading, isError, error, data } = getPullListSeries(seriesID)
    const [showOptions, setShowOptions] = useState(false)

    const subscribeToSeries = useMutation(
        () => axios.post(`/api/collection/pull-list/series/${seriesID}`),
        {
            onSuccess: (seriesDetails) => {
                queryClient.setQueryData(["pull-list-series", seriesID], { ...seriesDetails.data })
                queryClient.refetchQueries(["pull-list-comics", comicID])
            },
        }
    )

    const unsubscribeFromSeries = useMutation(
        () => axios.delete(`/api/collection/pull-list/series/${seriesID}`),
        {
            onSuccess: () => {
                queryClient.setQueryData(["pull-list-series", seriesID], { isSubscribed: false })
                queryClient.refetchQueries(["pull-list-comics", comicID])
            },
        }
    )

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else
        return (
            <OptionsButton
                primaryText="Subscribe"
                secondaryText="Subscribed"
                isActive={data.isSubscribed}
                onPrimaryClick={subscribeToSeries}
                onSecondaryClick={unsubscribeFromSeries}
                options={<SubscribeOptions seriesID={seriesID} isOptionsVisible={showOptions} />}
                setShowOptions={(val) => setShowOptions(val)}
                showOptions={showOptions}
                className={className}
                marginClass={marginClass}
            />
        )
}
SubscribeButton.propTypes = {
    seriesID: PropTypes.number.isRequired,
    comicID: PropTypes.number.isRequired,
    className: PropTypes.string,
    marginClass: PropTypes.string,
}
