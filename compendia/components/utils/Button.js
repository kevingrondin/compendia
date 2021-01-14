import PropTypes from "prop-types"

const primaryColors =
    "bg-blue-primary-100 hover:bg-blue-primary-200 border-blue-primary-300 hover:border-blue-primary-400"

const secondaryColors = "bg-gray-400 hover:bg-gray-500 border-gray-500 hover:border-gray-600"

const Button = ({
    onClick,
    children,
    isFullWidth,
    className,
    isSecondary,
    isDisabled = false,
    roundedClass = "rounded-full",
}) => (
    <button
        onClick={onClick}
        className={`text-center py-2 px-4 max-h-14 ${roundedClass} border-b-4 hover:border-b-2 hover:border-t-2 ${
            isSecondary ? secondaryColors : primaryColors
        } text-white text-lg cursor-pointer shadow-sm  ${isFullWidth && "w-full"} ${className}`}
        disabled={isDisabled}
    >
        {children}
    </button>
)

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isFullWidth: PropTypes.bool,
    className: PropTypes.string,
    isSecondary: PropTypes.bool,
    isDisabled: PropTypes.bool,
    roundedClass: PropTypes.string,
}

export default Button
