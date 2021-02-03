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
    const { isLoading, isError, error, data } = useComicVersions(parseInt(comicID))

    const versions = data && data.versions ? data.versions : []

    useEffect(() => {
        if (comicID) queryClient.refetchQueries(["comic-versions", parseInt(comicID)])
    }, [comicID])

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {`${error && error.message}`}</div>
    else if (!comicID || versions === undefined) return <></>
    else {
        return (
            <Page title={`Versions of - ${data.title}`}>
                <PageHeading>
                    <div className="flex flex-col">
                        <span className="text-2xl">Other Versions of</span>
                        {data.title}
                    </div>
                </PageHeading>

                <ComicVersionsList comics={versions} />
            </Page>
        )
    }
}
