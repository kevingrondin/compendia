import PropTypes from "prop-types"
import AddIcon from "../icons/Add"
import CheckIcon from "../icons/Check"

const primaryColors = `bg-blue-primary-100 hover:bg-blue-primary-200 border-blue-primary-300 hover:border-blue-primary-400`
const secondaryColors = `bg-gray-400 hover:bg-gray-500 border-gray-500 hover:border-gray-600`

const Button = ({
    onClick,
    children,
    className,
    marginClass,
    roundedClass = "rounded-lg",
    isFullWidth,
    isSecondary,
    isDisabled = false,
    isActive,
    primaryText,
    secondaryText,
    onPrimaryClick,
    onSecondaryClick,
}) => {
    {
        if (isActive === true) {
            return (
                <button
                    onClick={() => onSecondaryClick.mutate()}
                    disabled={isDisabled}
                    className={`text-center text-white text-lg py-2 px-4 max-h-14 cursor-pointer shadow-sm
                        border-b-4 hover:border-b-2 hover:border-t-2
                        ${secondaryColors} ${isFullWidth && "w-full"}
                        ${roundedClass} ${marginClass} ${className}`}
                >
                    <span className="flex items-center">
                        <span className="pr-2">{secondaryText}</span>

                        <CheckIcon />
                    </span>
                </button>
            )
        } else if (isActive === false) {
            return (
                <button
                    onClick={() => onPrimaryClick.mutate()}
                    disabled={isDisabled}
                    className={`text-center text-white text-lg py-2 px-4 max-h-14 cursor-pointer shadow-sm
                        border-b-4 hover:border-b-2 hover:border-t-2
                        ${primaryColors} ${isFullWidth && "w-full"}
                        ${roundedClass} ${marginClass} ${className}`}
                >
                    <span className="flex items-center">
                        <span className="pr-2">{primaryText}</span>
                        <AddIcon />
                    </span>
                </button>
            )
        } else {
            return (
                <button
                    onClick={onClick}
                    disabled={isDisabled}
                    className={`text-center text-white text-lg py-2 px-4 max-h-14 cursor-pointer shadow-sm
                        border-b-4 hover:border-b-2 hover:border-t-2
                    ${isSecondary ? secondaryColors : primaryColors}
                    ${roundedClass} ${isFullWidth && "w-full"} ${className}`}
                >
                    {children}
                </button>
            )
        }
    }
}
Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    marginClass: PropTypes.string,
    roundedClass: PropTypes.string,
    isFullWidth: PropTypes.bool,
    isSecondary: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isActive: PropTypes.bool,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    onPrimaryClick: PropTypes.object,
    onSecondaryClick: PropTypes.object,
}

export default Button
