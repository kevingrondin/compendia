import PropTypes from "prop-types"
import { ComicCover } from "../comic/ComicCover"
import { DetailListGrid } from "@components/common/DetailListGrid"
import { PageLink } from "@components/common/PageLink"

export function PublisherSeriesList({ seriesList }) {
    return (
        <div className="flex">
            {seriesList && seriesList.length > 0 ? (
                seriesList.map((series) => (
                    <li key={series.id} className="list-none">
                        <div className="text-blue-primary-200 text-md flex mr-4">
                            <PageLink href="/" linkText={series.name} hasArrow={true} />
                        </div>
                    </li>
                ))
            ) : (
                <p className="text-center text-xl mt-12 mb-20">No series by this publisher...</p>
            )}
        </div>
    )
}

PublisherSeriesList.propTypes = {
    seriesList: PropTypes.array.isRequired,
}
