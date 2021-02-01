import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

export function useToggleComicInList(comicID, lists) {
    const queryClient = useQueryClient()

    return useMutation(
        (data) =>
            axios.put(`/api/comics/${comicID}/lists/${data.listID}`, {
                isComicInList: data.isComicInList,
            }),
        {
            onSuccess: (res) => {
                console.log(res)
                const index = lists.findIndex((list) => list.id === parseInt(res.data.id))
                lists[index].isComicInList = res.data.action === "add" ? true : false
                queryClient.setQueryData(["user-comic-lists", comicID], lists)
            },
        }
    )
}
