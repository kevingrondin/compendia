import PropTypes from "prop-types"
import { createRef, useEffect, useState } from "react"
import { ArrowIcon } from "@icons/Arrow"
import { CheckIcon } from "@icons/Check"

const primaryColors = `bg-blue-primary-100 hover:bg-blue-primary-200 border-blue-primary-300 hover:border-blue-primary-400`
const secondaryColors = `bg-gray-400 hover:bg-gray-500 border-gray-500 hover:border-gray-600`

const useOptionsRef = (setShowOptions, bypassOutsideClick) => {
    const optionsRef = createRef()

    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) setShowOptions(false)
    }

    useEffect(() => {
        if (!bypassOutsideClick) {
            window.addEventListener("click", handleClickOutside)

            return () => window.removeEventListener("click", handleClickOutside)
        }
    }, [handleClickOutside])

    return optionsRef
}

export const Options = ({
    showOptions,
    setShowOptions,
    options,
    bypassOutsideClick,
    roundedClass = "",
    xPosition = "left-3/4 transform -translate-x-2/3",
    yPosition = "top-11",
    position = "absolute",
}) => {
    const optionsRef = useOptionsRef(setShowOptions, bypassOutsideClick)

    return (
        <div
            ref={optionsRef}
            className={`bg-gray-500 ml-4 text-white ${roundedClass}
                ${position} ${xPosition} ${yPosition}
                ${!showOptions ? "hidden " : ""}
                ${showOptions ? "rounded-tl-none" : ""}`}
        >
            {options}
        </div>
    )
}
Options.propTypes = {
    roundedClass: PropTypes.string,
    xPosition: PropTypes.string,
    yPosition: PropTypes.string,
    position: PropTypes.string,
    options: PropTypes.element,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
    bypassOutsideClick: PropTypes.bool,
}

export const OptionsToggle = ({
    className,
    roundedClass,
    xPosition,
    yPosition,
    position,
    isDisabled,
    options,
    showOptions,
    setShowOptions,
    bypassOutsideClick,
}) => {
    return (
        <div className="flex flex-col">
            <button
                className={`flex relative w-8 py-2 h-full cursor-pointer shadow-sm border-l-2 border-b-4 hover:border-b-2 hover:border-t-2
                    ${roundedClass} rounded-l-none ${secondaryColors} ${className}`}
                onClick={() => {
                    setShowOptions(!showOptions)
                }}
                disabled={isDisabled}
            >
                <ArrowIcon
                    direction={showOptions ? "up" : "down"}
                    colorClass="text-white"
                    width="100"
                    viewBox="-10 -20 60 55"
                />
            </button>
            <Options
                roundedClass={roundedClass}
                options={options}
                showOptions={showOptions}
                setShowOptions={setShowOptions}
                bypassOutsideClick={bypassOutsideClick}
                xPosition={xPosition}
                yPosition={yPosition}
                position={position}
            />
        </div>
    )
}
OptionsToggle.propTypes = {
    className: PropTypes.string,
    roundedClass: PropTypes.string,
    xPosition: PropTypes.string,
    yPosition: PropTypes.string,
    position: PropTypes.string,
    isDisabled: PropTypes.bool,
    options: PropTypes.element,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
    bypassOutsideClick: PropTypes.bool,
}

export function OptionsButton({
    className,
    marginClass,
    roundedClass = "rounded-lg",
    primaryText,
    secondaryText,
    onPrimaryClick,
    onSecondaryClick,
    isDisabled,
    isActive,
    options,
    showOptions,
    setShowOptions,
}) {
    const [show, setShow] = useState(false)
    const showOptionsGetter = showOptions ? showOptions : show
    const showOptionsSetter = setShowOptions ? setShowOptions : setShow

    if (isActive === true) {
        return (
            <div className={`flex flex-col relative ${marginClass}`}>
                <div className="flex">
                    <button
                        onClick={() => onSecondaryClick.mutate()}
                        disabled={isDisabled}
                        className={`text-center text-white text-lg py-2 px-4 max-h-14 cursor-pointer shadow-sm border-b-4 hover:border-b-2 hover:border-t-2 
                            ${roundedClass} rounded-r-none
                            ${secondaryColors} ${className}`}
                    >
                        <span className="flex items-center">
                            <span className="pr-2">{secondaryText}</span>

                            <CheckIcon />
                        </span>
                    </button>
                    <OptionsToggle
                        roundedClass={roundedClass}
                        isDisabled={isDisabled}
                        options={options}
                        showOptions={showOptionsGetter}
                        setShowOptions={showOptionsSetter}
                    />
                </div>
            </div>
        )
    } else if (isActive === false) {
        return (
            <div className={`flex flex-col relative ${marginClass}`}>
                <div className="flex">
                    <button
                        onClick={() => onPrimaryClick.mutate()}
                        disabled={isDisabled}
                        className={`text-center text-white text-lg py-2 px-4 max-h-14 cursor-pointer shadow-sm border-b-4 hover:border-b-2 hover:border-t-2
                            ${roundedClass} ${primaryColors} ${className}`}
                    >
                        {primaryText}
                    </button>
                </div>
            </div>
        )
    }
}
OptionsButton.propTypes = {
    className: PropTypes.string,
    marginClass: PropTypes.string,
    roundedClass: PropTypes.string,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    onPrimaryClick: PropTypes.object,
    onSecondaryClick: PropTypes.object,
    isDisabled: PropTypes.bool,
    isActive: PropTypes.bool,
    options: PropTypes.element.isRequired,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
}

export function SVGOptionsButton({ children, options, showOptions, setShowOptions }) {
    const [show, setShow] = useState(false)
    const showOptionsGetter = showOptions ? showOptions : show
    const showOptionsSetter = setShowOptions ? setShowOptions : setShow

    return (
        <div className={`flex flex-col relative`}>
            <div className="flex">
                <button
                    className={`cursor-pointer`}
                    onClick={() => showOptionsSetter(!showOptionsGetter)}
                >
                    {children}
                </button>
                <Options
                    options={options}
                    showOptions={showOptionsGetter}
                    setShowOptions={showOptionsSetter}
                    xPosition="-translate-x-full"
                />
            </div>
        </div>
    )
}
SVGOptionsButton.propTypes = {
    children: PropTypes.element.isRequired,
    isDisabled: PropTypes.bool,
    options: PropTypes.element.isRequired,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
}
