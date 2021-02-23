import PropTypes from "prop-types"
import { formatDateStringForView } from "@util/date"

const ComicDetail = ({ detailName, detail }) => (
    <div className={`flex flex-col items-center px-6 py-2`}>
        <p className="text-gray-900 font-extrabold text-lg">{detailName}</p>
        <p>{detail ? detail : "-"}</p>
    </div>
)
ComicDetail.propTypes = {
    detailName: PropTypes.string.isRequired,
    detail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export function ComicDetails({ comic }) {
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-4 justify-center sm:justify-start py-5 sm:pt-2">
                <ComicDetail detailName="Price" detail={comic.coverPrice} isFirst={true} />
                <ComicDetail
                    detailName="Released"
                    detail={formatDateStringForView(comic.releaseDate)}
                />
                <ComicDetail detailName="Format" detail={comic.format} />
                <ComicDetail detailName="Rating" detail={comic.ageRating} />
            </div>
        </>
    )
}
ComicDetails.propTypes = {
    comic: PropTypes.object.isRequired,
}
