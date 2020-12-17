import * as dayjs from "dayjs"
import * as advancedFormat from "dayjs/plugin/advancedFormat"
dayjs.extend(advancedFormat)
import Arrow from "../utils/Arrow"

export default function ReleaseWeekSelector({ getNextComicDay, getPrevComicDay, comicDay }) {
    return (
        <div className="flex items-center lg:ml-8">
            <Arrow
                direction="left"
                className="p-3"
                colorClass="text-blue-primary-100"
                onClick={getPrevComicDay}
            />
            <p className="rounded-full py-3 px-6 text-center text-gray-500 text-xl leading-none bg-gray-200 border-none">
                {comicDay.format(MMM, D, YYYY)}
            </p>
            <Arrow
                direction="right"
                className="p-3"
                colorClass="text-blue-primary-100"
                onClick={getNextComicDay}
            />
        </div>
    )
}
