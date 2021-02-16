import PropTypes from "prop-types"
import { format } from "date-fns"
import { ArrowIcon } from "@icons/Arrow"

export function ReleaseDaySelector({ getNextComicDay, getPrevComicDay, comicDay }) {
    return (
        <div className="mb-6 px-4 flex items-center sm:mb-0 md:px-0 md:ml-6">
            <ArrowIcon
                direction="left"
                colorClass="text-blue-primary-100"
                height="50"
                viewBox="-10 -10 40 55"
                onClick={getPrevComicDay}
            />
            <p className="rounded-full py-3 px-6 text-center text-gray-500 text-xl leading-none bg-gray-200 border-none">
                {format(comicDay, "MMM do y")}
            </p>
            <ArrowIcon
                direction="right"
                colorClass="text-blue-primary-100"
                height="50"
                viewBox="-10 -10 40 55"
                onClick={getNextComicDay}
            />
        </div>
    )
}
ReleaseDaySelector.propTypes = {
    getNextComicDay: PropTypes.func.isRequired,
    getPrevComicDay: PropTypes.func.isRequired,
    comicDay: PropTypes.instanceOf(Date),
}