import PropTypes from "prop-types"

import Button from "./Button"
import AddIcon from "./icons/Add"
import CheckIcon from "./icons/Check"

const ActionButton = ({ addText, removeText, isActive, onAdd, onRemove }) => (
    <>
        {isActive ? (
            <Button
                className="mb-8"
                roundedClass="rounded-lg"
                isSecondary={true}
                onClick={() => onRemove.mutate()}
            >
                <span className="flex items-center">
                    <span className="pr-2">{removeText}</span>

                    <CheckIcon />
                </span>
            </Button>
        ) : (
            <Button className="mb-8" roundedClass="rounded-lg" onClick={() => onAdd.mutate()}>
                <span className="flex items-center">
                    <span className="pr-2">{addText}</span>
                    <AddIcon />
                </span>
            </Button>
        )}
    </>
)

ActionButton.propTypes = {
    addText: PropTypes.string.isRequired,
    removeText: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onAdd: PropTypes.object.isRequired,
    onRemove: PropTypes.object.isRequired,
}

export default ActionButton
