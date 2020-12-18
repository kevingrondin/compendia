import { useRouter } from "next/router"
import Page from "../../components/Page"
import { useQuery } from "react-query"
import axios from "axios"

function useComicDetail(id) {
    return useQuery(`comic-detail-${id}`, async () => {
        const { data } = await axios.get(`/api/comics/${id}`)
        return data
    })
}

function ComicDetail({ itemName, item }) {
    return (
        <div className="pr-14">
            <p className="text-gray-900 font-extrabold text-lg">{itemName}</p>
            <p>{item}</p>
        </div>
    )
}

export default function Comic() {
    const router = useRouter()
    const { id } = router.query
    const { status, error, data: comic } = useComicDetail(id)

    return (
        <>
            {status === "loading" ? (
                <div>Loading...</div>
            ) : status === "error" ? (
                <div>Error: {error.message}</div>
            ) : (
                <Page title={`${comic.series.name} ${comic.title} - ${comic.publisher.name}`}>
                    <div className="flex justify-center">
                        <img
                            src={comic.cover}
                            alt={`Cover art for ${comic.title}`}
                            className="rounded h-96"
                        />
                        <article className="w-2/5 ml-10 mt-5">
                            <h2 className="font-bold text-3xl">{`${comic.series.name} ${comic.title}`}</h2>
                            <p className="italic text-xl">{comic.publisher.name}</p>

                            <div className="flex py-6">
                                <ComicDetail itemName="Price" item={comic.coverPrice} />
                                <ComicDetail itemName="Released" item={comic.releaseDate} />
                                <ComicDetail itemName="Format" item={comic.format} />
                                <ComicDetail itemName="Rating" item={comic.rating} />
                            </div>

                            {comic.description ? (
                                <p>{comic.description}</p>
                            ) : (
                                <p className="text-gray-600 text-xl">No Description...</p>
                            )}
                        </article>
                    </div>
                </Page>
            )}
        </>
    )
}
