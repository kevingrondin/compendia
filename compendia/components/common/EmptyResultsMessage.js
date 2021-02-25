import PropTypes from "prop-types"

export function EmptyResultsMessage({ children }) {
    return <p className="text-gray-600 text-center mt-20">{children}</p>
}
EmptyResultsMessage.propTypes = {
    children: PropTypes.string.isRequired,
}
