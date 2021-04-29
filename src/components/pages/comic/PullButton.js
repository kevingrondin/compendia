import PropTypes from "prop-types"
import { Button } from "@components/common/buttons/Button"
import { usePullListComic } from "@hooks/queries/pull-list"
import { useAddComicToPullList, useRemoveComicFromPullList } from "@hooks/mutations/pull-list"
import { DisappearedLoading } from "react-loadingg"

export function PullButton({ comicID, className, marginClass }) {
    const { isLoading, isError, error, data } = usePullListComic(comicID)
    const addMutation = useAddComicToPullList(comicID)
    const removeMutation = useRemoveComicFromPullList(comicID)

    if (isLoading) return <DisappearedLoading />
    else if (isError) return <div>Error: {error.message}</div>
    else
        return (
            <Button
                primaryText="Pull"
                secondaryText="Pulled"
                isActive={data.isComicPulled}
                onPrimaryClick={addMutation}
                onSecondaryClick={removeMutation}
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
