import PropTypes from "prop-types"

const leftArrow = `M16.2448747,26.2494407 L6.22817008,15.4861298 L16.2448747,4.72281879 C17.2517084,3.6409396 17.2517084,1.89328859 16.2448747,0.811409396 C15.238041,-0.270469799 13.6116173,-0.270469799 12.6047836,0.811409396 L0.755125285,13.5442953 C-0.251708428,14.6261745 -0.251708428,16.3738255 0.755125285,17.4557047 L12.6047836,30.1885906 C13.6116173,31.2704698 15.238041,31.2704698 16.2448747,30.1885906 C17.2258922,29.1067114 17.2517084,27.3313199 16.2448747,26.2494407 Z`
const rightArrow = `M0.840083333,26.2145977 L10.1844167,15.5 L0.840083333,4.7854023 C-0.0991666667,3.70841954 -0.0991666667,1.96867816 0.840083333,0.891695402 C1.77933333,-0.185287356 3.29658333,-0.185287356 4.23583333,0.891695402 L15.2900833,13.566954 C16.2293333,14.6439368 16.2293333,16.3836782 15.2900833,17.4606609 L4.23583333,30.1359195 C3.29658333,31.2129023 1.77933333,31.2129023 0.840083333,30.1359195 C-0.0750833333,29.0589368 -0.0991666667,27.2915805 0.840083333,26.2145977 Z`
const downArrow = `M8.84008333,19.2145977 L18.1844167,8.5 L8.84008333,-2.2145977 C7.90083333,-3.29158046 7.90083333,-5.03132184 8.84008333,-6.1083046 C9.77933333,-7.18528736 11.2965833,-7.18528736 12.2358333,-6.1083046 L23.2900833,6.56695402 C24.2293333,7.64393678 24.2293333,9.38367816 23.2900833,10.4606609 L12.2358333,23.1359195 C11.2965833,24.2129023 9.77933333,24.2129023 8.84008333,23.1359195 C7.92491667,22.0589368 7.90083333,20.2915805 8.84008333,19.2145977 Z`
const upArrow = `M8.84008333,19.2145977 L18.1844167,8.5 L8.84008333,-2.2145977 C7.90083333,-3.29158046 7.90083333,-5.03132184 8.84008333,-6.1083046 C9.77933333,-7.18528736 11.2965833,-7.18528736 12.2358333,-6.1083046 L23.2900833,6.56695402 C24.2293333,7.64393678 24.2293333,9.38367816 23.2900833,10.4606609 L12.2358333,23.1359195 C11.2965833,24.2129023 9.77933333,24.2129023 8.84008333,23.1359195 C7.92491667,22.0589368 7.90083333,20.2915805 8.84008333,19.2145977 Z`

const downTransform = `translate(16.065083, 8.513807) rotate(90.000000) translate(-16.065083, -8.513807)`
const upTransform = `translate(16.065083, 8.513807) rotate(-90.000000) translate(-16.065083, -8.513807)`

const ArrowIcon = ({
    direction,
    onClick,
    colorClass = "text-gray-500",
    height,
    width,
    viewBox = "0 0 60 55",
    className,
}) => {
    let arrow
    let transform

    switch (direction) {
        case "left":
            arrow = leftArrow
            transform = ""
            break
        case "right":
            arrow = rightArrow
            transform = ""
            break
        case "up":
            arrow = upArrow
            transform = upTransform
            break
        case "down":
            arrow = downArrow
            transform = downTransform
            break
    }

    return (
        <svg
            className={className}
            onClick={onClick}
            viewBox={viewBox}
            width={width}
            height={height}
        >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g className={`fill-current ${colorClass}`} fillRule="nonzero">
                    <g>
                        <path d={arrow} transform={transform}></path>
                    </g>
                </g>
            </g>
        </svg>
    )
}

ArrowIcon.propTypes = {
    direction: PropTypes.oneOf(["left", "right", "up", "down"]).isRequired,
    onClick: PropTypes.func.isRequired,
    colorClass: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    viewBox: PropTypes.string,
    className: PropTypes.string,
}

export default ArrowIcon
