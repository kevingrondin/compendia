import Link from "next/link"
import Image from "next/image"
import PropTypes from "prop-types"

export function ComicCover({ comicID, title, cover, footer }) {
    return (
        <article className="cursor-pointer">
            <Link href={`/comics/${comicID}`} passHref>
                <div className="relative w-40 h-52 sm:w-60 sm:h-80 2xl:w-64 2xl:h-96">
                    <Image
                        src={cover}
                        alt={`Comic cover for ${title}`}
                        layout="fill"
                        objectFit="contain"
                        className="rounded"
                    />
                </div>
            </Link>
            {footer && <div className="w-full">{footer}</div>}
        </article>
    )
}
ComicCover.propTypes = {
    comicID: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    footer: PropTypes.element,
}
