import PropTypes from "prop-types"
import { Category } from "@components/common/Category"
import { PageLink } from "@components/common/PageLink"

export function PublisherSearchResults({ publishers }) {
    return (
        <>
            {publishers && publishers.length > 0 ? (
                <div>
                    <Category size="MD">Publishers</Category>
                    <ul>
                        {publishers.map((publisher) => (
                            <li key={publisher.id}>
                                <PageLink
                                    href={`/publishers/${publisher.id}`}
                                    linkText={`${publisher.name}`}
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
PublisherSearchResults.propTypes = {
    publishers: PropTypes.array.isRequired,
}
