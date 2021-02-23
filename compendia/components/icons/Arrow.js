import PropTypes from "prop-types"

const leftArrow = `M16.245 26.25L6.228 15.485 16.245 4.723c1.007-1.082 1.007-2.83 0-3.912-1.007-1.081-2.633-1.081-3.64 0L.755 13.544c-1.007 1.082-1.007 2.83 0 3.912l11.85 12.733c1.007 1.081 2.633 1.081 3.64 0 .98-1.082 1.007-2.858 0-3.94z`
const rightArrow = `M.84 26.215L10.184 15.5.84 4.785C-.1 3.708-.1 1.97.84.892s2.457-1.077 3.396 0L15.29 13.567c.94 1.077.94 2.817 0 3.894L4.236 30.136c-.94 1.077-2.457 1.077-3.396 0-.915-1.077-.94-2.844 0-3.921z`
const downArrow = `M5.364 1.289l10.715 9.344L26.793 1.29c1.077-.94 2.817-.94 3.894 0s1.077 2.456 0 3.396L18.012 15.739c-1.077.94-2.817.94-3.894 0L1.443 4.685c-1.077-.94-1.077-2.457 0-3.396 1.077-.915 2.844-.94 3.921 0z`
const upArrow = `M26.766 15.739L16.05 6.394 5.337 15.74c-1.077.94-2.817.94-3.894 0s-1.077-2.457 0-3.396L14.118 1.29c1.077-.94 2.817-.94 3.894 0l12.675 11.054c1.077.94 1.077 2.457 0 3.396-1.077.915-2.844.94-3.921 0z`

function useArrow(direction) {
    switch (direction) {
        case "left":
            return [leftArrow, "0 0 16 31"]
        case "right":
            return [rightArrow, "0 0 16 31"]
        case "up":
            return [upArrow, "0 0 31 16"]
        case "down":
            return [downArrow, "0 0 31 16"]
    }
}

export function ArrowIcon({
    direction,
    onClick,
    color = "text-gray-500",
    height = "",
    width = "",
    className = "",
}) {
    const [arrow, viewBox] = useArrow(direction)

    return (
        <svg
            className={`fill-current ${color} ${width} ${height} ${className}`}
            onClick={onClick}
            viewBox={viewBox}
        >
            <path d={arrow} />
        </svg>
    )
}
ArrowIcon.propTypes = {
    direction: PropTypes.oneOf(["left", "right", "up", "down"]).isRequired,
    onClick: PropTypes.func,
    colorClass: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    className: PropTypes.string,
}
