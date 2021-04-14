import PropTypes from "prop-types"

export function CoverListGrid({ children }) {
    return (
        <ul className="grid grid-cols-2 justify-items-center gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-y-16 sm:gap-x-0 ">
            {children}
        </ul>
    )
}
CoverListGrid.propTypes = {
    children: PropTypes.any,
}
