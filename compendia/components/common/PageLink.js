import PropTypes from "prop-types"
import Link from "next/link"
import { ArrowIcon } from "@icons/Arrow"

export function PageLink({ href, linkText, extraContent, hasArrow = false, className }) {
    let extra = <></>
    if (typeof extraContent === "string") {
        extra = ` ${extraContent}`
    } else if (typeof extraContent === "object") {
        extra = <div>{extraContent}</div>
    }

    return (
        <Link href={href} passHref>
            <a
                className={`${typeof extraContent === "string" ? "" : "flex"}
             ${className ? className : null}`}
            >
                <span className="border-b-4 border-gray-300 hover:border-blue-primary-200">
                    {linkText}
                </span>
                {extraContent ? extra : null}

                {hasArrow ? (
                    <ArrowIcon
                        colorClass="text-blue-primary-200"
                        className="pl-1"
                        height="28"
                        width="35"
                        viewBox="-8 -12 60 55"
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
    className: PropTypes.string,
}
