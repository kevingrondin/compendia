import Image from "next/image"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { Page } from "@components/common/Page"
import { useComic } from "@hooks/queries/comic"
import { useComicDay } from "@hooks/useComicDay"
import { getDateFromPGString } from "@util/date"
import { usePluralize } from "@hooks/usePluralize"
import { DisappearedLoading } from "react-loadingg"
import { Lists } from "@components/pages/comic/Lists"
import { PageLink } from "@components/common/PageLink"
import { PullButton } from "@components/pages/comic/PullButton"
import { ComicDetails } from "@components/pages/comic/ComicDetails"
import { FullScreenModal } from "@components/common/FullScreenModal"
import { CollectButton } from "@components/pages/comic/CollectButton"
import { ComicCreators } from "@components/pages/comic/ComicCreators"
import { SubscribeButton } from "@components/pages/comic/SubscribeButton"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"
import { CollectionDetails } from "@components/pages/comic/CollectionDetails"

function Cover({ comic, onClick }) {
    return (
        <div className="relative w-56 h-72 sm:w-64 sm:h-96" onClick={onClick}>
            <Image
                src={comic.cover}
                alt={`Cover art for ${comic.title} ${comic.itemNumber}`}
                layout="fill"
                objectFit="contain"
                className="rounded cursor-pointer"
            />
        </div>
    )
}
Cover.propTypes = {
    comic: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

function Title({ comic }) {
    return (
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start ">
            <h2 className="font-bold text-3xl">
                <PageLink
                    href={`/series/${comic.seriesID}`}
                    linkText={comic.title}
                    extraContent={comic.itemNumber}
                    className=""
                />
            </h2>
            {comic.coverLetter ? (
                <h2 className="font-semibold text-xl pt-2">{`Cover ${comic.coverLetter}`}</h2>
            ) : (
                <></>
            )}
        </div>
    )
}
Title.propTypes = {
    comic: PropTypes.object.isRequired,
}

function Publisher({ comic }) {
    return (
        <div className="italic text-xl mr-2 mb-4 flex">
            <span className="mr-2">{`by `}</span>
            <PageLink href={`/publishers/${comic.publisherID}`} linkText={comic.publisherName} />
            {comic.imprintID
                ? ` - ${(
                      <PageLink
                          href={`/imprints/${comic.imprintID}`}
                          linkText={comic.imprintName}
                      />
                  )}`
                : ""}
        </div>
    )
}
Publisher.propTypes = {
    comic: PropTypes.object.isRequired,
}

function OtherVersionsButton({ comic }) {
    return (
        <>
            {comic.otherVersions > 0 ? (
                <PageLink
                    href={`/comics/${comic.id}/versions`}
                    linkText={`${comic.otherVersions} Other ${usePluralize(
                        "Version",
                        comic.otherVersions
                    )}`}
                    className="pb-1 mt-1"
                />
            ) : null}
        </>
    )
}
OtherVersionsButton.propTypes = {
    comic: PropTypes.object.isRequired,
}

function VariantDescription({ variantDescription }) {
    return variantDescription ? (
        <div className={`flex flex-col items-center md:items-start md:pl-10 px-6 pb-8`}>
            <p className="text-gray-900 font-extrabold text-lg">Variant Description</p>
            <p>{variantDescription}</p>
        </div>
    ) : (
        <></>
    )
}

function Buttons({ comic }) {
    return (
        <div className="flex flex-wrap justify-center md:justify-start">
            <CollectButton
                comicID={comic.id}
                isCollected={comic.isCollected}
                marginClass="mb-6 mx-3"
            />
            {
                // Show pull button only if the comic was released this week
                // or will be released in the future
                getDateFromPGString(comic.releaseDate) >= useComicDay("current", new Date()) && (
                    <PullButton comicID={comic.id} marginClass="mb-6 mx-3" />
                )
            }

            <SubscribeButton
                seriesID={comic.seriesID}
                isGraphicNovelSeries={comic.isGraphicNovelSeries}
                comicID={comic.id}
                marginClass="sm:mb-6 mx-3"
            />
        </div>
    )
}
Buttons.propTypes = {
    comic: PropTypes.object.isRequired,
}

function Description({ comic }) {
    return (
        <>
            {comic.description ? (
                <p className="my-8 max-w-md m-auto md:mx-0">{comic.description}</p>
            ) : (
                <EmptyResultsMessage>No Description...</EmptyResultsMessage>
            )}
        </>
    )
}
Description.propTypes = {
    comic: PropTypes.object.isRequired,
}

function FullCoverModal({ comic, show, onClick }) {
    return (
        <>
            {show && (
                <FullScreenModal onClick={onClick}>
                    <div className="w-96">
                        <Image
                            src={comic.cover}
                            alt={`Cover art for ${comic.title}`}
                            layout="intrinsic"
                            height={900}
                            width={600}
                            className="rounded"
                        />
                    </div>
                </FullScreenModal>
            )}
        </>
    )
}
FullCoverModal.propTypes = {
    comic: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

function Divider({ children }) {
    if (children)
        return (
            <>
                <hr />
                <div className="my-8">{children}</div>
            </>
        )
    else return <></>
}
Divider.propTypes = {
    children: PropTypes.element.isRequired,
}

export default function Comic() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { comicID } = router.query

    const { isLoading, isError, error, data: comic } = useComic(parseInt(comicID))
    const [showFullCover, setShowFullCover] = useState(false)

    useEffect(() => {
        if (comicID) queryClient.refetchQueries(["comic-detail", parseInt(comicID)])
    }, [comicID])

    if (isLoading) return <DisappearedLoading />
    else if (isError) return <div>Error: {error.message}</div>
    else if (!comicID || comic === undefined) return <></>
    else {
        return (
            <Page
                title={`${comic.title}${comic.itemNumber ? ` ${comic.itemNumber}` : ""} - ${
                    comic.publisherName
                }`}
            >
                <div className="flex flex-col justify-center mb-10">
                    <div className="flex flex-wrap justify-center">
                        <Cover comic={comic} onClick={() => setShowFullCover(!showFullCover)} />
                        <article className="mt-8 sm:mt-6 md:ml-6">
                            <Title comic={comic} />

                            <div className="flex flex-col items-center pt-2 md:items-start">
                                <Publisher comic={comic} />
                                <OtherVersionsButton comic={comic} />
                            </div>

                            <ComicDetails comic={comic} />

                            <VariantDescription variantDescription={comic.variantDescription} />

                            <Buttons comic={comic} />

                            <Description comic={comic} />
                        </article>
                    </div>

                    <div className="max-w-3xl m-auto">
                        <Divider>
                            <ComicCreators creators={comic.creators} />
                        </Divider>

                        <Divider>
                            <Lists comicID={comic.id} />
                        </Divider>

                        <Divider>
                            {comic.isCollected ? <CollectionDetails comicID={comic.id} /> : <></>}
                        </Divider>
                    </div>
                </div>

                <FullCoverModal
                    comic={comic}
                    show={showFullCover}
                    onClick={() => {
                        setShowFullCover(!showFullCover)
                    }}
                />
            </Page>
        )
    }
}
