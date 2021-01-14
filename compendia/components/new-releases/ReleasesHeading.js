import PropTypes from "prop-types"
import { format } from "date-fns"

import useComicDay from "../../hooks/useComicDay"

const comicDaysMatch = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()

function getHeadingText(comicDay) {
    let headingText = ""

    if (comicDaysMatch(comicDay, useComicDay("current", new Date()))) {
        headingText = "this week's"
    } else if (comicDaysMatch(comicDay, useComicDay("next", new Date()))) {
        headingText = "next week's"
    } else if (comicDaysMatch(comicDay, useComicDay("prev", new Date()))) {
        headingText = "last week's"
    } else {
        headingText = `${format(comicDay, "MMM do")}'s`
    }

    return headingText
}

const ReleasesHeading = ({ comicDay }) => (
    <div className="flex justify-around align-center pb-8 mb-6 sm:mb-8 border-b-4 border-blue-primary-200 border-solid">
        <h2 className="text-4xl text-center text-blue-primary-200 font-bold">
            Here's {getHeadingText(comicDay)} comics.
        </h2>
    </div>
)

ReleasesHeading.propTypes = {
    comicDay: PropTypes.instanceOf(Date).isRequired,
}

export default ReleasesHeading
