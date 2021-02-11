import { useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Page } from "@components/common/Page"
import { PageHeading } from "@components/common/PageHeading"
import { PublisherSeriesList } from "@components/pages/publisher/PublisherSeriesList"
import { PublisherComicsList } from "@components/pages/publisher/PublisherComicsList"
import { usePublisher } from "@hooks/queries/publisher"
import { Category } from "@components/common/Category"

export default function PublisherDetail() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { publisherID } = router.query
    const { isLoading, isError, error, data: publisher } = usePublisher(parseInt(publisherID))

    const seriesList = publisher && publisher.seriesList ? publisher.seriesList : []
    const comicsList = publisher && publisher.comicsList ? publisher.comicsList : []

    useEffect(() => {
        if (publisherID) queryClient.refetchQueries(["publisher-detail", parseInt(publisherID)])
    }, [publisherID])

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {`${error && error.message}`}</div>
    else if (!publisherID || seriesList === undefined || comicsList === undefined) return <></>
    else {
        return (
            <Page title={`${publisher.name}`}>
                <PageHeading>
                    <div className="flex flex-col">
                        <span className="text-2xl">Published by</span>
                        {publisher.name}
                    </div>
                </PageHeading>

                <Category size="LG">Recent Comics</Category>
                <PublisherComicsList comicsList={comicsList} />

                <Category size="LG" className="mt-8">
                    Recently Updated Series
                </Category>
                <PublisherSeriesList seriesList={seriesList} />
            </Page>
        )
    }
}
