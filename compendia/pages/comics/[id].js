import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import { useQuery, useQueryClient } from "react-query"
import Page from "../../components/Page"
import FullScreenModal from "../../components/utils/FullScreenModal"
import CollectionDetails from "../../components/comic/CollectionDetails"
import CollectButton from "../../components/comic/CollectButton"
import PullButton from "../../components/comic/PullButton"
import ComicCreators from "../../components/comic/ComicCreators"
import ComicDetails from "../../components/comic/ComicDetails"
import ArrowIcon from "../../components/utils/icons/Arrow"
import Lists from "../../components/comic/Lists"
import SubscribeButton from "../../components/comic/SubscribeButton"
import useComicDay from "../../hooks/useComicDay"
import { getDateFromPGString } from "../../util/date"

const useComicDetail = (comicID) =>
    useQuery(
        ["comic-detail", comicID],
        async () => {
            const { data } = await axios.get(`/api/comics/${comicID}`)
            return data
        },
        { enabled: false, staleTime: Infinity }
    )

export default function Comic() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { id } = router.query

    const { isLoading, isError, error, data: comic } = useComicDetail(parseInt(id))
    const [showFullCover, setShowFullCover] = useState(false)

    useEffect(() => {
        if (id) queryClient.refetchQueries(["comic-detail", parseInt(id)])
    }, [id])

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else if (!id || comic === undefined) return <></>
    else {
        return (
            <>
                <Page title={`${comic.seriesName} ${comic.title} - ${comic.publisherName}`}>
                    <div className="flex flex-wrap justify-center mb-10">
                        <img
                            src={comic.cover}
                            alt={`Cover art for ${comic.title}`}
                            className="rounded h-72 lg:h-96 cursor-pointer"
                            onClick={() => setShowFullCover(!showFullCover)}
                        />

                        <article className="mt-8 md:ml-6 sm:mt-6">
                            <h2 className="font-bold text-3xl text-center md:text-left">{`${comic.seriesName} ${comic.title}`}</h2>

                            <div className="flex flex-col items-center pt-1 md:items-start">
                                <p className="italic text-xl mr-2 mb-1">
                                    {`${comic.publisherName} ${
                                        comic.imprintID ? " - " + comic.imprintName : ""
                                    }`}
                                </p>

                                {comic.versions > 0 && (
                                    <Link href={`/comics/${comic.id}/versions`} passHref>
                                        <a className="flex items-center w-min whitespace-nowrap text-gray-800 font-bold text-md">
                                            <span>{`${comic.versions} Other Version${
                                                comic.versions > 1 ? "s" : ""
                                            }`}</span>

                                            <ArrowIcon
                                                colorClass="text-blue-primary-200"
                                                className="pl-1"
                                                height="35"
                                                width="35"
                                                viewBox="-8 -12 60 55"
                                                onClick={() => {}}
                                                direction="right"
                                            />
                                        </a>
                                    </Link>
                                )}
                            </div>

                            <ComicDetails comic={comic} />

                            <div className="flex flex-wrap justify-center md:justify-start">
                                <CollectButton
                                    comicID={comic.id}
                                    isCollected={comic.isCollected}
                                    marginClass="mb-6 mx-3"
                                />
                                {
                                    // Show pull button only if the comic was released this week
                                    // or will be released in the future
                                    getDateFromPGString(comic.releaseDate) >=
                                        useComicDay("current", new Date()) && (
                                        <PullButton comicID={comic.id} marginClass="mb-6 mx-3" />
                                    )
                                }

                                <SubscribeButton
                                    seriesID={comic.seriesID}
                                    comicID={comic.id}
                                    marginClass="sm:mb-6 mx-3"
                                />
                            </div>

                            {comic.description ? (
                                <p className="mt-8 max-w-md m-auto md:mx-0">{comic.description}</p>
                            ) : (
                                <p className="mt-8 text-gray-600 text-xl">No Description...</p>
                            )}
                        </article>
                    </div>

                    {comic.creators.length > 0 && <ComicCreators creators={comic.creators} />}

                    <hr />

                    <div className="flex flex-wrap mt-8 sm:flex-nowrap">
                        <Lists comicID={comic.id} />
                        {comic.isCollected && <CollectionDetails comicID={comic.id} />}
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
            </>
        )
    }
}
