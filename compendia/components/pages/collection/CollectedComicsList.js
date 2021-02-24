import { ComicCover } from "@components/pages/comic/ComicCover"
import { CoverListGrid } from "@components/common/CoverListGrid"
import { useCollectedComics } from "@hooks/queries/collection"
import { DisappearedLoading } from "react-loadingg"

export function CollectedComicsList() {
    const { isLoading, isError, error, data } = useCollectedComics()

    if (isLoading) return <DisappearedLoading />
    else if (isError) return <div>Error: {`${error && error.message}`}</div>
    else {
        return (
            <>
                {data.collectedComics && data.collectedComics.length > 0 ? (
                    <CoverListGrid>
                        {data.collectedComics.map((comic) => (
                            <li key={comic.id}>
                                <ComicCover
                                    comicID={comic.id}
                                    cover={comic.cover}
                                    title={`${comic.title} ${comic.itemNumber}`}
                                />
                            </li>
                        ))}
                    </CoverListGrid>
                ) : (
                    <p className="text-center text-xl mt-12 mb-20">No collected comics...</p>
                )}
            </>
        )
    }
}
