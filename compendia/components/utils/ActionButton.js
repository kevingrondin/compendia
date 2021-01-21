import PropTypes from "prop-types"

import Button from "./Button"
import AddIcon from "./icons/Add"
import CheckIcon from "./icons/Check"

const ActionButton = ({
    addText,
    removeText,
    isActive,
    onAdd,
    onRemove,
    isOptionsButton = false,
    options,
    className,
    marginClass,
}) => (
    <>
        {isActive ? (
            <Button
                className={className}
                roundedClass="rounded-lg"
                marginClass={marginClass}
                isSecondary={true}
                onClick={() => onRemove.mutate()}
                isOptionsButton={isOptionsButton}
                options={options}
            >
                <span className="flex items-center">
                    <span className="pr-2">{removeText}</span>

                    <CheckIcon />
                </span>
            </Button>
        ) : (
            <Button
                className={className}
                roundedClass="rounded-lg"
                marginClass={marginClass}
                isSecondary={false}
                onClick={() => onAdd.mutate()}
                isOptionsButton={isOptionsButton}
                options={options}
            >
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
    isOptionsButton: PropTypes.bool,
    options: PropTypes.element,
    className: PropTypes.string,
    marginClass: PropTypes.string,
}

export default ActionButton
