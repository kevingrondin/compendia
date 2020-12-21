import PropTypes from "prop-types"

const leftArrow =
    "M16.2448747,26.2494407 L6.22817008,15.4861298 L16.2448747,4.72281879 C17.2517084,3.6409396 17.2517084,1.89328859 16.2448747,0.811409396 C15.238041,-0.270469799 13.6116173,-0.270469799 12.6047836,0.811409396 L0.755125285,13.5442953 C-0.251708428,14.6261745 -0.251708428,16.3738255 0.755125285,17.4557047 L12.6047836,30.1885906 C13.6116173,31.2704698 15.238041,31.2704698 16.2448747,30.1885906 C17.2258922,29.1067114 17.2517084,27.3313199 16.2448747,26.2494407 Z"

const rightArrow =
    "M0.840083333,26.2145977 L10.1844167,15.5 L0.840083333,4.7854023 C-0.0991666667,3.70841954 -0.0991666667,1.96867816 0.840083333,0.891695402 C1.77933333,-0.185287356 3.29658333,-0.185287356 4.23583333,0.891695402 L15.2900833,13.566954 C16.2293333,14.6439368 16.2293333,16.3836782 15.2900833,17.4606609 L4.23583333,30.1359195 C3.29658333,31.2129023 1.77933333,31.2129023 0.840083333,30.1359195 C-0.0750833333,29.0589368 -0.0991666667,27.2915805 0.840083333,26.2145977 Z"

export default function Arrow({
    direction,
    colorClass = "text-gray-500",
    pixelHeight = "31px",
    className,
    onClick,
}) {
    return (
        <button className={className} onClick={onClick}>
            <svg width="17px" height={pixelHeight} viewBox="0 0 17 31">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g className={`fill-current ${colorClass}`} fillRule="nonzero">
                        <g>
                            <path d={direction === "left" ? leftArrow : rightArrow}></path>
                        </g>
                    </g>
                </g>
            </svg>
        </button>
    )
}

Arrow.propTypes = {
    direction: PropTypes.string,
    colorClass: PropTypes.string,
}
