import Image from "next/image"
import Link from "next/link"

// anchor tag required as a wrapper around next/link to avoid console error. See: https://github.com/vercel/next.js/issues/7915

export default function ComicCover({ comic: { id, title, cover } }) {
    return (
        <article className="flex mr-10 mb-10 shadow-xl" key={id}>
            <Link href={`/comics/${id}`} passHref>
                <a>
                    <Image
                        width="200"
                        height="310"
                        className="h-full rounded"
                        src={cover}
                        alt={`Comic cover for ${title}`}
                    />
                </a>
            </Link>
        </article>
    )
}
