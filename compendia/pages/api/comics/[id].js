import dbConnect from "../../../database/connection"
import Publisher from "../../../database/models/Publisher"
import Series from "../../../database/models/Series"
import Comic from "../../../database/models/Comic"

dbConnect()

export default async function handler(req, res) {
    const {
        query: { id },
    } = req

    res.setHeader("Content-Type", "application/json")

    const comic = await Comic.findOne({ _id: id }).populate("series").populate("publisher")
    if (comic) {
        res.statusCode = 200
        res.end(JSON.stringify(comic))
    } else {
        res.statusCode = 404
        res.end(`Could not find a comic with ID of ${id}`)
    }
}
