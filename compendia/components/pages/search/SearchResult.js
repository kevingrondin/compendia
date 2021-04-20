import PropTypes from "prop-types"

export function SearchResult({ resultKey, type, children }) {
    return (
        <li className="flex flex-col items-start mb-6">
            <div className="">{children}</div>
            <div className="text-sm pl-1">{type}</div>
        </li>
    )
}
SearchResult.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}
