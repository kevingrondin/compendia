import Arrow from "../utils/Arrow"
import { format } from "date-fns"

export default function ReleaseDaySelector({ getNextComicDay, getPrevComicDay, comicDay }) {
    return (
        <div className="mb-6 px-4 flex items-center sm:mb-0 md:px-0 md:ml-6">
            <Arrow
                direction="left"
                className="p-3"
                colorClass="text-blue-primary-100"
                onClick={getPrevComicDay}
            />
            <p className="rounded-full py-3 px-6 text-center text-gray-500 text-xl leading-none bg-gray-200 border-none">
                {format(comicDay, "MMM do y")}
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
