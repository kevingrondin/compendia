const primaryColors = "bg-blue-primary-100 hover:bg-blue-primary-200"
const secondaryColors = "bg-gray-400 hover:bg-gray-500"

export default function Button({
    onClick,
    children,
    isFullWidth,
    className,
    isSecondary,
    isDisabled = false,
    roundedClass = "rounded-full",
}) {
    return (
        <button
            onClick={onClick}
            className={`text-center py-2 px-4 max-h-14 ${roundedClass} border-none ${
                isSecondary ? secondaryColors : primaryColors
            } text-white text-lg cursor-pointer shadow-sm  ${isFullWidth && "w-full"} ${className}`}
            disabled={isDisabled}
        >
            {children}
        </button>
    )
}
