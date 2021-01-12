import { useState, useEffect } from "react"
import { useMutation, useQueryClient, useQuery } from "react-query"
import { format } from "date-fns"
import axios from "axios"
import { formatDateStringForView } from "../../util/date"
import Button from "../utils/Button"

function CollectionItem({ children, isEditMode, field, label }) {
    return (
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
}

function useCollectedComicDetail(id) {
    return useQuery(["collected-comic-detail", id], async () => {
        const { data } = await axios.get(`/api/collection/comics/${id}`)
        return data
    })
}

export default function CollectionDetails({ comicID, isCollected }) {
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

    if (!isCollected) return <></>
    else
        return (
            <>
                <div className="inline">
                    <div className="flex items-center">
                        <h2 className="font-bold text-2xl mb-3">Collection Details</h2>
                        {!isEditMode && (
                            <img
                                className="ml-3 mb-2 cursor-pointer"
                                src="/edit-black.svg"
                                alt="Edit collection details"
                                onClick={() => setIsEditMode(true)}
                            />
                        )}
                    </div>

                    <article className="flex flex-wrap">
                        <CollectionItem
                            isEditMode={isEditMode}
                            field={formatDateStringForView(editDateCollected)}
                            label="Date Collected"
                        >
                            {" "}
                            <input
                                className="rounded-xl border-2"
                                type="date"
                                value={editDateCollected || ""}
                                onChange={(e) => setEditDateCollected(e.target.value)}
                            />
                        </CollectionItem>

                        <CollectionItem
                            isEditMode={isEditMode}
                            field={editPurchasePrice}
                            label="Purchase Price"
                        >
                            <input
                                className="w-28 rounded-xl border-2"
                                type="text"
                                maxLength="10"
                                value={editPurchasePrice || ""}
                                onChange={(e) => setEditPurchasePrice(e.target.value)}
                            />
                        </CollectionItem>

                        <CollectionItem
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
                        </CollectionItem>

                        <CollectionItem
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
                        </CollectionItem>

                        <CollectionItem
                            isEditMode={isEditMode}
                            field={editQuantity}
                            label="Quantity"
                        >
                            <input
                                className="w-20 rounded-xl border-2"
                                type="number"
                                min="1"
                                max="999"
                                value={editQuantity || ""}
                                onChange={(e) => setEditQuantity(e.target.value)}
                            />
                        </CollectionItem>
                    </article>

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
                            </Button>{" "}
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
                    )}
                </div>
            </>
        )
}
