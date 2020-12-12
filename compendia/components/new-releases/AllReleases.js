import { useReducer, useEffect } from "react"
import ComicCover from "../ComicCover"

function releasesReducer(state, value) {
    if (value.action === "loading") {
        return {
            ...state,
            loading: true,
        }
    } else if (value.action === "success") {
        return {
            loading: false,
            data: value.data,
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

export default function AllReleases() {
    const [state, dispatch] = useReducer(releasesReducer, {
        data: null,
        loading: true,
        error: null,
    })

    useEffect(() => {
        dispatch({ action: "loading" })

        fetch("/api/releases?sortBy=publisher")
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

    return (
        <>
            {state.data &&
                !state.loading &&
                !state.error &&
                state.data.map((publisher) => (
                    <section className="mt-5" key={publisher.id}>
                        <h3 className="text-2xl text-blue-primaryDark bg-blue-100 font-bold mb-5 w-min py-1 px-2 whitespace-nowrap">
                            {publisher.name}
                        </h3>
                        <div className="flex flex-row">
                            {publisher.releases &&
                                publisher.releases.map((comic, index) => (
                                    <ComicCover key={comic.id} comic={comic} index={index} />
                                ))}
                        </div>
                    </section>
                ))}
        </>
    )
}
