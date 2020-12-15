import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"
import Arrow from "../utils/Arrow"

export default function ReleaseWeekSelector() {
    const [releaseDate, setReleaseDate] = useState(new Date())

    return (
        <div className="flex items-center">
            <Arrow direction="left" className="py-2 pr-3 pl-2 rounded-full bg-gray-200" />
            <DatePicker selected={releaseDate} onChange={(date) => setReleaseDate(date)} />
            <Arrow direction="right" className="p-3" />
        </div>
    )
}
