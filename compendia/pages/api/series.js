import { getUserOrRedirect } from "@util/cookie"
const db = require("../../util/database").instance

async function getSeriesDetails(client, res, seriesID) {
    const query = `SELECT name, (SELECT COUNT(*) FROM comics WHERE series_id = $1) as entries_count
        FROM series WHERE series_id = $1`
    const params = [seriesID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1) res.status(404).json({ message: "Series not found" })
    else return result.rows[0]
}

async function getSeriesEntries(client, seriesID) {
    const query = `SELECT comic_id, title, cover
        FROM comics as c WHERE series_id = $1
        ORDER BY c.release_date DESC
        FETCH FIRST 30 ROWS ONLY`
    const params = [seriesID]
    const result = await client.query(query, params)

    return result.rows
}

export default async function handler(req, res) {
    const { seriesID } = req.query
    res.setHeader("Content-Type", "application/json")

    if (!seriesID)
        res.status(404).json({ message: `Could not find a series with ID of ${seriesID}` })

    const client = await db.connect()
    try {
        const series = await getSeriesDetails(client, res, seriesID)
        const seriesEntriesList = await getSeriesEntries(client, seriesID)

        res.status(200).json({
            id: parseInt(seriesID),
            name: series.name,
            entriesCount: series.entries_count,
            entries: seriesEntriesList.map((comic) => {
                return {
                    id: parseInt(comic.comic_id),
                    title: comic.title,
                    cover: comic.cover,
                }
            }),
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
