import { useQuery, useQueryClient, useMutation } from "react-query"
import axios from "axios"

function useComicLists(id) {
    return useQuery([`user-comic-lists`, id], async () => {
        const { data } = await axios.get(`/api/comics/${id}/lists`)
        return data
    })
}

export default function Lists({ comicId }) {
    const queryClient = useQueryClient()
    const { status, error, data: lists } = useComicLists(comicId)

    const toggleComicInList = useMutation(
        (edit) =>
            axios.put(`/api/comics/${edit.comicId}/lists/${edit.list.id}`, {
                isComicInList: edit.list.isComicInList,
            }),
        {
            onSuccess: (res) => {
                const index = lists.indexOf((list) => list.id === res.data.id)
                lists[index].isComicInList = res.data.id ? true : false
                queryClient.setQueryData(["user-comic-lists", comicId], lists)
            },
        }
    )

    return (
        <div className="mt-5">
            <h2 className="font-bold text-2xl">Lists</h2>
            <ul className="flex flex-col">
                {lists &&
                    lists.map((list) => {
                        return (
                            <li key={list.id}>
                                <label className="inline-flex items-center mt-3">
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            toggleComicInList.mutate({
                                                id: list.id,
                                                isComicInList: list.isComicInList,
                                                comicId: comicId,
                                            })
                                        }
                                        className="form-checkbox h-5 w-5 text-blue-primary-200"
                                        checked={list.isComicInList}
                                    />
                                    <span className="ml-2 text-gray-700">{list.name}</span>
                                </label>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
