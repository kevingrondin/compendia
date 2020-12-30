import { useRouter } from "next/router"
import Page from "../../components/Page"
import { useQuery } from "react-query"
import axios from "axios"
import Link from "next/link"
import Arrow from "../../components/utils/Arrow"
import Lists from "../../components/comic/Lists"

const lists = ["Read", "Want", "Favorites"]

function useComicDetail(id) {
    return useQuery(`comic-detail-${id}`, async () => {
        const { data } = await axios.get(`/api/comics/${id}`)
        return data
    })
}

function ComicDetail({ itemName, item }) {
    return (
        <div className="px-6 py-2 flex flex-col items-center">
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
                    <div className="flex flex-wrap justify-center">
                        <img
                            src={comic.cover}
                            alt={`Cover art for ${comic.title}`}
                            className="rounded h-72 lg:h-96"
                        />
                        <article className="mt-8 sm:ml-6 sm:mt-6">
                            <h2 className="font-bold text-3xl text-center sm:text-left">{`${comic.series.name} ${comic.title}`}</h2>
                            <div className="flex flex-col items-center pt-1 sm:items-start">
                                <p className="italic text-xl mr-2 mb-1">{comic.publisher.name}</p>

                                {comic.versions > 1 && (
                                    <Link href={`/comics/${comic.id}/versions`} passHref>
                                        <a className="flex items-center w-min whitespace-nowrap text-gray-800 font-bold text-md">
                                            <span>{`${comic.versions - 1} Other Version${
                                                comic.versions > 2 ? "s" : ""
                                            }`}</span>
                                            <Arrow
                                                colorClass="text-blue-primary-200"
                                                className="pl-1"
                                                pixelHeight="16px"
                                            />
                                        </a>
                                    </Link>
                                )}
                            </div>

                            <div className="flex flex-wrap justify-center py-5 sm:pt-2 ">
                                <ComicDetail itemName="Price" item={comic.coverPrice} />
                                <ComicDetail itemName="Released" item={comic.releaseDate} />
                                <ComicDetail itemName="Format" item={comic.format} />
                                <ComicDetail itemName="Rating" item={comic.rating} />
                            </div>
                        </article>
                        {comic.description ? (
                            <p className="m-4 max-w-md">{comic.description}</p>
                        ) : (
                            <p className="text-gray-600 text-xl m-4">No Description...</p>
                        )}
                        <Lists lists={lists} />
                    </div>
                </Page>
            )}
        </>
    )
}
