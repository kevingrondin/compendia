import PropTypes from "prop-types"

export function AllReleasesIcon({ color, width, height, className }) {
    return (
        <svg
            className={`fill-current ${color} ${width} ${height} ${className}`}
            viewBox="0 0 24 24"
        >
            <path d="M7 4h10v15H7zM3 6h2v11H3zM19 6h2v11h-2z" />
        </svg>
    )
}
AllReleasesIcon.propTypes = {
    color: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
}
