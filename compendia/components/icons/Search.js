import PropTypes from "prop-types"

export function SearchIcon({ color, width, height, className }) {
    return (
        <svg
            className={`fill-current ${color} ${width} ${height} ${className ? className : ""}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="none">
                <path d="M0 0h24v24H0z" />
                <path
                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                    fill="#094166"
                />
            </g>
        </svg>
    )
}
SearchIcon.propTypes = {
    color: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
}
