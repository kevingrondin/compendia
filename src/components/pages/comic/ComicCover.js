import Link from "next/link"
import Image from "next/image"
import PropTypes from "prop-types"

export function ComicCover({ comicID, title, cover, footer }) {
    return (
        <article className="cursor-pointer">
            <Link href={`/comics/${comicID}`} passHref>
                <div className="relative w-36 h-56 sm:w-52 sm:h-80 2xl:w-60 2xl:h-96">
                    <Image
                        src={cover}
                        alt={`Comic cover for ${title}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                        quality="90"
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
