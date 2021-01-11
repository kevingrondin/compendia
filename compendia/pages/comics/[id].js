import { useRouter } from "next/router"
import Page from "../../components/Page"
import { useQuery, useMutation, useQueryClient } from "react-query"
import axios from "axios"
import { format } from "date-fns"
import Link from "next/link"
import Arrow from "../../components/utils/Arrow"
import Lists from "../../components/comic/Lists"
import Button from "../../components/utils/Button"
import { useState } from "react"
import FullScreenModal from "../../components/utils/FullScreenModal"

function useComicDetail(id) {
    return useQuery(["comic-detail", id], async () => {
        const { data } = await axios.get(`/api/comics/${id}`)
        if (data) console.log(data.releaseDate, typeof data.releaseDate)
        return data
    })
}

function ComicDetail({ itemName, item }) {
    return (
        <div className="px-6 py-2 flex flex-col items-center">
            <p className="text-gray-900 font-extrabold text-lg">{itemName}</p>
            <p>{item ? item : "-"}</p>
        </div>
    )
}

export default function Comic() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { id } = router.query
    const { status, error, data: comic } = useComicDetail(id)
    const [showFullCover, setShowFullCover] = useState(false)

    const toggleIsCollectedMutation = useMutation(
        () => axios.post(`/api/collection/comics/${id}`),
        {
            onSuccess: () => {
                comic.isCollected = true
                queryClient.setQueryData(["comic-detail", id], comic)
            },
        }
    )

    // Prevent further processing when the id query param doesn't exist
    if (!id) return <></>

    return (
        <>
            {status === "loading" ? (
                <div>Loading...</div>
            ) : status === "error" ? (
                <div>Error: {error.message}</div>
            ) : (
                <Page title={`${comic.seriesName} ${comic.title} - ${comic.publisherName}`}>
                    <div className="flex flex-wrap justify-center">
                        <img
                            src={comic.cover}
                            alt={`Cover art for ${comic.title}`}
                            className="rounded h-72 lg:h-96 cursor-pointer"
                            onClick={() => setShowFullCover(!showFullCover)}
                        />
                        <article className="mt-8 sm:ml-6 sm:mt-6">
                            <h2 className="font-bold text-3xl text-center md:text-left">{`${comic.seriesName} ${comic.title}`}</h2>
                            <div className="flex flex-col items-center pt-1 md:items-start">
                                <p className="italic text-xl mr-2 mb-1">
                                    {`${comic.publisherName} ${
                                        comic.imprintID !== undefined
                                            ? " - " + comic.imprintName
                                            : ""
                                    }`}
                                </p>

                                {comic.versions > 0 && (
                                    <Link href={`/comics/${comic.id}/versions`} passHref>
                                        <a className="flex items-center w-min whitespace-nowrap text-gray-800 font-bold text-md">
                                            <span>{`${comic.versions} Other Version${
                                                comic.versions > 1 ? "s" : ""
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
                                <ComicDetail
                                    itemName="Released"
                                    item={format(comic.releaseDate, "MM-dd-yyyy")}
                                />
                                <ComicDetail itemName="Format" item={comic.format} />
                                <ComicDetail itemName="Rating" item={comic.ageRating} />
                            </div>
                            {comic.description ? (
                                <p className="m-4 sm:m-0 max-w-md">{comic.description}</p>
                            ) : (
                                <p className="text-gray-600 text-xl m-4">No Description...</p>
                            )}

                            {comic.isCollected ? (
                                <p className="mt-5 font-extrabold">Comic is in collection</p>
                            ) : (
                                <Button
                                    className="mt-5"
                                    onClick={() => {
                                        toggleIsCollectedMutation.mutate()
                                    }}
                                >
                                    Add to Collection
                                </Button>
                            )}

                            <Lists comicId={comic.id} />
                        </article>
                    </div>

                    {showFullCover && (
                        <FullScreenModal
                            onClick={() => {
                                setShowFullCover(!showFullCover)
                            }}
                        >
                            <img
                                src={comic.cover}
                                alt={`Cover art for ${comic.title}`}
                                className="rounded h-4/6 sm:h-screen"
                            />
                        </FullScreenModal>
                    )}
                </Page>
            )}
        </>
    )
}
