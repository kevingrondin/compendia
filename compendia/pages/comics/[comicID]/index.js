import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useQueryClient } from "react-query"
import { Page } from "@components/common/Page"
import { FullScreenModal } from "@components/common/FullScreenModal"
import { PageLink } from "@components/common/PageLink"
import { useComicDay } from "@hooks/useComicDay"
import { getDateFromPGString } from "@util/date"
import { CollectionDetails } from "@components/pages/comic/CollectionDetails"
import { CollectButton } from "@components/pages/comic/CollectButton"
import { PullButton } from "@components/pages/comic/PullButton"
import { SubscribeButton } from "@components/pages/comic/SubscribeButton"
import { ComicCreators } from "@components/pages/comic/ComicCreators"
import { ComicDetails } from "@components/pages/comic/ComicDetails"
import { Lists } from "@components/pages/comic/Lists"
import { useComic } from "@hooks/queries/comic"

//TODO refactor to be simpler and more readable
export default function ComicDetail() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { comicID } = router.query

    const { isLoading, isError, error, data: comic } = useComic(parseInt(comicID))
    const [showFullCover, setShowFullCover] = useState(false)

    useEffect(() => {
        if (comicID) queryClient.refetchQueries(["comic-detail", parseInt(comicID)])
    }, [comicID])

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else if (!comicID || comic === undefined) return <></>
    else {
        return (
            <>
                <Page title={`${comic.title} ${comic.itemNumber} - ${comic.publisherName}`}>
                    <div className="flex flex-wrap justify-center mb-10">
                        <img
                            src={comic.cover}
                            alt={`Cover art for ${comic.title} ${comic.itemNumber}`}
                            className="rounded h-72 lg:h-96 cursor-pointer"
                            onClick={() => setShowFullCover(!showFullCover)}
                        />

                        <article className="mt-8 md:ml-6 sm:mt-6">
                            <h2 className="font-bold text-3xl text-center md:text-left">
                                <PageLink
                                    href={`/series/${comic.seriesID}`}
                                    linkText={comic.title}
                                    extraContent={comic.itemNumber}
                                />
                            </h2>

                            <div className="flex flex-col items-center pt-2 md:items-start">
                                <div className="italic text-xl mr-2 mb-4 flex">
                                    <span className="mr-2">{`by `}</span>
                                    <PageLink
                                        href={`/publishers/${comic.publisherID}`}
                                        linkText={comic.publisherName}
                                    />
                                    {comic.imprintID
                                        ? ` - ${(
                                              <PageLink
                                                  href={`/imprints/${comic.imprintID}`}
                                                  linkText={comic.imprintName}
                                              />
                                          )}`
                                        : ""}
                                </div>

                                {comic.otherVersions > 0 ? (
                                    <PageLink
                                        href={`/comics/${comic.id}/versions`}
                                        linkText={`${comic.otherVersions} Other Version${
                                            comic.otherVersions > 1 ? "s" : ""
                                        }`}
                                        hasArrow={true}
                                        className="pb-1 mt-2"
                                    />
                                ) : null}
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
