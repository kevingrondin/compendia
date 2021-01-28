import { createRef, useEffect, useState } from "react"
import PropTypes from "prop-types"
import ArrowIcon from "../icons/Arrow"
import CheckIcon from "../icons/Check"

const primaryColors = `bg-blue-primary-100 hover:bg-blue-primary-200 border-blue-primary-300 hover:border-blue-primary-400`
const secondaryColors = `bg-gray-400 hover:bg-gray-500 border-gray-500 hover:border-gray-600`

const useOptionsRef = (setShowOptions) => {
    const optionsRef = createRef()

    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) setShowOptions(false)
    }

    useEffect(() => {
        window.addEventListener("click", handleClickOutside)

        return () => window.removeEventListener("click", handleClickOutside)
    }, [handleClickOutside])

    return optionsRef
}

const Options = ({ showOptions, setShowOptions, options, roundedClass }) => {
    const optionsRef = useOptionsRef(setShowOptions)

    return (
        <div
            ref={optionsRef}
            className={`bg-gray-500 ml-4 text-white absolute left-3/4 transform -translate-x-2/3 top-11 
                ${!showOptions && "hidden "}
                ${roundedClass} ${showOptions && " rounded-tl-none"}`}
        >
            {options}
        </div>
    )
}
Options.propTypes = {
    roundedClass: PropTypes.string,
    options: PropTypes.element,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
}

const OptionsToggle = ({ roundedClass, isDisabled, options, showOptions, setShowOptions }) => {
    return (
        <div className="flex flex-col">
            <button
                className={`flex relative w-8 py-2 h-full cursor-pointer shadow-sm border-l-2 border-b-4 hover:border-b-2 hover:border-t-2
                    ${roundedClass} rounded-l-none ${secondaryColors}`}
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
            />
        </div>
    )
}
OptionsToggle.propTypes = {
    roundedClass: PropTypes.string,
    isDisabled: PropTypes.bool,
    options: PropTypes.element,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
}

export const OptionsButton = ({
    className,
    marginClass,
    roundedClass = "rounded-lg",
    children,
    primaryText,
    secondaryText,
    onClick,
    onPrimaryClick,
    onSecondaryClick,
    isDisabled,
    isSecondary,
    isActive,
    options,
    showOptions,
    setShowOptions,
}) => {
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
                            ${roundedClass} ${primaryColors}
                            ${isFullWidth && "w-full"} ${className}`}
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
    children: PropTypes.element,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    onClick: PropTypes.func,
    onPrimaryClick: PropTypes.object,
    onSecondaryClick: PropTypes.object,
    isDisabled: PropTypes.bool,
    isSecondary: PropTypes.bool,
    isActive: PropTypes.bool,
    options: PropTypes.element.isRequired,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
}

export const SVGOptionsButton = ({ children, options, showOptions, setShowOptions }) => {
    const [show, setShow] = useState(false)
    const showOptionsGetter = showOptions ? showOptions : show
    const showOptionsSetter = setShowOptions ? setShowOptions : setShow

    return (
        <>
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
            />
        </>
    )
}
SVGOptionsButton.propTypes = {
    children: PropTypes.element.isRequired,
    isDisabled: PropTypes.bool,
    options: PropTypes.element.isRequired,
    showOptions: PropTypes.bool,
    setShowOptions: PropTypes.func,
}
