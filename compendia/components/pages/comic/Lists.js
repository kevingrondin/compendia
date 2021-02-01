import PropTypes from "prop-types"
import { useComicLists } from "@hooks/queries/comic"
import { useToggleComicInList } from "@hooks/mutations/comic"

export function Lists({ comicID }) {
    const { status, error, data: lists } = useComicLists(comicID)
    const comicListMutation = useToggleComicInList(comicID, lists)

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
                                        onChange={() => {
                                            console.log(list.id, list.isComicInList)
                                            comicListMutation.mutate({
                                                listID: list.id,
                                                isComicInList: list.isComicInList,
                                            })
                                        }}
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
