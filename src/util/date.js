import { format } from "date-fns"

export function formatDateStringForView(date) {
    if (date && typeof date === "string" && date.includes("Z")) {
        return format(new Date(date), "MM/dd/yyyy")
    } else if (date && typeof date === "string") {
        const parts = date.split("-")
        return format(new Date(parts[0], parts[1] - 1, parts[2]), "MM/dd/yyyy")
    } else if (date && typeof date === "date") {
        return format(date, "MM/dd/yyyy")
    } else return ""
}

export function getDateFromPGString(dateAsString) {
    const date = new Date(dateAsString)
    return new Date(date.getTime() - date.getTimezoneOffset() * -60000)
}
