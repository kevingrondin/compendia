import ComicCover from "../ComicCover"
import axios from "axios"
import { useQuery } from "react-query"
import { format } from "date-fns"

function useAllReleases(comicDay) {
    return useQuery(
        ["all-releases", format(comicDay, "MM-dd-yyyy")],
        async () => {
            const { data } = await axios.get(
                `/api/releases?comicDay=${format(comicDay, "MM-dd-yyyy")}`
            )
            return data
        },
        { staleTime: 600000 }
    )
}

export default function AllReleases({ comicDay }) {
    const { status, error, data } = useAllReleases(comicDay)

    return (
        <>
            {status === "loading" ? (
                <div>Loading...</div>
            ) : status === "error" ? (
                <div>Error: {error.message}</div>
            ) : (
                data.map((publisher) => (
                    <section className="mt-10" key={publisher.id}>
                        <h3 className="text-2xl text-blue-primary-200 bg-blue-100 font-bold mb-5 w-min py-1 px-2 whitespace-nowrap">
                            {publisher.name}
                        </h3>
                        <div className="flex flex-wrap">
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
