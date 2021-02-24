import { Page } from "@components/common/Page"
import { PageHeading } from "@components/common/PageHeading"
import { useCollectedComics } from "@hooks/queries/collection"
import { CollectedComicsList } from "@components/pages/collection/CollectedComicsList"

export default function CollectedComics() {
    const { isLoading, isError, error, data } = useCollectedComics()
    const collectedComics = data && data.collectedComics ? data.collectedComics : []

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {`${error && error.message}`}</div>
    else if (collectedComics === undefined) return <></>
    else {
        return (
            <Page title="Collected Comics">
                <PageHeading heading="Collected Comics" />
                <CollectedComicsList comics={collectedComics} />
            </Page>
        )
    }
}
