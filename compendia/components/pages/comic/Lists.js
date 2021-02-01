import PropTypes from "prop-types"
import axios from "axios"
import { useQueryClient, useMutation } from "react-query"
import { useComicLists } from "@hooks/queries/comic"

export function Lists({ comicID }) {
    const queryClient = useQueryClient()
    const { status, error, data: lists } = useComicLists(comicID)

    const toggleComicInList = useMutation(
        (edit) =>
            axios.put(`/api/comics/${edit.comicID}/lists/${edit.listID}`, {
                isComicInList: edit.isComicInList,
            }),
        {
            onSuccess: (res) => {
                const index = lists.findIndex((list) => list.id === parseInt(res.data.id))
                lists[index].isComicInList = res.data.action === "add" ? true : false
                queryClient.setQueryData(["user-comic-lists", comicID], lists)
            },
        }
    )

    return (
        <div className="pb-10 pr-10">
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
                                                listID: list.id,
                                                isComicInList: list.isComicInList,
                                                comicID: comicID,
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
Lists.propTypes = {
    comicID: PropTypes.number.isRequired,
}
