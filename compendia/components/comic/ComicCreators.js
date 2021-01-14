import Link from "next/link"
import Arrow from "../utils/Arrow"

export default function ComicCreators({ creators }) {
    return (
        <>
            <hr />
            <article className="my-8 mx-4">
                <h2 className="font-bold text-2xl mb-3">Creators</h2>
                <ul>
                    {creators.map((creator) => {
                        return (
                            <li key={creator.id} className="text-lg font-semibold mb-3">
                                {creator.types.join(" / ") + ":"}
                                <Link href={`/creators/${creator.id}`} passHref>
                                    <a className="flex items-center w-min whitespace-nowrap font-normal">
                                        <span>{creator.name}</span>
                                        <Arrow
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
}
