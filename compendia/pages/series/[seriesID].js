import { useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Page } from "@components/common/Page"
import { PageHeading } from "@components/common/PageHeading"
import { SeriesEntriesList } from "@components/pages/series/SeriesEntriesList"
import { useSeries } from "@hooks/queries/series"

export default function SeriesDetail() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { seriesID } = router.query
    const { isLoading, isError, error, data: series } = useSeries(parseInt(seriesID))

    const entries = series && series.entries ? series.entries : []

    useEffect(() => {
        if (seriesID) queryClient.refetchQueries(["series-detail", parseInt(seriesID)])
    }, [seriesID])

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {`${error && error.message}`}</div>
    else if (!seriesID || entries === undefined) return <></>
    else {
        return (
            <Page title={`${series.name}`}>
                <PageHeading>{series.name}</PageHeading>

                <SeriesEntriesList entries={entries} />
            </Page>
        )
    }
}
