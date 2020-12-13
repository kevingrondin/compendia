import { useReducer, useEffect } from "react"

function requestReducer(state, value) {
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

export default function useRequest(endpoint, dataType = "request data", dependencies) {
    const [state, dispatch] = useReducer(requestReducer, {
        data: null,
        loading: true,
        error: null,
    })

    useEffect(() => {
        dispatch({ action: "loading" })

        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => dispatch({ action: "success", data }))
            .catch((e) => {
                console.warn(e)
                dispatch({
                    action: "error",
                    error: `Something went wrong retrieving the ${dataType} results...`,
                })
            })
    }, dependencies)

    return [state]
}
