// Depending on the action passed in, returns the next, previous, or current comic book day (tuesday) from the dayjs date passed in
export default function useComicDay(action, date) {
    const TUESDAY = 2

    function setClosestComicDay(d, direction) {
        do {
            direction === "next" ? d.add(1, "day") : d.subtract(1, "day")
        } while (d.day() !== TUESDAY)
    }

    if (action === "next") {
        setClosestComicDay(date, "next")
    } else if (action === "prev") {
        setClosestComicDay(date, "prev")
    } else if (action === "current" && date.day() !== TUESDAY) {
        date.day() > TUESDAY ? setClosestComicDay(date, "prev") : setClosestComicDay(date, "next")
    }

    return date
}
