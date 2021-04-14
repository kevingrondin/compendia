import PropTypes from "prop-types"
import { ComicCover } from "@components/pages/comic/ComicCover"
import { Category } from "@components/common/Category"
import { useAllReleases } from "@hooks/queries/releases"
import { CoverListGrid } from "@components/common/CoverListGrid"
import { DisappearedLoading } from "react-loadingg"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"
import { PageLink } from "@components/common/PageLink"

export function AllReleases({ comicDay }) {
    const { isLoading, isError, error, data: releasesByPublisher } = useAllReleases(comicDay)

    if (isLoading) return <DisappearedLoading />
    else if (isError) return <div>Error: {error.message}</div>
    else if (releasesByPublisher && releasesByPublisher.length > 0)
        return (
            <ul>
                {releasesByPublisher.map((publisher) => (
                    <li className="mt-10" key={publisher.id}>
                        <Category size="LG" className="mb-6">
                            <PageLink
                                href={`/publishers/${publisher.id}`}
                                linkText={publisher.name}
                            />
                        </Category>

                        <CoverListGrid>
                            {publisher.releases.map((comic) => (
                                <li key={comic.id}>
                                    <ComicCover
                                        comicID={comic.id}
                                        title={`${comic.title} ${comic.itemNumber}`}
                                        cover={comic.cover}
                                    />
                                </li>
                            ))}
                        </CoverListGrid>
                    </li>
                ))}
            </ul>
        )
    else return <EmptyResultsMessage>No releases this week...</EmptyResultsMessage>
}

AllReleases.propTypes = {
    comicDay: PropTypes.instanceOf(Date).isRequired,
}
