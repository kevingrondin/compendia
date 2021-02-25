import PropTypes from "prop-types"
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
import { usePluralize } from "@hooks/usePluralize"
import { DisappearedLoading } from "react-loadingg"

function Cover({ comic, onClick }) {
    return (
        <img
            src={comic.cover}
            alt={`Cover art for ${comic.title} ${comic.itemNumber}`}
            className="rounded h-72 lg:h-96 cursor-pointer"
            onClick={onClick}
        />
    )
}
Cover.propTypes = {
    comic: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

function Title({ comic }) {
    return (
        <h2 className="font-bold text-3xl">
            <PageLink
                href={`/series/${comic.seriesID}`}
                linkText={comic.title}
                extraContent={comic.itemNumber}
                className="justify-center md:justify-start"
            />
        </h2>
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
                        comic.otherVersions.length
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
                <p className="mt-8 text-gray-600 text-xl">No Description...</p>
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
                    <img
                        src={comic.cover}
                        alt={`Cover art for ${comic.title}`}
                        className="rounded h-4/6 sm:h-screen"
                    />
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
            <Page title={`${comic.title} ${comic.itemNumber} - ${comic.publisherName}`}>
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
                            {comic.isCollected ? <CollectionDetails comicID={comic.id} /> : null}
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
