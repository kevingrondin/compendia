import PropTypes from "prop-types"

export function PublisherSeriesList({ seriesList }) {
    return (
        <>
            {seriesList && seriesList.length > 0 ? (
                <div className="flex flex-wrap">
                    <ul>
                        {seriesList.map((series) => (
                            <li key={series.id}>{series.name}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-xl mt-12 mb-20">No series by this publisher...</p>
            )}
        </>
    )
}

PublisherSeriesList.propTypes = {
    seriesList: PropTypes.array.isRequired,
}
