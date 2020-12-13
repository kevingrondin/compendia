import { useEffect, useState } from "react"
import useRequest from "../../hooks/useRequest"
import ComicCover from "../ComicCover"

export default function PullList() {
    const [pullListRes, setPullListRes] = useState([])
    const [fetchedData] = useRequest("/api/pull-list", "Pull List", [])

    useEffect(() => {
        setPullListRes(fetchedData)
    }, [fetchedData])

    return (
        <>
            <div className="flex flex-row flex-wrap mt-10">
                {pullListRes.data &&
                    !pullListRes.loading &&
                    !pullListRes.error &&
                    pullListRes.data.map((comic, index) => (
                        <ComicCover key={comic.id} comic={comic} index={index} />
                    ))}
            </div>
        </>
    )
}
