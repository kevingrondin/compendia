import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import { useQueryClient } from "react-query"
import { format } from "date-fns"
import { formatDateStringForView } from "@util/date"
import { Button } from "@components/common/buttons/Button"
import { EditIcon } from "@icons/Edit"
import { useCollectedComic } from "@hooks/queries/collection"
import { useUpdateCollectionFields } from "@hooks/mutations/collection"

const CollectionDetail = ({ isEditMode, field, label, children }) => (
    <label className="flex flex-col sm:pr-10 pb-5">
        <span className="font-bold pb-2">{label}</span>
        {isEditMode ? (
            children
        ) : (
            <div className={`text-left sm:text-center ${!field ? "font-bold text-2xl" : ""}`}>
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

//TODO refactor this to be simpler and easier to read
export function CollectionDetails({ comicID }) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    const [editDateCollected, setEditDateCollected] = useState()
    const [editPurchasePrice, setEditPurchasePrice] = useState()
    const [editBoughtAt, setEditBoughtAt] = useState()
    const [editCondition, setEditCondition] = useState()
    const [editQuantity, setEditQuantity] = useState()
    const [editNotes, setEditNotes] = useState()

    const queryClient = useQueryClient()
    const { isLoading, isError, data } = useCollectedComic(comicID)
    const collectionDetailsMutation = useUpdateCollectionFields(comicID, setIsEditMode)

    useEffect(() => {
        queryClient.refetchQueries(["collected-comic-detail", comicID])
    }, [])

    useEffect(() => {
        if (!isLoading && !isError && data) resetCollectionFields()
    }, [data])

    useEffect(() => {
        if (!isLoading && !isError && data) {
            if (
                editDateCollected !== data.dateCollected ||
                editPurchasePrice !== data.purchasePrice ||
                editBoughtAt !== data.boughtAt ||
                editCondition !== data.condition ||
                editQuantity !== data.quantity ||
                editNotes !== data.notes
            ) {
                setShowUpdateButton(true)
            } else {
                setShowUpdateButton(false)
            }
        }
    }, [
        data,
        editDateCollected,
        editPurchasePrice,
        editBoughtAt,
        editCondition,
        editQuantity,
        editNotes,
    ])

    const resetCollectionFields = () => {
        setEditDateCollected(data.dateCollected)
        setEditPurchasePrice(data.purchasePrice)
        setEditBoughtAt(data.boughtAt)
        setEditCondition(data.condition)
        setEditQuantity(data.quantity)
        setEditNotes(data.notes)
    }

    return (
        <div>
            <div className="flex items-center">
                <h2 className="font-bold text-2xl mb-3">Collection Details</h2>

                {!isEditMode && <EditIcon onClick={() => setIsEditMode(true)} />}
            </div>

            <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row">
                    <CollectionDetail
                        isEditMode={isEditMode}
                        field={formatDateStringForView(editDateCollected)}
                        label="Collected"
                    >
                        <input
                            className="rounded-xl border-2"
                            type="date"
                            value={editDateCollected}
                            onChange={(e) => {
                                setEditDateCollected(e.target.value)
                            }}
                        />
                    </CollectionDetail>

                    <CollectionDetail
                        isEditMode={isEditMode}
                        field={editCondition}
                        label="Condition"
                    >
                        <select
                            className="rounded-xl border-2"
                            value={editCondition}
                            onChange={(e) => {
                                setEditCondition(e.target.value)
                            }}
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
                            value={editQuantity}
                            onChange={(e) => {
                                setEditQuantity(e.target.value)
                            }}
                        />
                    </CollectionDetail>
                </div>

                <div className="flex flex-col sm:flex-row">
                    <CollectionDetail
                        isEditMode={isEditMode}
                        field={editPurchasePrice}
                        label="Price"
                    >
                        <input
                            className="w-28 rounded-xl border-2"
                            type="text"
                            maxLength="10"
                            value={editPurchasePrice}
                            onChange={(e) => {
                                setEditPurchasePrice(e.target.value)
                            }}
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
                            value={editBoughtAt}
                            onChange={(e) => {
                                setEditBoughtAt(e.target.value)
                            }}
                        />
                    </CollectionDetail>
                </div>
            </div>

            <label className="flex flex-col max-w-md pr-10 pb-5">
                <span className="font-bold pb-2">Notes</span>
                {isEditMode ? (
                    <textarea
                        className="rounded-xl rounded-br-none border-2"
                        value={editNotes}
                        maxLength="2000"
                        rows="3"
                        onChange={(e) => {
                            setEditNotes(e.target.value)
                        }}
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
                        {showUpdateButton && (
                            <Button
                                className="self-center mr-4"
                                onClick={() => {
                                    const dateParts =
                                        editDateCollected && editDateCollected.split("-")

                                    collectionDetailsMutation.mutate({
                                        dateCollected: editDateCollected
                                            ? format(
                                                  new Date(
                                                      dateParts[0],
                                                      dateParts[1] - 1,
                                                      dateParts[2]
                                                  ),
                                                  "yyyy-MM-dd"
                                              )
                                            : "",
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
                        )}

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
