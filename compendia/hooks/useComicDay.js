import { addDays, subDays, isSameWeek } from "date-fns"

// Depending on the action passed in, returns the next, previous, or current comic book day (tuesday) from the date passed in
export default function useComicDay(action, date) {
    const TUESDAY = 2
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    if (action === "next" || (action === "current" && newDate.getDay() < TUESDAY)) {
        do {
            newDate = addDays(newDate, 1)
        } while (newDate.getDay() !== TUESDAY)
    } else if (action === "prev") {
        do {
            newDate = subDays(newDate, 1)
        } while (newDate.getDay() !== TUESDAY || isSameWeek(newDate, date))
    } else if (action === "current" && newDate.getDay() > TUESDAY) {
        do {
            newDate = subDays(newDate, 1)
        } while (newDate.getDay() !== TUESDAY)
    }

    return newDate
}
