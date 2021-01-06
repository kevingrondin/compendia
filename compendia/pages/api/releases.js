import dbConnect from "../../database/connection"
import Publisher from "../../database/models/Publisher"
import Comic from "../../database/models/Comic"

function groupByPublisher(comics) {
    return comics.reduce(function (acc, obj) {
        const pubIndex = acc.findIndex((pub) => pub.name === obj.publisher.name)
        if (pubIndex < 0)
            acc.push({
                _id: obj.publisher._id,
                name: obj.publisher.name,
                releases: [obj],
            })
        else acc[pubIndex].releases.push(obj)

        return acc
    }, [])
}

dbConnect()

export default async function handler(req, res) {
    const { sortBy, comicDay } = req.query

    res.setHeader("Content-Type", "application/json")

    try {
        const releases = await Comic.find({ releaseDate: comicDay }).populate("publisher")
        const sortedByPublisher = groupByPublisher(releases)
        console.log("Returned: ", sortedByPublisher)
        res.statusCode = 200
        console.log("1")
        res.end(JSON.stringify(sortedByPublisher))
        console.log("2")
    } catch (error) {
        res.statusCode = 500
        console.log("3", error.message)
        res.end({ message: error.message })
    }
}
