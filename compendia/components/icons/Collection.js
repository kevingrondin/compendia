import PropTypes from "prop-types"

export function CollectionIcon({ color, width, height, className }) {
    return (
        <svg
            className={`fill-current ${color} ${width} ${height} ${className ? className : ""}`}
            viewBox="0 0 20 20"
        >
            <g fill="none">
                <path
                    d="M15.25 1H2.75L1 4v12a1 1 0 001 1h14a1 1 0 001-1V4l-1.75-3z"
                    stroke="#094166"
                />
                <path
                    d="M1 4v12a1 1 0 001 1h14a1 1 0 001-1V4H1zm10 4H7a1 1 0 010-2h4a1 1 0 010 2z"
                    fill="#094166"
                />
            </g>
        </svg>
    )
}
CollectionIcon.propTypes = {
    color: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
}
