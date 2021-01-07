import dbConnect from "../../database/connection"
import Publisher from "../../database/models/Publisher"
import Comic from "../../database/models/Comic"

function groupByPublisher(comics) {
    return comics.reduce(function (acc, obj) {
        const pubIndex = acc.findIndex((pub) => pub.name === obj.series.publisher.name)
        if (pubIndex < 0)
            acc.push({
                _id: obj.series.publisher._id,
                name: obj.series.publisher.name,
                releases: [obj],
            })
        else acc[pubIndex].releases.push(obj)

        return acc
    }, [])
}

dbConnect()

export default async function handler(req, res) {
    const { comicDay } = req.query
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")

    try {
        const releases = await Comic.find({ releaseDate: comicDay }).populate("series")
        const sortedByPublisher = groupByPublisher(releases)
        res.statusCode = 200
        res.end(JSON.stringify(sortedByPublisher))
    } catch (error) {
        res.statusCode = 500
        console.log(error)
        res.end({ message: error.message })
    }
}
