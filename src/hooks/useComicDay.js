import { addDays, subDays, isSameWeek } from "date-fns"

// Depending on the action passed in, returns the next, previous, or current comic book day (wednesday) from the date passed in
export function useComicDay(action, date) {
    const WEDNESDAY = 3
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    if (action === "next" || (action === "current" && newDate.getDay() < WEDNESDAY)) {
        do {
            newDate = addDays(newDate, 1)
        } while (newDate.getDay() !== WEDNESDAY)
    } else if (action === "prev") {
        do {
            newDate = subDays(newDate, 1)
        } while (newDate.getDay() !== WEDNESDAY || isSameWeek(newDate, date))
    } else if (action === "current" && newDate.getDay() > WEDNESDAY) {
        do {
            newDate = subDays(newDate, 1)
        } while (newDate.getDay() !== WEDNESDAY)
    }

    return newDate
}
