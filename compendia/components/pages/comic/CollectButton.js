import PropTypes from "prop-types"
import { Button } from "@components/common/buttons/Button"
import { useAddCollectedComic, useRemoveCollectedComic } from "@hooks/mutations/collection"

export function CollectButton({ comicID, isCollected, className, marginClass }) {
    return (
        <Button
            primaryText="Collect"
            secondaryText="Collected"
            isActive={isCollected}
            onPrimaryClick={useAddCollectedComic(comicID)}
            onSecondaryClick={useRemoveCollectedComic(comicID)}
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
