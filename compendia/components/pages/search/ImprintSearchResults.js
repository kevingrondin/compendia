import PropTypes from "prop-types"
import { Category } from "@components/common/Category"
import { PageLink } from "@components/common/PageLink"

export function ImprintSearchResults({ imprints }) {
    return (
        <>
            {imprints && imprints.length > 0 ? (
                <div>
                    <Category size="MD" className="mb-4">
                        Imprints
                    </Category>
                    <ul>
                        {imprints.map((imprint) => (
                            <li key={imprint.id}>
                                <PageLink
                                    href={`/publishers/${imprint.id}`}
                                    linkText={`${imprint.name}`}
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
ImprintSearchResults.propTypes = {
    imprints: PropTypes.array.isRequired,
}
