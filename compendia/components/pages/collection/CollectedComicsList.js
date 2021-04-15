import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { CoverListGrid } from "@components/common/CoverListGrid"
import { useCollectedComics } from "@hooks/queries/collection"
import { DisappearedLoading } from "react-loadingg"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"
import { CoverListSideScroller } from "@components/common/CoverListSideScroller"

export function CollectedComicsList({ isSideScroller = false }) {
    const { isLoading, isError, error, data } = useCollectedComics()

    if (isLoading) return <DisappearedLoading />
    else if (isError) return <div>Error: {`${error && error.message}`}</div>
    else {
        const collectedComics = data.collectedComics.map((comic) => (
            <li key={comic.id}>
                <ComicCover
                    comicID={comic.id}
                    cover={comic.cover}
                    title={`${comic.title} ${comic.itemNumber}`}
                />
            </li>
        ))

        const coverList = isSideScroller ? (
            <CoverListSideScroller>{collectedComics}</CoverListSideScroller>
        ) : (
            <CoverListGrid>{collectedComics}</CoverListGrid>
        )

        return (
            <div className="flex">
                {data.collectedComics && data.collectedComics.length > 0 ? (
                    coverList
                ) : (
                    <EmptyResultsMessage marginTop="mt-6">
                        No comics in your collection...
                    </EmptyResultsMessage>
                )}
            </div>
        )
    }
}
CollectedComicsList.propTypes = {
    isSideScroller: PropTypes.bool,
}
