import PropTypes from "prop-types"
import { Category } from "@components/common/Category"
import { PageLink } from "@components/common/PageLink"

export function CreatorSearchResults({ creators }) {
    return (
        <>
            {creators && creators.length > 0 ? (
                <div>
                    <Category size="MD">Creators</Category>
                    <ul>
                        {creators.map((creator) => (
                            <li key={creator.id}>
                                <PageLink
                                    href={`/creators/${creator.id}`}
                                    linkText={`${creator.name}`}
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
CreatorSearchResults.propTypes = {
    creators: PropTypes.array.isRequired,
}
