import PropTypes from "prop-types"
import { format } from "date-fns"
import { useComicDay } from "@hooks/useComicDay"
import { PageHeading } from "@components/common/PageHeading"
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

export function ReleasesHeading({ comicDay, children: releasesControls }) {
    return (
        <PageHeading
            heading={`Here's ${getHeadingText(comicDay)} comics.`}
            controls={releasesControls}
        />
    )
}
ReleasesHeading.propTypes = {
    comicDay: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.element,
}
