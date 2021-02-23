import { useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Page } from "@components/common/Page"
import { PageHeading } from "@components/common/PageHeading"
import { CoverListGrid } from "@components/common/CoverListGrid"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { useListComics, useListDetail } from "@hooks/queries/collection"

function ListComics({ comics }) {
    return (
        <>
            {comics && comics.length > 0 ? (
                <div className="flex flex-wrap">
                    <CoverListGrid>
                        {comics.map((comic) => (
                            <li key={comic.id}>
                                <ComicCover
                                    comicID={comic.id}
                                    cover={comic.cover}
                                    title={`${comic.title} ${comic.itemNumber}`}
                                />
                            </li>
                        ))}
                    </CoverListGrid>
                </div>
            ) : (
                <p className="text-center text-xl mt-12 mb-20">No comics in this list...</p>
            )}
        </>
    )
}

export default function CreatorDetail() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { listID } = router.query

    const {
        isLoading: listIsLoading,
        isError: listIsError,
        error: listError,
        data: list,
    } = useListDetail(parseInt(listID))

    const {
        isLoading: comicsIsLoading,
        isError: comicsIsError,
        error: comicsError,
        data: comicsData,
    } = useListComics(parseInt(listID))

    const comics = comicsData && comicsData.comics ? comicsData.comics : []

    useEffect(() => {
        if (listID) {
            queryClient.refetchQueries(["list-detail", parseInt(listID)])
            queryClient.refetchQueries(["list-comics", parseInt(listID)])
        }
    }, [listID])

    if (listIsLoading || comicsIsLoading) return <div>Loading...</div>
    else if (listIsError || comicsIsError)
        return (
            <div>
                Error: {`${comicsError && comicsError.message} ${listError && listError.message}`}
            </div>
        )
    else if (!listID || list === undefined || comics === undefined) return <></>
    else {
        return (
            <Page title={`${list.name} List`}>
                <PageHeading heading={list.name} />
                <ListComics comics={comics} />
            </Page>
        )
    }
}
