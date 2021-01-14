import { formatDateStringForView } from "../../util/date"

function ComicDetail({ itemName, item }) {
    return (
        <div className="px-6 py-2 flex flex-col items-center">
            <p className="text-gray-900 font-extrabold text-lg">{itemName}</p>
            <p>{item ? item : "-"}</p>
        </div>
    )
}

export default function ComicDetails({ comic }) {
    return (
        <>
            <div className="flex flex-wrap justify-center py-5 sm:pt-2 ">
                <ComicDetail itemName="Price" item={comic.coverPrice} />
                <ComicDetail
                    itemName="Released"
                    item={formatDateStringForView(comic.releaseDate)}
                />
                <ComicDetail itemName="Format" item={comic.format} />
                <ComicDetail itemName="Rating" item={comic.ageRating} />
            </div>
        </>
    )
}
