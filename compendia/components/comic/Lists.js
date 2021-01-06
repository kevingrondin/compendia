import { useQuery } from "react-query"
import axios from "axios"

function useComicLists(id) {
    return useQuery(`user-comic-lists`, async () => {
        const { data } = await axios.get(`/api/lists?comicId=${id}`)
        return data
    })
}

export default function Lists({ comicId }) {
    const { status, error, data } = useComicLists(comicId)

    function toggleIsInList(isInList, listId) {
        const listEdit = data.find((list) => list._id === listId)

        console.log(listEdit)

        listEdit.isComicInList = isInList

        console.log(listEdit)
    }

    return (
        <div>
            <h2 className="font-bold text-2xl">Lists</h2>
            <ul className="flex flex-col">
                {data &&
                    data.map((list) => {
                        return (
                            <li key={list._id}>
                                <label className="inline-flex items-center mt-3">
                                    <input
                                        type="checkbox"
                                        onClick={() =>
                                            toggleIsInList(!list.isComicInList, list._id)
                                        }
                                        className="form-checkbox h-5 w-5 text-red-600"
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
