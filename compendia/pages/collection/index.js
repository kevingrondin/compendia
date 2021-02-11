import { Category } from "@components/common/Category"
import { Page } from "@components/common/Page"
import { CollectedComicsList } from "@components/pages/collection/CollectedComicsList"
import { Lists } from "@components/pages/collection/Lists"
import { SubscribedSeriesList } from "@components/pages/collection/SubscribedSeriesList"

export default function Collection() {
    return (
        <Page title={`Compendia - Collection`}>
            <Category size="LG">Recently Collected Comics</Category>
            <CollectedComicsList />

            <Category size="LG" className="mt-8">
                Subscribed Series
            </Category>
            <SubscribedSeriesList />

            <Category size="LG" className="mt-8">
                Lists
            </Category>
            <Lists />
        </Page>
    )
}
