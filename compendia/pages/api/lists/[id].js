import dbConnect from "../../../database/connection"
import ComicList from "../../../database/models/ComicList"

dbConnect()

export default async function handler(req, res) {
    const { id, comicId } = req.query
    const list = req.body

    res.setHeader("Content-Type", "application/json")

    try {
        if (req.method === "PUT") {
            const comicList = await ComicList.findOne({ _id: id }).exec()
            if (list.isComicInList) {
                const comics = comicList.comics.filter((id) => id === comicId)
                comicList.comics = comics
            } else {
                comicList.comics.push(comicId)
            }

            comicList.save()
            res.statusCode = 200
            res.end(
                JSON.stringify({
                    _id: comicList._id,
                    name: comicList.name,
                    isComicInList: comicList.comics ? comicList.comics.includes(comicId) : false,
                })
            )
        }
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.end(`Could not update ${list.name} list`)
    }
}
