import { PropTypes } from "prop-types"
import { PageLink } from "@components/common/PageLink"

export function ComicCreators({ creators }) {
    return (
        <>
            <hr />
            <article className="py-8 px-4">
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
                                    hasArrow={true}
                                    className="pb-1 mt-2"
                                />
                            </li>
                        )
                    })}
                </ul>
            </article>
        </>
    )
}
ComicCreators.propTypes = {
    creators: PropTypes.array.isRequired,
}
