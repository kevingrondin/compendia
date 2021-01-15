import Link from "next/link"

import PropTypes from "prop-types"

import ArrowIcon from "../utils/icons/Arrow"

const ComicCreators = ({ creators }) => (
    <>
        <hr />
        <article className="py-8 px-4">
            <h2 className="font-bold text-2xl mb-3">Creators</h2>
            <ul className="flex flex-wrap">
                {creators.map((creator) => {
                    return (
                        <li key={creator.id} className="text-lg font-semibold mb-3 mr-12">
                            {creator.types.join(" / ") + ":"}
                            <Link href={`/creators/${creator.id}`} passHref>
                                <a className="flex items-center w-min whitespace-nowrap font-normal">
                                    <span>{creator.name}</span>
                                    <ArrowIcon
                                        colorClass="text-blue-primary-200"
                                        className="pl-1"
                                        pixelHeight="16px"
                                    />
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </article>
    </>
)

ComicCreators.propTypes = {
    creators: PropTypes.array.isRequired,
}

export default ComicCreators
