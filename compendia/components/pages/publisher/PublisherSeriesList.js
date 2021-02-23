import PropTypes from "prop-types"
import { PageLink } from "@components/common/PageLink"

export function PublisherSeriesList({ seriesList }) {
    return (
        <div className="flex mb-20">
            {seriesList && seriesList.length > 0 ? (
                <ul>
                    {seriesList.map((series) => (
                        <li key={series.id} className="list-none pb-4">
                            <div className="text-blue-primary-200 text-md flex mr-4">
                                <PageLink href={`/series/${series.id}`} linkText={series.name} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-xl mt-12 mb-20">No series by this publisher...</p>
            )}
        </div>
    )
}

PublisherSeriesList.propTypes = {
    seriesList: PropTypes.array.isRequired,
}
