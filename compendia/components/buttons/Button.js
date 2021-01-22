import { useState, createRef, useEffect } from "react"

import PropTypes from "prop-types"

import ArrowIcon from "../icons/Arrow"

const primaryColors =
    "bg-blue-primary-100 hover:bg-blue-primary-200 border-blue-primary-300 hover:border-blue-primary-400"

const secondaryColors = "bg-gray-400 hover:bg-gray-500 border-gray-500 hover:border-gray-600"

const Button = ({
    onClick,
    children,
    isFullWidth,
    className,
    roundedClass = "rounded-full",
    marginClass,
    isSecondary,
    isDisabled = false,
    isOptionsButton = false,
    options,
    showOptions,
    setShowOptions,
}) => {
    //const [showOptions, setShowOptions] = useState(false)
    const optionsRef = createRef()

    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) setShowOptions(false)
    }

    useEffect(() => {
        window.addEventListener("click", handleClickOutside)

        return () => window.removeEventListener("click", handleClickOutside)
    }, [handleClickOutside])

    return (
        <div className={`flex flex-col relative ${marginClass}`}>
            <div className="flex">
                <button
                    onClick={onClick}
                    className={`text-center text-white text-lg py-2 px-4 max-h-14 cursor-pointer shadow-sm border-b-4 hover:border-b-2 hover:border-t-2
                        ${roundedClass} ${isOptionsButton && isSecondary && "rounded-r-none"}
                        ${isSecondary ? secondaryColors : primaryColors}
                        ${isFullWidth && "w-full"}
                        ${className}`}
                    disabled={isDisabled}
                >
                    {children}
                </button>
                {isOptionsButton && isSecondary && (
                    <div className="flex flex-col">
                        <button
                            className={`flex relative w-8 py-2 h-full cursor-pointer shadow-sm border-l-2 border-b-4 hover:border-b-2 hover:border-t-2
                            ${roundedClass} rounded-l-none
                            ${isSecondary ? secondaryColors : primaryColors}`}
                            onClick={() => {
                                setShowOptions(!showOptions)
                            }}
                        >
                            <ArrowIcon
                                direction={showOptions ? "up" : "down"}
                                colorClass="text-white"
                                width="100"
                                viewBox="-10 -20 60 55"
                            />
                        </button>
                        <div
                            ref={optionsRef}
                            className={`bg-gray-500 ml-4 text-white absolute left-3/4 transform -translate-x-2/3 top-11 
                                ${!showOptions && "hidden "}
                                ${roundedClass} ${showOptions && " rounded-tl-none"}`}
                        >
                            {options}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isFullWidth: PropTypes.bool,
    className: PropTypes.string,
    roundedClass: PropTypes.string,
    marginClass: PropTypes.string,
    isSecondary: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isOptionsButton: PropTypes.bool,
    options: PropTypes.element,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
}

export default Button
