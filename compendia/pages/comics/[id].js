import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import axios from "axios"
import { useQuery } from "react-query"

import Page from "../../components/Page"
import FullScreenModal from "../../components/utils/FullScreenModal"
import CollectionDetails from "../../components/comic/CollectionDetails"
import CollectButton from "../../components/comic/CollectButton"
import ComicCreators from "../../components/comic/ComicCreators"
import ComicDetails from "../../components/comic/ComicDetails"
import ArrowIcon from "../../components/utils/icons/Arrow"
import Lists from "../../components/comic/Lists"

const useComicDetail = (comicID) =>
    useQuery(["comic-detail", comicID], async () => {
        const { data } = await axios.get(`/api/comics/${comicID}`)
        return data
    })

export default function Comic() {
    const router = useRouter()
    const { id } = router.query

    const { isLoading, isError, error, data: comic } = useComicDetail(parseInt(id))
    const [showFullCover, setShowFullCover] = useState(false)

    if (!id) return <></>
    else if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else
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

                        <article className="mt-8 sm:ml-6 sm:mt-6">
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
                                                pixelHeight="16px"
                                            />
                                        </a>
                                    </Link>
                                )}
                            </div>

                            <ComicDetails comic={comic} />

                            <CollectButton comicID={comic.id} isCollected={comic.isCollected} />

                            {comic.description ? (
                                <p className="m-4 sm:m-0 max-w-md">{comic.description}</p>
                            ) : (
                                <p className="text-gray-600 text-xl m-4">No Description...</p>
                            )}
                        </article>
                    </div>

                    {comic.creators.length > 0 && <ComicCreators creators={comic.creators} />}

                    <hr />

                    <div className="flex flex-wrap mt-8 ml-4 sm:flex-nowrap">
                        <Lists comicID={comic.id} />
                        <CollectionDetails comicID={comic.id} isCollected={comic.isCollected} />
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
