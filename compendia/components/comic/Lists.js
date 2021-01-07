import { useQuery, useQueryClient, useMutation } from "react-query"
import axios from "axios"

function useComicLists(id) {
    return useQuery(`user-comic-lists`, async () => {
        const { data } = await axios.get(`/api/lists?comicId=${id}`)
        return data
    })
}

export default function Lists({ comicId }) {
    const queryClient = useQueryClient()
    const { status, error, data } = useComicLists(comicId)

    const mutation = useMutation(
        (edit) =>
            axios.put(`/api/lists/${edit.list._id}?comicId=${edit.comicId}`, {
                ...edit.list,
            }),
        {
            onSuccess: (updatedList) => {
                const newLists = data.filter((list) => list._id !== updatedList.data._id)
                newLists.push(updatedList.data)

                function compare(a, b) {
                    if (a.name < b.name) return -1
                    else if (a.name > b.name) return 1
                    else return 0
                }

                queryClient.setQueryData("user-comic-lists", newLists.sort(compare))
            },
        }
    )

    return (
        <div className="mt-5">
            <h2 className="font-bold text-2xl">Lists</h2>
            <ul className="flex flex-col">
                {data &&
                    data.map((list) => {
                        return (
                            <li key={list._id}>
                                <label className="inline-flex items-center mt-3">
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            mutation.mutate({
                                                list: {
                                                    ...list,
                                                    isComicInList: list.isComicInList,
                                                },
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
