import Link from "next/link"

export default function ComicCover({ comic: { id, title, cover } }) {
    return (
        <article className="flex mr-10 mb-10 shadow-xl cursor-pointer" key={id}>
            <Link href={`/comics/${id}`} passHref>
                <img className="h-96 rounded" src={cover} alt={`Comic cover for ${title}`} />
            </Link>
        </article>
    )
}
