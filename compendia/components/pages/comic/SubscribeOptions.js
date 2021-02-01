import PropTypes from "prop-types"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useEffect, useState } from "react"
import { Button } from "@components/common/buttons/Button"
import { usePullListSeries } from "@hooks/queries/pull-list"

const SubscribeOptionsItem = ({ label, value, disabled, onChange, className }) => {
    return (
        <label className={`flex items-center m-2 whitespace-nowrap ${className}`}>
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
        </label>
    )
}
SubscribeOptionsItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
}

//TODO refactor this to be simpler and more readable (loop through options)
export function SubscribeOptions({ seriesID, isOptionsVisible }) {
    const queryClient = useQueryClient()
    const { isLoading, isError, error, data } = getPullListSeries(seriesID)
    const [showUpdateButton, setShowUpdateButton] = useState(false)

    const [includeSingleIssues, setIncludeSingleIssues] = useState(data.includeSingleIssues)
    const [includePrintings, setIncludePrintings] = useState(data.includePrintings)
    const [includeVariantCovers, setIncludeVariantCovers] = useState(data.includeVariantCovers)
    const [includeTPBs, setIncludeTPBs] = useState(data.includeTPBs)
    const [includeHardcovers, setIncludeHardcovers] = useState(data.includeHardcovers)
    const [includeOmnibuses, setIncludeOmnibuses] = useState(data.includeOmnibuses)
    const [includeCompendia, setIncludeCompendia] = useState(data.includeCompendia)
    const [includeAll, setIncludeAll] = useState(data.includeAll)

    const updatePullListDetails = useMutation(
        (details) => axios.put(`/api/collection/pull-list/series/${seriesID}`, details),
        {
            onSuccess: (updatedDetails) => {
                queryClient.setQueryData(["pull-list-series", seriesID], updatedDetails.data)
            },
        }
    )

    useEffect(() => {
        if (isOptionsVisible === false) {
            setIncludeSingleIssues(data.includeSingleIssues)
            setIncludePrintings(data.includePrintings)
            setIncludeVariantCovers(data.includeVariantCovers)
            setIncludeTPBs(data.includeTPBs)
            setIncludeHardcovers(data.includeHardcovers)
            setIncludeOmnibuses(data.includeOmnibuses)
            setIncludeCompendia(data.includeCompendia)
            setIncludeAll(data.includeAll)
            setShowUpdateButton(false)
        }
    }, [isOptionsVisible, data])

    function isNotLastCheckedOption() {
        let numChecked = 0

        includeSingleIssues && numChecked++
        includeTPBs && numChecked++
        includeHardcovers && numChecked++
        includeOmnibuses && numChecked++
        includeCompendia && numChecked++

        return numChecked > 1
    }

    function handleOptionCheck(e, optionName, setter) {
        const isChecked = e.target.checked

        if (optionName === "includeAll") {
            if (isChecked) {
                setIncludeSingleIssues(true)
                setIncludePrintings(true)
                setIncludeVariantCovers(true)
                setIncludeTPBs(true)
                setIncludeHardcovers(true)
                setIncludeOmnibuses(true)
                setIncludeCompendia(true)
                setIncludeAll(true)
            } else setIncludeAll(false)

            setShowUpdateButton(true)
        } else if (optionName === "includeSingleIssues") {
            if (isChecked) {
                setIncludeSingleIssues(true)
                setShowUpdateButton(true)
            } else if (isNotLastCheckedOption()) {
                setIncludeSingleIssues(false)
                setIncludePrintings(false)
                setIncludeVariantCovers(false)
                setShowUpdateButton(true)
            }
        } else if (optionName === "includePrintings" || optionName === "includeVariantCovers") {
            setter(isChecked)
            setShowUpdateButton(true)
        } else {
            if (isChecked) {
                setter(true)
                setShowUpdateButton(true)
            } else if (isNotLastCheckedOption()) {
                setter(false)
                setShowUpdateButton(true)
            }
        }
    }

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else if (!data) return <></>
    else
        return (
            <div className="flex flex-col">
                <h3 className="font-semibold text-gray-50 m-2 mb-1 mt-3 border-b-2 border-gray-300">
                    Formats to Include
                </h3>
                <SubscribeOptionsItem
                    label="Single Issue Comics"
                    value={includeSingleIssues}
                    disabled={includeAll}
                    onChange={(e) =>
                        handleOptionCheck(e, "includeSingleIssues", setIncludeSingleIssues)
                    }
                />

                {includeSingleIssues && (
                    <>
                        <SubscribeOptionsItem
                            className="ml-10"
                            label="Additional Printings"
                            value={includePrintings}
                            disabled={includeAll || !includeSingleIssues}
                            onChange={(e) =>
                                handleOptionCheck(e, "includePrintings", setIncludePrintings)
                            }
                        />

                        <SubscribeOptionsItem
                            className="ml-10"
                            label="Variants Covers"
                            value={includeVariantCovers}
                            disabled={includeAll || !includeSingleIssues}
                            onChange={(e) =>
                                handleOptionCheck(
                                    e,
                                    "includeVariantCovers",
                                    setIncludeVariantCovers
                                )
                            }
                        />
                    </>
                )}

                <SubscribeOptionsItem
                    label="Trade Paperbacks"
                    value={includeTPBs}
                    disabled={includeAll}
                    onChange={(e) => handleOptionCheck(e, "includeTPBs", setIncludeTPBs)}
                />

                <SubscribeOptionsItem
                    label="Hardcovers"
                    value={includeHardcovers}
                    disabled={includeAll}
                    onChange={(e) =>
                        handleOptionCheck(e, "includeHardcovers", setIncludeHardcovers)
                    }
                />

                <SubscribeOptionsItem
                    label="Omnibuses"
                    value={includeOmnibuses}
                    disabled={includeAll}
                    onChange={(e) => handleOptionCheck(e, "includeOmnibuses", setIncludeOmnibuses)}
                />

                <SubscribeOptionsItem
                    label="Compendia"
                    value={includeCompendia}
                    disabled={includeAll}
                    onChange={(e) => handleOptionCheck(e, "includeCompendia", setIncludeCompendia)}
                />

                <SubscribeOptionsItem
                    label={"All"}
                    value={includeAll}
                    onChange={(e) => handleOptionCheck(e, "includeAll", setIncludeAll)}
                />

                {showUpdateButton && (
                    <Button
                        roundedClass="rounded-lg"
                        className="m-3 ml-auto self-end"
                        onClick={() => {
                            const updatedDetails = { ...data }

                            updatedDetails.includeSingleIssues = includeSingleIssues
                            updatedDetails.includePrintings = includePrintings
                            updatedDetails.includeVariantCovers = includeVariantCovers
                            updatedDetails.includeTPBs = includeTPBs
                            updatedDetails.includeHardcovers = includeHardcovers
                            updatedDetails.includeOmnibuses = includeOmnibuses
                            updatedDetails.includeCompendia = includeCompendia
                            updatedDetails.includeAll = includeAll

                            updatePullListDetails.mutate(updatedDetails)
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
