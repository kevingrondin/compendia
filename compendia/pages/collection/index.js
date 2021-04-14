import { Category } from "@components/common/Category"
import { Page } from "@components/common/Page"
import { PageLink } from "@components/common/PageLink"
import { CollectedComicsList } from "@components/pages/collection/CollectedComicsList"
import { Lists } from "@components/pages/collection/Lists"
import { SubscribedSeriesList } from "@components/pages/collection/SubscribedSeriesList"

export default function Collection() {
    return (
        <Page title={`Compendia - Collection`}>
            <Category size="LG" className="mb-4">
                <PageLink
                    linkText="Collected Comics"
                    href="/collection/comics"
                    hasUnderline={false}
                    hasArrow={true}
                    arrowHeightClass="h-7"
                />
            </Category>
            <CollectedComicsList />

            <Category size="LG" className="mt-8 mb-4">
                <PageLink
                    linkText="Subscribed Series"
                    href="/collection/subscriptions"
                    hasUnderline={false}
                    hasArrow={true}
                    arrowHeightClass="h-7"
                />
            </Category>
            <SubscribedSeriesList />

            <Category size="LG" className="mt-8 mb-4">
                Your Lists
            </Category>
            <Lists />
        </Page>
    )
}
