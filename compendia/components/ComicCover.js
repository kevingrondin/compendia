import Link from "next/link"

export default function ComicCover({ comic: { id, title, cover } }) {
    return (
        <article className="flex mr-3.5 mb-3.5 sm:mr-8 sm:mb-8 shadow-xl cursor-pointer" key={id}>
            <Link href={`/comics/${id}`} passHref>
                <img
                    className="h-52 sm:h-72 lg:h-96 rounded"
                    src={cover}
                    alt={`Comic cover for ${title}`}
                />
            </Link>
        </article>
    )
}
