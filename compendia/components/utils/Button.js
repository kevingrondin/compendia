import PropTypes from "prop-types"
import ArrowIcon from "./icons/Arrow"

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
    isOptionsButton = false,
    roundedClass = "rounded-full",
}) => (
    <>
        <button
            onClick={onClick}
            className={`text-center text-white text-lg py-2 px-4 max-h-14 cursor-pointer shadow-sm border-b-4 hover:border-b-2 hover:border-t-2
                ${roundedClass} ${isOptionsButton && "rounded-r-none"}
                ${isSecondary ? secondaryColors : primaryColors}
                ${isFullWidth && "w-full"}
                ${className}`}
            disabled={isDisabled}
        >
            {children}
        </button>
        {isOptionsButton && (
            <div
                className={`w-8 border-l-2 text-center flex justify-center items-center cursor-pointer shadow-sm max-h-14 rounded-full rounded-l-none border-b-4 hover:border-b-2 hover:border-t-2
                ${isSecondary ? secondaryColors : primaryColors}
                ${isFullWidth && "w-full"}
                ${className}`}
            >
                <ArrowIcon
                    direction="down"
                    colorClass="text-white"
                    className=""
                    width="100"
                    height=""
                    viewBox="-10 -20 60 55"
                    onClick={() => {}}
                />
            </div>
        )}
    </>
)

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isFullWidth: PropTypes.bool,
    className: PropTypes.string,
    isSecondary: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isOptionsButton: PropTypes.bool,
    roundedClass: PropTypes.string,
}

export default Button
