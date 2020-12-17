import useComicDay from "../../hooks/useComicDay"
import * as dayjs from "dayjs"
import * as advancedFormat from "dayjs/plugin/advancedFormat"
dayjs.extend(advancedFormat)

function getHeadingText(comicDay) {
    let headingText = ""

    if (comicDay === useComicDay("current", dayjs())) {
        headingText = "this week's"
    } else if (comicDay === useComicDay("next", dayjs())) {
        headingText = "next week's"
    } else if (comicDay === useComicDay("prev", dayjs())) {
        headingText = "last week's"
    } else {
        headingText = `${comicDay.format(MMM, Do)}'s`
    }

    return headingText
}

export default function ReleasesHeading({ comicDay }) {
    return (
        <div className="flex justify-around align-center pt-8 pb-8 mb-8 border-b-4 border-blue-primary-200 border-solid">
            <h2 className="text-4xl text-center text-blue-primary-200 font-bold">
                Here's {getHeadingText(comicDay)} comics.
            </h2>
        </div>
    )
}
