import { useReducer, useEffect } from "react"
import ComicCover from "../ComicCover"

function newReleasesReducer(state, value) {
    if (value.action === "loading") {
        return {
            ...state,
            loading: true,
        }
    } else if (value.action === "success") {
        return {
            loading: false,
            newReleases: value.data,
            error: null,
        }
    } else if (value.action === "error") {
        return {
            ...state,
            loading: false,
            error: value.error,
        }
    } else {
        throw new Error("Unsupported action type")
    }
}

export default function AllReleases({ activeTab, newReleases }) {
    const [state, dispatch] = useReducer(newReleasesReducer, {
        newReleases: null,
        loading: true,
        error: null,
    })

    useEffect(() => {
        dispatch({ action: "loading" })

        fetch("/api/newReleases")
            .then((res) => res.json())
            .then((data) => dispatch({ action: "success", data }))
            .catch((e) => {
                console.warn(e)
                dispatch({
                    action: "error",
                    error: "Something went wrong retrieving the New Releases...",
                })
            })
    }, [])

    {
        if (activeTab === "all releases")
            return (
                <div className="flex flex-row">
                    {state.newReleases.map((comic, index) => (
                        <ComicCover key={comic.id} comic={comic} index={index} />
                    ))}
                </div>
            )
        else return null
    }
}
