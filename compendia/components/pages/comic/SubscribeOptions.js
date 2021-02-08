import PropTypes from "prop-types"
import { useEffect, useState, useReducer } from "react"
import { Button } from "@components/common/buttons/Button"
import { ArrowIcon } from "@icons/Arrow"
import { Options } from "@components/common/buttons/OptionsButton"
import { usePullListSeries } from "@hooks/queries/pull-list"
import { useUpdatePullListDetails } from "@hooks/mutations/pull-list"

const variants = [
    {
        key: "includeSubPrintings",
        label: "Subsequent Printings",
    },
    {
        key: "includeReprints",
        label: "Reprints",
    },
    {
        key: "includeCoverVariants",
        label: "Cover Variants",
    },
    {
        key: "includeConVariants",
        label: "Convention Variants",
    },
    {
        key: "includeIncVariants",
        label: "Incentive Covers",
    },
    {
        key: "includeRetailExcl",
        label: "Retailer Exclusives",
    },
    {
        key: "includeDRSVariants",
        label: "Diamond Retailer Summit Variants",
    },
    {
        key: "includeStoreVariants",
        label: "Store Variants",
    },
    {
        key: "includeRRPVariants",
        label: "Retailer Roundtable Program Variants",
    },
]

const formats = [
    {
        key: "includeSingleIssues",
        label: "Single Issues",
    },
    {
        key: "includeTPBs",
        label: "Trade Paperbacks",
    },
    {
        key: "includeHardcovers",
        label: "Hardcovers",
    },
    {
        key: "includeOmnibuses",
        label: "Omnibuses",
    },
    {
        key: "includeCompendia",
        label: "Compendia",
    },
    {
        key: "includeAll",
        label: "All",
    },
]

function isNotLastCheckedOption(options) {
    let numChecked = 0
    options.includeSingleIssues && numChecked++
    options.includeTPBs && numChecked++
    options.includeHardcovers && numChecked++
    options.includeOmnibuses && numChecked++
    options.includeCompendia && numChecked++
    return numChecked > 1
}

function subscribeOptionsReducer(options, action) {
    const optionsUpdate = { ...options }

    if (action.type === "include") {
        optionsUpdate[action.key] = true
    } else if (action.type === "exclude" && action.key === "includeSingleIssues") {
        if (isNotLastCheckedOption(options)) {
            optionsUpdate.includeSingleIssues = false
            variants.forEach((format) => (optionsUpdate[format.key] = false))
        }
    } else if (action.type === "exclude") {
        console.log("Yee")
        if (formats.some((format) => (format.key = action.key)) && isNotLastCheckedOption(options))
            optionsUpdate[action.key] = false
    } else if (action.type === "includeAll") {
        Object.keys(optionsUpdate).forEach((key) => (optionsUpdate[key] = true))
    } else if (action.type === "reset") {
        Object.keys(optionsUpdate).forEach((key) => (optionsUpdate[key] = action.data[key]))
    }

    console.log("A: ", optionsUpdate)
    return optionsUpdate
}

function SubscribeOptionsItem({ label, value, disabled, onChange, subOptions, className }) {
    const [showSubOptions, setShowSubOptions] = useState(false)

    return (
        <div className="flex flex-col">
            <label className={`flex items-center mb-4 ml-4 mr-4 whitespace-nowrap ${className}`}>
                <input
                    type="checkbox"
                    className={`form-checkbox h-5 w-5 mr-1 text-blue-primary-200 ${
                        disabled ? "opacity-30" : "cursor-pointer"
                    }`}
                    checked={value}
                    disabled={disabled}
                    onChange={onChange}
                />
                {label}
                {subOptions ? (
                    <button
                        className={`flex relative w-8 ml-2 cursor-pointer`}
                        onClick={() => {
                            setShowSubOptions(!showSubOptions)
                        }}
                    >
                        <ArrowIcon
                            direction={showSubOptions ? "up" : "down"}
                            colorClass="text-white"
                            width="100"
                            viewBox="-10 -20 60 55"
                        />
                    </button>
                ) : null}
            </label>
            <Options
                options={subOptions}
                showOptions={showSubOptions}
                setShowOptions={setShowSubOptions}
                bypassOutsideClick={true}
                position=""
                xPosition=""
                yPosition=""
            />
        </div>
    )
}
SubscribeOptionsItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    subOptions: PropTypes.element,
    className: PropTypes.string,
}

