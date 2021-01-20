import { useMutation, useQueryClient, useQuery } from "react-query"
import PropTypes from "prop-types"
import axios from "axios"

import ActionButton from "../utils/ActionButton"
import SubscribeOptions from "./SubscribeOptions"

const getPullListSeries = (seriesID) =>
    useQuery(["pull-list-series", seriesID], async () => {
        const { data } = await axios.get(`/api/collection/pull-list/series/${seriesID}`)
        return data
    })

export default function SubscribeButton({ seriesID, className }) {
    const queryClient = useQueryClient()
    const { isLoading, isError, error, data } = getPullListSeries(seriesID)

    const subscribeToSeries = useMutation(
        () => axios.post(`/api/collection/pull-list/series/${seriesID}`),
        {
            onSuccess: () => {
                queryClient.setQueryData(["pull-list-series", seriesID], { isSubscribed: true })
            },
        }
    )

    const unsubscribeFromSeries = useMutation(
        () => axios.delete(`/api/collection/pull-list/series/${seriesID}`),
        {
            onSuccess: () => {
                queryClient.setQueryData(["pull-list-series", seriesID], { isSubscribed: false })
            },
        }
    )

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else
        return (
            <ActionButton
                addText="Subscribe"
                removeText="Subscribed"
                isActive={data.isSubscribed}
                onAdd={subscribeToSeries}
                onRemove={unsubscribeFromSeries}
                isOptionsButton={true}
                options={<SubscribeOptions seriesID={seriesID} />}
                className={className}
            />
        )
}

SubscribeButton.propTypes = {
    seriesID: PropTypes.number.isRequired,
    className: PropTypes.string,
}
