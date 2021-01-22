import Link from "next/link"

import PropTypes from "prop-types"

const ComicCover = ({ comicID, title, cover, footer }) => (
    <article className="cursor-pointer">
        <Link href={`/comics/${comicID}`} passHref>
            <img
                className="h-52 sm:h-80 2xl:h-96 rounded"
                src={cover}
                alt={`Comic cover for ${title}`}
            />
        </Link>
        {footer && <div className="w-52">{footer}</div>}
    </article>
)

ComicCover.propTypes = {
    comicID: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    footer: PropTypes.element,
}

export default ComicCover
