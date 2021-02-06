import PropTypes from "prop-types"
import { useState } from "react"
import { OptionsButton } from "@components/common/buttons/OptionsButton"
import { SubscribeOptions } from "@components/pages/comic/SubscribeOptions"
import { usePullListSeries } from "@hooks/queries/pull-list"
import { useSubscribeToSeries, useUnsubscribeFromSeries } from "@hooks/mutations/pull-list"

export function SubscribeButton({ seriesID, comicID, marginClass }) {
    const { isLoading, isError, error, data } = usePullListSeries(seriesID)
    const [showOptions, setShowOptions] = useState(false)
    const subscribeMutation = useSubscribeToSeries(seriesID, comicID)
    const unubscribeMutation = useUnsubscribeFromSeries(seriesID, comicID)

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else
        return (
            <OptionsButton
                primaryText="Subscribe"
                secondaryText="Subscribed"
                isActive={data.isSubscribed}
                onPrimaryClick={subscribeMutation}
                onSecondaryClick={unubscribeMutation}
                options={<SubscribeOptions seriesID={seriesID} isOptionsVisible={showOptions} />}
                setShowOptions={(val) => setShowOptions(val)}
                showOptions={showOptions}
                marginClass={marginClass}
            />
        )
}
SubscribeButton.propTypes = {
    seriesID: PropTypes.number.isRequired,
    comicID: PropTypes.number.isRequired,
    marginClass: PropTypes.string,
}
