export default function Button({ onClick, children, isFullWidth }) {
    return (
        <button
            onClick={onClick}
            className={`text-center py-2 px-4 rounded-full bg-blue-primary-100 border-none text-white text-xl cursor-pointer shadow-sm hover:bg-blue-primary-200 ${
                isFullWidth && "w-full"
            }`}
        >
            {children}
        </button>
    )
}
