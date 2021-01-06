import dbConnect from "../../database/connection"
import ComicList from "../../database/models/ComicList"
import jwt from "jsonwebtoken"

dbConnect()

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")

    try {
        const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        const comicLists = await ComicList.find({ user: user.id }, "_id name comics").exec()

        res.statusCode = 200
        res.end(
            JSON.stringify(
                comicLists.map((list) => {
                    const newList = {
                        _id: list._id,
                        name: list.name,
                        isComicInList: list.comics
                            ? list.comics.includes(req.query.comicId)
                            : false,
                    }

                    return newList
                })
            )
        )
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.end("Could not retrieve comic lists")
    }
}
