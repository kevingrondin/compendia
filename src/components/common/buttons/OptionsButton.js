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
    isSubOptions = false,
}) => {
    const optionsRef = useOptionsRef(setShowOptions, bypassOutsideClick)

    return (
        <div
            ref={optionsRef}
            className={`bg-gray-500 text-white ${roundedClass}
                ${isSubOptions === false ? "absolute top-11 transform -translate-x-3/4 z-10" : ""}
                ${!showOptions ? "hidden " : ""}
                ${showOptions ? "rounded-tl-none" : ""}`}
        >
            {options}
        </div>
    )
}
Options.propTypes = {
    roundedClass: PropTypes.string,
    isSubOptions: PropTypes.bool,
    options: PropTypes.element,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
    bypassOutsideClick: PropTypes.bool,
}

export const OptionsToggle = ({
    className,
    roundedClass,
    isDisabled,
    options,
    showOptions,
    setShowOptions,
    bypassOutsideClick,
}) => {
    return (
        <div className="flex flex-col relative">
            <button
                className={`flex justify-center items-center pr-1 relative w-8 h-full cursor-pointer shadow-sm border-l-2 border-b-4 hover:border-b-2 hover:border-t-2
                    ${roundedClass} rounded-l-none ${secondaryColors} ${className}`}
                onClick={() => {
                    setShowOptions(!showOptions)
                }}
                disabled={isDisabled}
            >
                <ArrowIcon direction={showOptions ? "up" : "down"} color="text-white" width="w-5" />
            </button>
            <Options
                roundedClass={roundedClass}
                options={options}
                showOptions={showOptions}
                setShowOptions={setShowOptions}
                bypassOutsideClick={bypassOutsideClick}
            />
        </div>
    )
}
OptionsToggle.propTypes = {
    className: PropTypes.string,
    roundedClass: PropTypes.string,
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
    hideToggleWhenActive = false,
}) {
    const [show, setShow] = useState(false)
    const showOptionsGetter = showOptions ? showOptions : show
    const showOptionsSetter = setShowOptions ? setShowOptions : setShow

    if (isActive === true) {
        return (
            <div className={`inline-block w-min ${marginClass ? marginClass : ""}`}>
                <div className="flex">
                    <button
                        onClick={() => onSecondaryClick.mutate()}
                        disabled={isDisabled}
                        className={`text-center text-white text-lg py-2 px-4 max-h-14 cursor-pointer shadow-sm border-b-4 hover:border-b-2 hover:border-t-2 
                            ${roundedClass} ${hideToggleWhenActive ? "" : "rounded-r-none"}
                            ${secondaryColors} ${className}`}
                    >
                        <span className="flex items-center">
                            <span className="pr-2">{secondaryText}</span>

                            <CheckIcon />
                        </span>
                    </button>

                    {hideToggleWhenActive ? (
                        <></>
                    ) : (
                        <OptionsToggle
                            roundedClass={roundedClass}
                            isDisabled={isDisabled}
                            options={options}
                            showOptions={showOptionsGetter}
                            setShowOptions={showOptionsSetter}
                        />
                    )}
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
    hideToggleWhenActive: PropTypes.bool,
}

export function SVGOptionsButton({
    children,
    options,
    showOptions,
    setShowOptions,
    optionsXPosition = "left-3/4 transform -translate-x-32",
    optionsYPosition,
    optionsPosition,
}) {
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
                    xPosition={optionsXPosition}
                    yPosition={optionsYPosition}
                    position={optionsPosition}
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
    optionsXPosition: PropTypes.string,
    optionsYPosition: PropTypes.string,
    optionsPosition: PropTypes.string,
}
