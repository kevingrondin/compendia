import { PropTypes } from "prop-types"
import { PageLink } from "@components/common/PageLink"

export function ComicCreators({ creators }) {
    return (
        <>
            {creators.length > 0 ? (
                <article className="inline-block px-4">
                    <h2 className="font-bold text-2xl mb-3">Creators</h2>
                    <ul className="flex flex-wrap">
                        {creators.map((creator) => {
                            return (
                                <li key={creator.id} className="text-lg mb-3 mr-12">
                                    <span className="font-semibold">
                                        {creator.types.join(" / ") + ":"}
                                    </span>
                                    <PageLink
                                        href={`/creators/${creator.id}`}
                                        linkText={creator.name}
                                        className="pb-1 mt-2"
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </article>
            ) : null}
        </>
    )
}
ComicCreators.propTypes = {
    creators: PropTypes.array.isRequired,
}
