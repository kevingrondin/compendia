import dbConnect from "../../../database/connection"
import Comic from "../../../database/models/Comic"

dbConnect()

export default async function handler(req, res) {
    const {
        query: { id },
    } = req

    const comic = await Comic.findOne({ _id: id }).populate("Series").populate("Publisher")

    await new Comic({})

    res.setHeader("Content-Type", "application/json")
    if (comic) {
        res.statusCode = 200
        res.end(JSON.stringify(comic))
    } else {
        res.statusCode = 404
        res.end(`Could not find a comic with ID of ${id}`)
    }
}
