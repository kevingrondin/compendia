import PropTypes from "prop-types"
import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from "axios"

const radioClass = "form-radio h-5 w-5 mr-1 text-blue-primary-200 "
const checkboxClass = "form-checkbox h-5 w-5 mr-1 text-blue-primary-200 "
const labelClass = "flex items-center m-2 whitespace-nowrap "

const getPullListSeries = (seriesID) =>
    useQuery(
        ["pull_list_series_details", seriesID],
        async () => {
            const { data } = await axios.get(`/api/collection/pull-list/series/${seriesID}`)
            return data
        },
        { staleTime: Infinity }
    )

export default function SubscribeOptions({ seriesID }) {
    const queryClient = useQueryClient()
    const { isLoading, isError, error, data } = getPullListSeries(seriesID)

    const updatePullListDetails = useMutation(
        (details) => axios.put(`/api/collection/pull-list/series/${seriesID}`, details),
        {
            onSuccess: (updatedDetails) => {
                queryClient.setQueryData(
                    ["pull_list_series_details", seriesID],
                    updatedDetails.data
                )
            },
        }
    )

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else if (!data) return <></>
    else
        return (
            <div className="flex flex-col bg-gray-500 text-white absolute left-3/4 transform -translate-x-2/3 top-11">
                <label className={labelClass}>
                    <input
                        type="checkbox"
                        className={checkboxClass + data.includeAll === true && "text-gray-500"}
                        defaultChecked={data.includeStandard}
                        disabled={data.includeAll}
                        onChange={(event) => {
                            const update = { ...data }
                            update.includeStandard = event.target.checked
                            updatePullListDetails.mutate(update)
                        }}
                    />
                    Standard Issues
                </label>

                <label className={labelClass}>
                    <input
                        type="checkbox"
                        className={checkboxClass + data.includeAll === true && "text-gray-500"}
                        defaultChecked={data.includeVariants}
                        onChange={(event) => {
                            const update = { ...data }
                            update.includeVariants = event.target.checked
                            updatePullListDetails.mutate(update)
                        }}
                    />
                    Variant Issues
                </label>

                <label className={labelClass}>
                    <input
                        type="checkbox"
                        className={checkboxClass + data.includeAll === true && "text-gray-500"}
                        defaultChecked={data.includeTPB}
                        onChange={(event) => {
                            const update = { ...data }
                            update.includeTPB = event.target.checked
                            updatePullListDetails.mutate(update)
                        }}
                    />
                    Trade Paperbacks
                </label>

                <label className={labelClass}>
                    <input
                        type="checkbox"
                        className={checkboxClass + data.includeAll === true && "text-gray-500"}
                        defaultChecked={data.includeCollections}
                        onChange={(event) => {
                            const update = { ...data }
                            update.includeCollections = event.target.checked
                            updatePullListDetails.mutate(update)
                        }}
                    />
                    Collected Editions
                </label>

                <label className={labelClass}>
                    <input
                        type="checkbox"
                        className={checkboxClass}
                        defaultChecked={data.includeAll}
                        onChange={(event) => {
                            const update = { ...data }

                            update.includeAll = event.target.checked

                            if (update.includeAll === true) {
                                update.includeStandard = true
                                update.includeVariants = true
                                update.includeTPB = true
                                update.includeCollections = true
                            }

                            updatePullListDetails.mutate(update)
                        }}
                    />
                    All Releases
                </label>
            </div>
        )
}

SubscribeOptions.propTypes = {
    seriesID: PropTypes.number.isRequired,
}
