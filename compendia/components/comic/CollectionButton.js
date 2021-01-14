import { useMutation, useQueryClient } from "react-query"
import axios from "axios"
import Button from "../utils/Button"

export default function CollectionButton({ comic }) {
    const queryClient = useQueryClient()

    const addToCollectionMutation = useMutation(
        () => axios.post(`/api/collection/comics/${comic.id}`),
        {
            onSuccess: () => {
                const updatedComic = { ...comic }
                updatedComic.isCollected = true
                queryClient.setQueryData(["comic-detail", comic.id], updatedComic)
            },
        }
    )

    const removeFromCollectionMutation = useMutation(
        () => axios.delete(`/api/collection/comics/${comic.id}`),
        {
            onSuccess: () => {
                const updatedComic = { ...comic }
                updatedComic.isCollected = false
                queryClient.setQueryData(["comic-detail", comic.id], updatedComic)
                queryClient.refetchQueries(["collected-comic-detail", comic.id])
            },
        }
    )

    return (
        <>
            {comic.isCollected ? (
                <Button
                    className="mb-8"
                    roundedClass="rounded-lg"
                    isSecondary={true}
                    onClick={() => {
                        removeFromCollectionMutation.mutate()
                    }}
                >
                    <span className="flex items-center">
                        <span>In Collection</span>
                        <img src="/check.svg" alt="Check" className="h-3 pl-2" />
                    </span>
                </Button>
            ) : (
                <Button
                    className="mt-3"
                    roundedClass="rounded-lg"
                    onClick={() => {
                        addToCollectionMutation.mutate()
                    }}
                >
                    Add to Collection
                </Button>
            )}
        </>
    )
}
