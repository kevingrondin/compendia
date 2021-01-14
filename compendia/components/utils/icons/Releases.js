import PropTypes from "prop-types"

const ReleasesIcon = ({ isActive }) => (
    <div className="pr-2">
        {isActive ? (
            <svg width="24px" height="24px" viewBox="0 0 24 24">
                <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="amp_stories-24px">
                        <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
                        <g
                            id="Group"
                            transform="translate(3.000000, 4.000000)"
                            fill="#FFFFFF"
                            fillRule="nonzero"
                        >
                            <rect id="Rectangle" x="4" y="0" width="10" height="15"></rect>
                            <rect id="Rectangle" x="0" y="2" width="2" height="11"></rect>
                            <rect id="Rectangle" x="16" y="2" width="2" height="11"></rect>
                        </g>
                    </g>
                </g>
            </svg>
        ) : (
            <svg width="24px" height="24px" viewBox="0 0 24 24">
                <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="amp_stories-24px">
                        <rect id="Rectangle" x="0" y="0" width="24" height="24"></rect>
                        <g
                            id="Group"
                            transform="translate(3.000000, 4.000000)"
                            fill="#6B7280"
                            fillRule="nonzero"
                        >
                            <rect id="Rectangle" x="4" y="0" width="10" height="15"></rect>
                            <rect id="Rectangle" x="0" y="2" width="2" height="11"></rect>
                            <rect id="Rectangle" x="16" y="2" width="2" height="11"></rect>
                        </g>
                    </g>
                </g>
            </svg>
        )}
    </div>
)

ReleasesIcon.propTypes = {
    isActive: PropTypes.bool,
}

export default ReleasesIcon
