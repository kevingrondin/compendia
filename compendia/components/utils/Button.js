import { useState, createRef, useEffect } from "react"

import PropTypes from "prop-types"

import ArrowIcon from "./icons/Arrow"

const primaryColors =
    "bg-blue-primary-100 hover:bg-blue-primary-200 border-blue-primary-300 hover:border-blue-primary-400"

const secondaryColors = "bg-gray-400 hover:bg-gray-500 border-gray-500 hover:border-gray-600"

const Button = ({
    onClick,
    children,
    isFullWidth,
    className,
    isSecondary,
    isDisabled = false,
    isOptionsButton = false,
    options,
    roundedClass = "rounded-full",
}) => {
    const [showOptions, setShowOptions] = useState(false)
    const optionsRef = createRef()

    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) setShowOptions(false)
    }

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside)

        return () => window.removeEventListener("mousedown", handleClickOutside)
    }, [handleClickOutside])

    return (
        <div className="flex flex-col relative">
            <div className="flex">
                <button
                    onClick={onClick}
                    className={`text-center text-white text-lg py-2 px-4 max-h-14 cursor-pointer shadow-sm border-b-4 hover:border-b-2 hover:border-t-2
                        ${roundedClass} ${isOptionsButton && "rounded-r-none"}
                        ${isSecondary ? secondaryColors : primaryColors}
                        ${isFullWidth && "w-full"}
                        ${className}`}
                    disabled={isDisabled}
                >
                    {children}
                </button>
                {isOptionsButton && (
                    <div
                        className={`flex w-8 py-2 cursor-pointer shadow-sm border-l-2 border-b-4 hover:border-b-2 hover:border-t-2
                            ${roundedClass} rounded-l-none
                            ${isSecondary ? secondaryColors : primaryColors}`}
                    >
                        <ArrowIcon
                            direction="down"
                            colorClass="text-white"
                            width="100"
                            viewBox="-10 -20 60 55"
                            onClick={() => {
                                setShowOptions(!showOptions)
                            }}
                        />
                    </div>
                )}
            </div>

            {isOptionsButton && showOptions && <div ref={optionsRef}>{options}</div>}
        </div>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isFullWidth: PropTypes.bool,
    className: PropTypes.string,
    isSecondary: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isOptionsButton: PropTypes.bool,
    options: PropTypes.element,
    roundedClass: PropTypes.string,
}

export default Button
