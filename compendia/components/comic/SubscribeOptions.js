import PropTypes from "prop-types"
import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import Button from "../utils/Button"

const SubscribeOptionsItem = ({ label, value, disabled, onChange }) => {
    return (
        <label className={`flex items-center m-2 whitespace-nowrap`}>
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
}

const getPullListSeries = (seriesID) =>
    useQuery(
        ["pull-list-series", seriesID],
        async () => {
            const { data } = await axios.get(`/api/collection/pull-list/series/${seriesID}`)
            return data
        },
        { staleTime: Infinity }
    )

export default function SubscribeOptions({ seriesID }) {
    const queryClient = useQueryClient()
    const { isLoading, isError, error, data } = getPullListSeries(seriesID)
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    const [includeStandard, setIncludeStandard] = useState(data.includeStandard)
    const [includeVariants, setIncludeVariants] = useState(data.includeVariants)
    const [includeTPB, setIncludeTPB] = useState(data.includeTPB)
    const [includeCollections, setIncludeCollections] = useState(data.includeCollections)
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
        return () => {
            setIncludeStandard(data.includeStandard)
            setIncludeVariants(data.includeVariants)
            setIncludeTPB(data.includeTPB)
            setIncludeCollections(data.includeCollections)
            setIncludeAll(data.includeAll)
            setShowUpdateButton(false)
        }
    }, [])

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else if (!data) return <></>
    else
        return (
            <div className="flex flex-col">
                <SubscribeOptionsItem
                    label="Include Standard Issues"
                    value={includeStandard}
                    disabled={includeAll}
                    onChange={(e) => {
                        setIncludeStandard(e.target.checked)
                        setShowUpdateButton(true)
                    }}
                />

                <SubscribeOptionsItem
                    label="Include Variants"
                    value={includeVariants}
                    disabled={includeAll}
                    onChange={(e) => {
                        setIncludeVariants(e.target.checked)
                        setShowUpdateButton(true)
                    }}
                />

                <SubscribeOptionsItem
                    label="Include Trade Paperbacks"
                    value={includeTPB}
                    disabled={includeAll}
                    onChange={(e) => {
                        setIncludeTPB(e.target.checked)
                        setShowUpdateButton(true)
                    }}
                />

                <SubscribeOptionsItem
                    label="Include Collections"
                    value={includeCollections}
                    disabled={includeAll}
                    onChange={(e) => {
                        setIncludeCollections(e.target.checked)
                        setShowUpdateButton(true)
                    }}
                />

                <SubscribeOptionsItem
                    label={"Include All"}
                    value={includeAll}
                    onChange={(e) => {
                        const isChecked = e.target.checked

                        if (isChecked) {
                            setIncludeStandard(true)
                            setIncludeVariants(true)
                            setIncludeTPB(true)
                            setIncludeCollections(true)
                            setIncludeAll(true)
                        } else setIncludeAll(false)

                        setShowUpdateButton(true)
                    }}
                />

                {showUpdateButton && (
                    <Button
                        roundedClass="rounded-lg"
                        className="m-3 ml-auto self-end"
                        onClick={() => {
                            const updatedDetails = { ...data }

                            updatedDetails.includeStandard = includeStandard
                            updatedDetails.includeVariants = includeVariants
                            updatedDetails.includeTPB = includeTPB
                            updatedDetails.includeCollections = includeCollections
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
}
