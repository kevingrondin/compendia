import PropTypes from "prop-types"

export function CoverListSideScroller({ children }) {
    return <ul className="flex overflow-x-scroll">{children}</ul>
}
CoverListSideScroller.propTypes = {
    children: PropTypes.any,
}
