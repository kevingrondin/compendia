import { useState, useEffect } from "react"
import useRequest from "../../hooks/useRequest"
import ComicCover from "../ComicCover"

export default function AllReleases() {
    const [allReleasesRes, setAllReleasesRes] = useState([])
    const [fetchedData] = useRequest("/api/releases?sortBy=publisher", "All Releases", [])

    useEffect(() => {
        setAllReleasesRes(fetchedData)
    }, [fetchedData])

    return (
        <>
            {allReleasesRes.data &&
                !allReleasesRes.loading &&
                !allReleasesRes.error &&
                allReleasesRes.data.map((publisher) => (
                    <section className="mt-5" key={publisher.id}>
                        <h3 className="text-2xl text-blue-primary-200 bg-blue-100 font-bold mb-5 w-min py-1 px-2 whitespace-nowrap">
                            {publisher.name}
                        </h3>
                        <div className="flex flex-row flex-wrap">
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
