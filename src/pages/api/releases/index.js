import moveIndex from "@util/moveIndex"
import { db } from "@util/database"

async function getReleases(client, comicDay) {
    const query = `SELECT comic_id, title, item_number, cover, p.publisher_id, p.name as publisher_name
        FROM comics as c FULL JOIN series as s ON c.series_id = s.series_id
        FULL JOIN publishers as p ON s.publisher_id = p.publisher_id
        WHERE c.release_date = $1`
    const params = [comicDay]
    const result = await client.query(query, params)

    return result.rows
}

function movePremierPublishersToTop(publishers) {
    const sortedArray = [...publishers]
    const imageIndex = sortedArray.findIndex((pub) => pub.name === "Image Comics")
    const marvelIndex = sortedArray.findIndex((pub) => pub.name === "Marvel Comics")
    if (imageIndex > -1) moveIndex(sortedArray, imageIndex, 0)
    if (marvelIndex > -1) moveIndex(sortedArray, marvelIndex, 1)
    return sortedArray
}

// Reduce comic records into an array of publishers each with their list of comic releases
function groupByPublisher(comics) {
    return comics.reduce((acc, obj) => {
        const pubIndex = acc.findIndex((pub) => pub.name === obj.publisher_name)
        const comic = {
            id: obj.comic_id,
            title: obj.title,
            itemNumber: obj.item_number,
            cover: obj.cover,
        }

        if (pubIndex < 0)
            acc.push({
                id: obj.publisher_id,
                name: obj.publisher_name,
                releases: [comic],
            })
        else acc[pubIndex].releases.push(comic)

        return acc
    }, [])
}

export default async function handler(req, res) {
    const { comicDay } = req.query
    res.setHeader("Content-Type", "application/json")

    const client = await db.connect()
    try {
        const releases = await getReleases(client, comicDay)
        const releasesByPublisher = groupByPublisher(releases)
        const sortedReleasesByPublisher =
            releasesByPublisher && releasesByPublisher.length > 0
                ? movePremierPublishersToTop(releasesByPublisher)
                : []

        res.status(200).json(sortedReleasesByPublisher)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
