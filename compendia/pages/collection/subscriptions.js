import { Page } from "@components/common/Page"
import { PageHeading } from "@components/common/PageHeading"
import { SubscribedSeriesList } from "@components/pages/collection/SubscribedSeriesList"

export default function SeriesSubscriptions() {
    return (
        <Page title="Series Subscriptions">
            <PageHeading heading="Series Subscriptions" />
            <SubscribedSeriesList />
        </Page>
    )
}
