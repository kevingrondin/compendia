import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { format } from "date-fns"
import axios from "axios"
import Button from "../utils/Button"

function CollectionItem({ children, isEditMode, field, label }) {
    return (
        <label className="flex flex-col pr-10 pb-5">
            <span className="font-bold">{label}</span>
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

export default function CollectionDetails({ comic }) {
    const queryClient = useQueryClient()
    const [isEditMode, setIsEditMode] = useState(false)

    const [editDateCollected, setEditDateCollected] = useState(comic.dateCollected)
    const [editPurchasePrice, setEditPurchasePrice] = useState(comic.purchasePrice)
    const [editBoughtAt, setEditBoughtAt] = useState(comic.boughtAt)
    const [editCondition, setEditCondition] = useState(comic.condition)
    const [editQuantity, setEditQuantity] = useState(comic.quantity)
    const [editNotes, setEditNotes] = useState(comic.notes)

    const resetCollectionFields = () => {
        setIsEditMode(false)
        setEditDateCollected(comic.dateCollected)
        setEditPurchasePrice(comic.purchasePrice)
        setEditBoughtAt(comic.boughtAt)
        setEditCondition(comic.condition)
        setEditQuantity(comic.quantity)
        setEditNotes(comic.notes)
    }

    const updateCollectionFields = useMutation(
        () =>
            axios.put(`/api/collection/comics/${comic.id}`, {
                dateCollected: editDateCollected,
                purchasePrice: editPurchasePrice,
                boughtAt: editBoughtAt,
                condition: editCondition,
                quantity: editQuantity,
                notes: editNotes,
            }),
        {
            onSuccess: (res) => {
                const newComic = { ...comic }
                newComic.dateCollected = res.data.dateCollected
                newComic.purchasePrice = res.data.purchasePrice
                newComic.boughtAt = res.data.boughtAt
                newComic.condition = res.data.condition
                newComic.quantity = res.data.quantity
                newComic.notes = res.data.notes
                queryClient.setQueryData(["comic-detail", comic.id], newComic)
            },
        }
    )

    if (!comic.isCollected) return <></>
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

                    <form>
                        <article className="flex flex-wrap">
                            <CollectionItem
                                isEditMode={isEditMode}
                                field={editDateCollected}
                                label="Date Collected"
                            >
                                <input
                                    type="date"
                                    value={editDateCollected || ""}
                                    onChange={(e) =>
                                        setEditDateCollected(
                                            format(new Date(e.target.value), "yyyy-MM-dd")
                                        )
                                    }
                                />
                            </CollectionItem>

                            <CollectionItem
                                isEditMode={isEditMode}
                                field={editPurchasePrice}
                                label="Purchase Price"
                            >
                                <input
                                    className="w-28"
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
                                    value={editCondition || ""}
                                    onChange={(e) => setEditCondition(e.target.value)}
                                >
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
                                    className="w-20"
                                    type="number"
                                    min="1"
                                    max="999"
                                    value={editQuantity || ""}
                                    onChange={(e) => setEditQuantity(e.target.value)}
                                />
                            </CollectionItem>

                            <CollectionItem isEditMode={isEditMode} field={editNotes} label="Notes">
                                <textarea
                                    value={editNotes || ""}
                                    maxLength="2000"
                                    onChange={(e) => setEditNotes(e.target.value)}
                                />
                            </CollectionItem>
                        </article>

                        {isEditMode && (
                            <div className="flex justify-end items-end">
                                <Button
                                    className="self-center mr-4"
                                    onClick={() => updateCollectionFields.mutate()}
                                >
                                    Update
                                </Button>{" "}
                                <Button
                                    className="self-center"
                                    isSecondary={true}
                                    onClick={resetCollectionFields}
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </>
        )
}
