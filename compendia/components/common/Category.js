import PropTypes from "prop-types"

export function Category({ children, size, className }) {
    const styles = `text-blue-primary-200 bg-blue-100 font-bold mb-5 w-min py-1 px-2 whitespace-nowrap ${className}`

    if (size === "SM") return <h5 className={`text-lg ${styles}`}>{children}</h5>
    else if (size === "MD") return <h4 className={`text-xl ${styles}`}>{children}</h4>
    else if (size === "LG") return <h3 className={`text-2xl ${styles}`}>{children}</h3>
}
Category.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    size: PropTypes.oneOf(["SM", "MD", "LG"]).isRequired,
    className: PropTypes.string,
}
