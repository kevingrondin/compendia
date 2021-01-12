const primaryColors = "bg-blue-primary-100 hover:bg-blue-primary-200"
const secondaryColors = "bg-gray-500 hover:bg-gray-600"

export default function Button({ onClick, children, isFullWidth, className, isSecondary }) {
    return (
        <button
            onClick={onClick}
            className={`text-center py-2 px-4 max-h-14 rounded-full border-none ${
                isSecondary ? secondaryColors : primaryColors
            } text-white text-xl cursor-pointer shadow-sm  ${isFullWidth && "w-full"} ${className}`}
        >
            {children}
        </button>
    )
}
