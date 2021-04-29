import PropTypes from "prop-types"
import Link from "next/link"
import { ArrowIcon } from "@icons/Arrow"

function useExtraContent(extraContent) {
    if (typeof extraContent === "string") return ` ${extraContent}`
    else if (typeof extraContent === "object") return <div>{extraContent}</div>
    else return <></>
}

export function PageLink({
    href,
    linkText,
    extraContent,
    hasArrow = false,
    arrowWidthClass = "",
    arrowHeightClass = "",
    hasUnderline = true,
    isDarkMode = false,
    className = "",
}) {
    const extra = useExtraContent(extraContent)

    return (
        <Link href={href} passHref>
            <a className={`flex ${className}`}>
                <span
                    className={`${
                        hasUnderline
                            ? `border-b-4 ${
                                  isDarkMode
                                      ? "border-blue-primary-400 hover:border-white"
                                      : "border-blue-primary-100 hover:border-blue-primary-300"
                              }`
                            : ""
                    }`}
                >
                    {linkText}
                </span>

                {extraContent ? <>&nbsp;{extra}</> : null}

                {hasArrow ? (
                    <ArrowIcon
                        color="text-blue-primary-200"
                        className="p-1 pl-2 self-center"
                        width={arrowWidthClass}
                        height={arrowHeightClass}
                        direction="right"
                    />
                ) : null}
            </a>
        </Link>
    )
}
PageLink.propTypes = {
    href: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    extraContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    hasArrow: PropTypes.bool,
    arrowWidthClass: PropTypes.string,
    arrowHeightClass: PropTypes.string,
    isDarkMode: PropTypes.bool,
    className: PropTypes.string,
}
