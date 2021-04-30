import { useState } from "react"
import PropTypes from "prop-types"
import { DisappearedLoading } from "react-loadingg"
import { usePullListSeries } from "@hooks/queries/pull-list"
import { OptionsButton } from "@components/common/buttons/OptionsButton"
import { SubscribeOptions } from "@components/pages/comic/SubscribeOptions"
import { useSubscribeToSeries, useUnsubscribeFromSeries } from "@hooks/mutations/pull-list"

export function SubscribeButton({ seriesID, isGraphicNovelSeries, comicID, marginClass }) {
    const { isLoading, isError, error, data } = usePullListSeries(seriesID)
    const [showOptions, setShowOptions] = useState(false)
    const subscribeMutation = useSubscribeToSeries(
        seriesID,
        isGraphicNovelSeries,
        comicID ? comicID : null
    )
    const unubscribeMutation = useUnsubscribeFromSeries(seriesID, comicID ? comicID : null)

    if (isLoading) return <DisappearedLoading />
    else if (isError) return <div>Error: {error.message}</div>
    else
        return (
            <OptionsButton
                primaryText="Subscribe"
                secondaryText="Subscribed"
                isActive={data.isSubscribed}
                hideToggleWhenActive={isGraphicNovelSeries}
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
    isGraphicNovelSeries: PropTypes.bool.isRequired,
    comicID: PropTypes.number,
    marginClass: PropTypes.string,
}
