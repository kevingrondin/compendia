import PropTypes from "prop-types"

import { formatDateStringForView } from "../../../util/date"

const ComicDetail = ({ itemName, item }) => (
    <div className={`flex flex-col items-center px-6 py-2`}>
        <p className="text-gray-900 font-extrabold text-lg">{itemName}</p>
        <p>{item ? item : "-"}</p>
    </div>
)

ComicDetail.propTypes = {
    itemName: PropTypes.string.isRequired,
    item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

const ComicDetails = ({ comic }) => (
    <>
        <div className="grid grid-cols-2 sm:grid-cols-4 justify-center sm:justify-start py-5 sm:pt-2">
            <ComicDetail itemName="Price" item={comic.coverPrice} isFirst={true} />
            <ComicDetail itemName="Released" item={formatDateStringForView(comic.releaseDate)} />
            <ComicDetail itemName="Format" item={comic.format} />
            <ComicDetail itemName="Rating" item={comic.ageRating} />
        </div>
    </>
)

ComicDetails.propTypes = {
    comic: PropTypes.object.isRequired,
}

export default ComicDetails