function VariantList({ options, dispatch }) {
    return (
        <ul>
            {variants.map((variantType) => (
                <li key={variantType.key}>
                    <SubscribeOptionsItem
                        className="ml-6"
                        label={variantType.label}
                        value={options[variantType.key]}
                        disabled={options.includeAll || !options.includeSingleIssues}
                        onChange={(e) =>
                            dispatch({
                                type: e.target.checked ? "include" : "exclude",
                                key: variantType.key,
                            })
                        }
                    />
                </li>
            ))}
        </ul>
    )
}
VariantList.propTypes = {
    options: PropTypes.object,
    dispatch: PropTypes.func,
}

function FormatList({ options, dispatch }) {
    console.log("B: ", formats)

    return (
        <ul>
            {formats.map((format) => (
                <li key={format.key}>
                    <SubscribeOptionsItem
                        label={format.label}
                        value={options[format.key]}
                        disabled={format.key === "includeAll" ? false : options.includeAll}
                        subOptions={
                            format.key === "includeSingleIssues" ? (
                                <VariantList options={options} dispatch={dispatch} />
                            ) : null
                        }
                        onChange={(e) =>
                            format.key === "includeAll" && e.target.checked
                                ? dispatch({ type: "includeAll" })
                                : dispatch({
                                      type: e.target.checked ? "include" : "exclude",
                                      key: format.key,
                                  })
                        }
                    />
                </li>
            ))}
        </ul>
    )
}
FormatList.propTypes = {
    options: PropTypes.object,
    dispatch: PropTypes.func,
}

export function SubscribeOptions({ seriesID, isOptionsVisible }) {
    const { isLoading, isError, error, data } = usePullListSeries(seriesID)
    const pullListMutation = useUpdatePullListDetails(seriesID)
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    const [subscribeOptions, dispatch] = useReducer(subscribeOptionsReducer, {
        includeSingleIssues: data.includeSingleIssues,
        includeTPBs: data.includeTPBs,
        includeHardcovers: data.includeHardcovers,
        includeOmnibuses: data.includeOmnibuses,
        includeCompendia: data.includeCompendia,
        includeAll: data.includeAll,
        includeSubPrintings: data.includeSubPrintings,
        includeReprints: data.includeReprints,
        includeCoverVariants: data.includeCoverVariants,
        includeConVariants: data.includeConVariants,
        includeIncVariants: data.includeIncVariants,
        includeRetailExcl: data.includeRetailExcl,
        includeDRSVariants: data.includeDRSVariants,
        includeStoreVariants: data.includeStoreVariants,
        includeRRPVariants: data.includeRRPVariants,
    })

    useEffect(() => {
        if (isOptionsVisible === false) {
            dispatch({ type: "reset", data: data })
            setShowUpdateButton(false)
        }
    }, [isOptionsVisible, data])

    useEffect(() => {
        setShowUpdateButton(true)
    }, [subscribeOptions])

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else if (!data) return <></>
    else
        return (
            <div className="flex flex-col">
                <h3 className="font-semibold text-gray-50 m-2 mb-1 mt-3 border-b-2 border-gray-300">
                    Formats to Include
                </h3>

                <FormatList options={subscribeOptions} dispatch={dispatch} />

                {showUpdateButton && (
                    <Button
                        roundedClass="rounded-lg"
                        className="m-3 ml-auto self-end"
                        onClick={() => {
                            pullListMutation.mutate(subscribeOptions)
                            setShowUpdateButton(false)
                        }}
                    >
                        Update
                    </Button>
                )}
            </div>
        )
}
SubscribeOptions.propTypes = {
    seriesID: PropTypes.number.isRequired,
    isOptionsVisible: PropTypes.bool.isRequired,
}
