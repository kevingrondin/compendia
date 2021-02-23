import { Category } from "@components/common/Category"
import { Page } from "@components/common/Page"
import { PageLink } from "@components/common/PageLink"
import { CollectedComicsList } from "@components/pages/collection/CollectedComicsList"
import { Lists } from "@components/pages/collection/Lists"
import { SubscribedSeriesList } from "@components/pages/collection/SubscribedSeriesList"

export default function Collection() {
    return (
        <Page title={`Compendia - Collection`}>
            <Category size="LG">
                <PageLink
                    linkText="Collected Comics"
                    href="/"
                    hasUnderline={false}
                    hasArrow={true}
                    arrowHeightClass="h-7"
                />
            </Category>
            <CollectedComicsList />

            <Category size="LG" className="mt-8">
                <PageLink
                    linkText="Subscribed Series"
                    href="/"
                    hasUnderline={false}
                    hasArrow={true}
                    arrowHeightClass="h-7"
                />
            </Category>
            <SubscribedSeriesList />

            <Category size="LG" className="mt-8">
                <PageLink
                    linkText="Lists"
                    href="/"
                    hasUnderline={false}
                    hasArrow={true}
                    arrowHeightClass="h-7"
                />
            </Category>
            <Lists />
        </Page>
    )
}
