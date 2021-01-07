import dbConnect from "../../../../database/connection"
import CollectedComic from "../../../../database/models/CollectedComic"
import jwt from "jsonwebtoken"

dbConnect()

export default async function handler(req, res) {
    const { id } = req.query

    res.setHeader("Content-Type", "application/json")

    let token = req.cookies.token
    if (!token) return res.status(401).json({ message: "User is not logged in" })

    let user = jwt.verify(token, process.env.JWT_SECRET)

    try {
        if (req.method === "POST") {
            await new CollectedComic({ user: user.id, comic: id }).save()
            res.statusCode = 200
            res.end()
        }
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.end(`Could not add comic to your collection`)
    }
}
