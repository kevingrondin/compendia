import Link from "next/link"

export default function ComicCover({ comic: { id, title, cover } }) {
    return (
        <article className="cursor-pointer">
            <Link href={`/comics/${id}`} passHref>
                <img
                    className="h-52 sm:h-80 2xl:h-96 rounded"
                    src={cover}
                    alt={`Comic cover for ${title}`}
                />
            </Link>
        </article>
    )
}
