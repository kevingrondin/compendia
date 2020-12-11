import Image from "next/image"

export default function ComicCover({ comic: { id, title, cover } }) {
    return (
        <article className="flex mr-10 shadow-xl" key={id}>
            <Image
                width="200"
                height="310"
                className="h-full rounded"
                src={cover}
                alt={`Comic cover for ${title}`}
            />
        </article>
    )
}
