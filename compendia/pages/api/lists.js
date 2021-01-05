import dbConnect from "../../database/connection"
import ComicList from "../../database/models/ComicList"

dbConnect()

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")

    try {
        const token = req.cookies.token
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const usersComicLists = await ComicList.find({ user: user.id })
        res.statusCode = 200
        res.end({ data: usersComicLists })
    } catch (error) {
        res.statusCode = 500
        res.end({ message: "Could not retrieve comic lists" })
    }
}
