import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"
import { PageLink } from "@components/common/PageLink"
import { useSubscribedSeries } from "@hooks/queries/collection"
import { DisappearedLoading } from "react-loadingg"

export function SubscribedSeriesList() {
    const { isLoading, isError, error, data } = useSubscribedSeries()

    if (isLoading) return <DisappearedLoading />
    else if (isError) return <div>Error: {`${error && error.message}`}</div>
    else {
        return (
            <div className="flex">
                {data.subscribedSeriesList && data.subscribedSeriesList.length > 0 ? (
                    data.subscribedSeriesList.map((series) => (
                        <li key={series.id} className="list-none">
                            <div className="text-blue-primary-200 text-md flex mr-4">
                                <PageLink href={`/series/${series.id}`} linkText={series.name} />
                            </div>
                        </li>
                    ))
                ) : (
                    <EmptyResultsMessage marginTop="mt-6">
                        No subscribed series...
                    </EmptyResultsMessage>
                )}
            </div>
        )
    }
}
