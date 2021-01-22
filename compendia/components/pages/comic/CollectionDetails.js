import { useState, useEffect } from "react"
import { useMutation, useQueryClient, useQuery } from "react-query"
import PropTypes from "prop-types"
import { format } from "date-fns"
import axios from "axios"

import { formatDateStringForView } from "../../../util/date"

import Button from "../../buttons/Button"
import EditIcon from "../../icons/Edit"

const CollectionDetail = ({ isEditMode, field, label, children }) => (
    <label className="flex flex-col pr-10 pb-5">
        <span className="font-bold pb-2">{label}</span>
        {isEditMode ? (
            children
        ) : (
            <div className={`text-center ${!field && "font-bold text-2xl"}`}>
                {field ? field : "-"}
            </div>
        )}
    </label>
)

CollectionDetail.propTypes = {
    isEditMode: PropTypes.bool.isRequired,
    field: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}

function useCollectedComicDetail(id) {
    return useQuery(
        ["collected-comic-detail", id],
        async () => {
            const { data } = await axios.get(`/api/collection/comics/${id}`)
            return data
        },
        { staleTime: Infinity }
    )
}

export default function CollectionDetails({ comicID }) {
    const queryClient = useQueryClient()
    const { isLoading, isError, data } = useCollectedComicDetail(comicID)

    const [isEditMode, setIsEditMode] = useState(false)
    const [editDateCollected, setEditDateCollected] = useState()
    const [editPurchasePrice, setEditPurchasePrice] = useState()
    const [editBoughtAt, setEditBoughtAt] = useState()
    const [editCondition, setEditCondition] = useState()
    const [editQuantity, setEditQuantity] = useState()
    const [editNotes, setEditNotes] = useState()

    useEffect(() => {
        if (!isLoading && !isError && data) resetCollectionFields()
    }, [data])

    const resetCollectionFields = () => {
        setEditDateCollected(data.dateCollected)
        setEditPurchasePrice(data.purchasePrice)
        setEditBoughtAt(data.boughtAt)
        setEditCondition(data.condition)
        setEditQuantity(data.quantity)
        setEditNotes(data.notes)
    }

    const updateCollectionFields = useMutation(
        (data) => axios.put(`/api/collection/comics/${comicID}`, data),
        {
            onSuccess: (res) => {
                setIsEditMode(false)
                queryClient.setQueryData(["collected-comic-detail", comicID], { ...res.data })
            },
        }
    )

    return (
        <div>
            <div className="flex items-center">
                <h2 className="font-bold text-2xl mb-3">Collection Details</h2>

                {!isEditMode && <EditIcon onClick={() => setIsEditMode(true)} />}
            </div>

            <div className="flex flex-wrap">
                <div className="flex">
                    <CollectionDetail
                        isEditMode={isEditMode}
                        field={formatDateStringForView(editDateCollected)}
                        label="Collected"
                    >
                        <input
                            className="rounded-xl border-2"
                            type="date"
                            value={editDateCollected || ""}
                            onChange={(e) => setEditDateCollected(e.target.value)}
                        />
                    </CollectionDetail>

                    <CollectionDetail
                        isEditMode={isEditMode}
                        field={editCondition}
                        label="Condition"
                    >
                        <select
                            className="rounded-xl border-2"
                            value={editCondition || ""}
                            onChange={(e) => setEditCondition(e.target.value)}
                        >
                            <option value="">- Select -</option>
                            <option value="Near Mint">Near Mint</option>
                            <option value="Very Fine">Very Fine</option>
                            <option value="Fine">Fine</option>
                            <option value="Very Good">Very Good</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Poor">Poor</option>
                        </select>
                    </CollectionDetail>

                    <CollectionDetail isEditMode={isEditMode} field={editQuantity} label="Quantity">
                        <input
                            className="w-20 rounded-xl border-2"
                            type="number"
                            min="1"
                            max="999"
                            value={editQuantity || ""}
                            onChange={(e) => setEditQuantity(e.target.value)}
                        />
                    </CollectionDetail>
                </div>

                <div className="flex">
                    <CollectionDetail
                        isEditMode={isEditMode}
                        field={editPurchasePrice}
                        label="Price"
                    >
                        <input
                            className="w-28 rounded-xl border-2"
                            type="text"
                            maxLength="10"
                            value={editPurchasePrice || ""}
                            onChange={(e) => setEditPurchasePrice(e.target.value)}
                        />
                    </CollectionDetail>

                    <CollectionDetail
                        isEditMode={isEditMode}
                        field={editBoughtAt}
                        label="Bought At"
                    >
                        <input
                            className="rounded-xl border-2"
                            type="text"
                            maxLength="50"
                            value={editBoughtAt || ""}
                            onChange={(e) => setEditBoughtAt(e.target.value)}
                        />
                    </CollectionDetail>
                </div>
            </div>

            <label className="flex flex-col max-w-md pr-10 pb-5">
                <span className="font-bold pb-2">Notes</span>
                {isEditMode ? (
                    <textarea
                        className="rounded-xl rounded-br-none border-2"
                        value={editNotes || ""}
                        maxLength="2000"
                        rows="3"
                        onChange={(e) => setEditNotes(e.target.value)}
                    />
                ) : (
                    <div className={` ${!editNotes && "font-bold text-2xl"}`}>
                        {editNotes ? editNotes : "-"}
                    </div>
                )}
            </label>

            {isEditMode && (
                <>
                    <div className="flex justify-end items-end">
                        <Button
                            className="self-center mr-4"
                            onClick={() => {
                                const dateParts = editDateCollected.split("-")

                                updateCollectionFields.mutate({
                                    dateCollected: format(
                                        new Date(dateParts[0], dateParts[1] - 1, dateParts[2]),
                                        "yyyy-MM-dd"
                                    ),
                                    purchasePrice: editPurchasePrice,
                                    boughtAt: editBoughtAt,
                                    condition: editCondition,
                                    quantity: editQuantity,
                                    notes: editNotes,
                                })
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            className="self-center"
                            isSecondary={true}
                            onClick={() => {
                                setIsEditMode(false)
                                resetCollectionFields()
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

CollectionDetails.propTypes = {
    comicID: PropTypes.number.isRequired,
}
