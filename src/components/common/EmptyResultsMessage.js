import PropTypes from "prop-types"

export function EmptyResultsMessage({ children, marginTop = "mt-20" }) {
    return <p className={`text-gray-600 text-center ${marginTop}`}>{children}</p>
}
EmptyResultsMessage.propTypes = {
    children: PropTypes.string.isRequired,
    marginTop: PropTypes.string,
}
