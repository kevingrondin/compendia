import PropTypes from "prop-types"
import { PageLink } from "@components/common/PageLink"
import { EmptyResultsMessage } from "@components/common/EmptyResultsMessage"

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
                <EmptyResultsMessage>No series by this publisher...</EmptyResultsMessage>
            )}
        </div>
    )
}

PublisherSeriesList.propTypes = {
    seriesList: PropTypes.array.isRequired,
}
