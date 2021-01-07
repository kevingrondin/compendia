import dbConnect from "../../../database/connection"
import Publisher from "../../../database/models/Publisher"
import Series from "../../../database/models/Series"
import Comic from "../../../database/models/Comic"
import CollectedComic from "../../../database/models/CollectedComic"
import jwt from "jsonwebtoken"

dbConnect()

export default async function handler(req, res) {
    const {
        query: { id },
    } = req

    let token = req.cookies.token
    if (!token) return res.status(401).json({ message: "User is not logged in" })

    let user = jwt.verify(token, process.env.JWT_SECRET)

    res.setHeader("Content-Type", "application/json")

    const comic = await Comic.findOne({ _id: id }).populate({
        path: "series",
        populate: { path: "publisher imprint" },
    })
    const isCollected = await CollectedComic.findOne({ user: user.id, comic: id })
    if (comic) {
        res.statusCode = 200
        res.end(JSON.stringify({ ...comic._doc, isCollected: isCollected ? true : false }))
    } else {
        res.statusCode = 404
        res.end(`Could not find a comic with ID of ${id}`)
    }
}
