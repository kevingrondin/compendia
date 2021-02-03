import { useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Page } from "@components/common/Page"
import { PageHeading } from "@components/common/PageHeading"
import { PublisherSeriesList } from "@components/pages/publishers/PublisherSeriesList"
import { usePublisher } from "@hooks/queries/publisher"

export default function PublisherDetail() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { publisherID } = router.query
    const { isLoading, isError, error, data: publisher } = usePublisher(parseInt(publisherID))

    const seriesList = publisher && publisher.seriesList ? publisher.seriesList : []

    useEffect(() => {
        if (publisherID) queryClient.refetchQueries(["publisher-detail", parseInt(publisherID)])
    }, [publisherID])

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {`${error && error.message}`}</div>
    else if (!publisherID || seriesList === undefined) return <></>
    else {
        return (
            <Page title={`${publisher.name}`}>
                <PageHeading>{publisher.name}</PageHeading>

                <PublisherSeriesList seriesList={seriesList} />
            </Page>
        )
    }
}
