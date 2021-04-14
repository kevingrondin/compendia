import PropTypes from "prop-types"
import { Category } from "@components/common/Category"
import { PageLink } from "@components/common/PageLink"

export function SeriesSearchResults({ series }) {
    return (
        <>
            {series && series.length > 0 ? (
                <div>
                    <Category size="MD" className="mb-4">
                        Series
                    </Category>
                    <ul>
                        {series.map((series) => (
                            <li key={series.id}>
                                <PageLink
                                    href={`/series/${series.id}`}
                                    linkText={`${series.name}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}
SeriesSearchResults.propTypes = {
    series: PropTypes.array.isRequired,
}
