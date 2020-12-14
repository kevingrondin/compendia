import ComicCover from "../ComicCover"
import axios from "axios"
import { useQuery } from "react-query"

function useAllReleases() {
    return useQuery("all-releases", async () => {
        const { data } = await axios.get("/api/releases?sortBy=publisher")
        return data
    })
}

export default function AllReleases() {
    const { status, error, data } = useAllReleases()

    return (
        <>
            {status === "loading" ? (
                <div>Loading...</div>
            ) : status === "error" ? (
                <div>Error: {error.message}</div>
            ) : (
                data.map((publisher) => (
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
                ))
            )}
        </>
    )
}
