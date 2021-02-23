import { useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Page } from "@components/common/Page"
import { PageHeading } from "@components/common/PageHeading"
import { ComicVersionsList } from "@components/pages/comic/ComicVersionsList"
import { useComicVersions } from "@hooks/queries/comic"

export default function ComicVersions() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { comicID } = router.query
    const { isLoading, isError, error, data: comic } = useComicVersions(parseInt(comicID))

    const versions = comic && comic.versions ? comic.versions : []

    useEffect(() => {
        if (comicID) queryClient.refetchQueries(["comic-versions", parseInt(comicID)])
    }, [comicID])

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {`${error && error.message}`}</div>
    else if (!comicID || versions === undefined) return <></>
    else {
        return (
            <Page title={`Versions of - ${comic.title} ${comic.itemNumber}`}>
                <PageHeading
                    subHeading="Other Versions of"
                    heading={`${comic.title} ${comic.itemNumber}`}
                    isSubHeadingFirst={true}
                />

                <ComicVersionsList comics={versions} />
            </Page>
        )
    }
}
